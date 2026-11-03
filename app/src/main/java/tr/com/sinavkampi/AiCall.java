package tr.com.sinavkampi;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import org.json.JSONObject;
import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/** Okul çıkışı yapılan "Kamp Koçu" aramasının zamanlaması ve bildirimi. */
final class AiCall {
    static final String CHANNEL = "ai_call_v1";
    static final int NOTIFICATION_ID = 102;
    static final ZoneId ZONE = ZoneId.of("Europe/Istanbul");

    private AiCall() {}

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("sinav-kampi", Context.MODE_PRIVATE); }
    static boolean enabled(Context c) { return prefs(c).getBoolean("aiEnabled", false); }
    static String time(Context c) { return prefs(c).getString("aiTime", "16:30"); }

    /** Web katmanından gelen {enabled, time, pending, first, exam} ayarlarını saklar. */
    static void configure(Context c, String json) {
        if (json != null) {
            try {
                JSONObject data = new JSONObject(json);
                String value = data.optString("time", "16:30");
                if (!value.matches("([01]\\d|2[0-3]):[0-5]\\d")) value = "16:30";
                prefs(c).edit()
                        .putBoolean("aiEnabled", data.optBoolean("enabled", false))
                        .putString("aiTime", value)
                        .putInt("aiPending", Math.max(0, data.optInt("pending", 0)))
                        .putString("aiFirst", data.optString("first", ""))
                        .putString("aiExam", data.optString("exam", ""))
                        .apply();
            } catch (Exception ignored) { /* Geçersiz ayar eski planı bozmaz. */ }
        }
        schedule(c);
    }

    /** Hafta içi (Pzt-Cum) seçilen saatte bir sonraki aramayı planlar. */
    static void schedule(Context c) {
        AlarmManager am = c.getSystemService(AlarmManager.class);
        PendingIntent pi = alarmIntent(c);
        am.cancel(pi);
        if (!enabled(c)) {
            prefs(c).edit().remove("aiNextAt").apply();
            return;
        }
        long at = nextCall(System.currentTimeMillis(), time(c));
        if (at <= 0) return;
        prefs(c).edit().putLong("aiNextAt", at).apply();
        try {
            if (Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms()) am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
            else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        } catch (SecurityException e) {
            am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        }
    }

    static long nextCall(long now, String hhmm) {
        try {
            LocalTime target = LocalTime.parse(hhmm);
            ZonedDateTime candidate = Instant.ofEpochMilli(now).atZone(ZONE).toLocalDate().atTime(target).atZone(ZONE);
            for (int i = 0; i < 8; i++) {
                DayOfWeek day = candidate.getDayOfWeek();
                if (day.getValue() <= 5 && candidate.toInstant().toEpochMilli() > now + 30_000L) return candidate.toInstant().toEpochMilli();
                candidate = candidate.plusDays(1);
            }
        } catch (Exception ignored) { }
        return 0L;
    }

    static void channels(Context c) {
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        NotificationChannel calls = new NotificationChannel(CHANNEL, "Kamp Koçu aramaları", NotificationManager.IMPORTANCE_HIGH);
        calls.setDescription("Okul çıkışı ödev konuşması için gelen arama bildirimi.");
        calls.enableVibration(true);
        nm.createNotificationChannel(calls);
    }

    static PendingIntent openCall(Context c) {
        Intent intent = new Intent(c, MainActivity.class)
                .setAction("tr.com.sinavkampi.AI_CALL")
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP)
                .putExtra("ai_call", true);
        return PendingIntent.getActivity(c, 21, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static PendingIntent alarmIntent(Context c) {
        return PendingIntent.getBroadcast(c, 22, new Intent(c, AiCallReceiver.class).setAction(AiCallReceiver.TICK), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static PendingIntent skipIntent(Context c) {
        return PendingIntent.getBroadcast(c, 23, new Intent(c, AiCallReceiver.class).setAction(AiCallReceiver.SKIP), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    /** Bildirimi gönderir. test=false ise dünkü/yarınki aramayı da planlar. */
    static String notifyNow(Context c, boolean test) {
        if (Build.VERSION.SDK_INT >= 33 && c.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            return "{\"ok\":false,\"message\":\"Bildirim izni yok.\"}";
        }
        channels(c);
        SharedPreferences p = prefs(c);
        int pending = p.getInt("aiPending", 0);
        String first = p.getString("aiFirst", "");
        String exam = p.getString("aiExam", "");
        String text;
        if (pending > 0) text = "Bugünkü ödevleri konuşalım mı? " + pending + " ödev bekliyor" + (first.isEmpty() ? "." : ": " + first + ".");
        else if (!exam.isEmpty()) text = "Bugünkü planını ve " + exam + " sınavını konuşalım mı?";
        else text = "Bugünkü ödevlerini ve çalışma planını konuşalım mı?";
        Notification n = new Notification.Builder(c, CHANNEL)
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle("Kamp Koçu seni arıyor")
                .setContentText(text)
                .setStyle(new Notification.BigTextStyle().bigText(text + " Dokununca uygulama içi sesli arama başlar."))
                .setContentIntent(openCall(c))
                .setAutoCancel(true)
                .setCategory(Notification.CATEGORY_REMINDER)
                .setPriority(Notification.PRIORITY_HIGH)
                .setWhen(System.currentTimeMillis())
                .setShowWhen(true)
                .addAction(new Notification.Action.Builder(null, "Beni ara", openCall(c)).build())
                .addAction(new Notification.Action.Builder(null, "Şimdi değil", skipIntent(c)).build())
                .build();
        c.getSystemService(NotificationManager.class).notify(NOTIFICATION_ID, n);
        if (!test) schedule(c);
        return "{\"ok\":true}";
    }
}
