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
import org.json.JSONArray;
import org.json.JSONObject;

/** Okul çıkışı aramaları ve teslim öncesi hatırlatmalar için alarm planı. */
final class AiCall {
    static final String CHANNEL = "ai_call_v1";
    static final int NOTIFICATION_ID = 102;
    static final int MAX_EVENTS = 12;
    static final int BASE_REQUEST = 30;

    private AiCall() {}

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("sinav-kampi", Context.MODE_PRIVATE); }
    static boolean enabled(Context c) { return prefs(c).getBoolean("aiEnabled", false); }

    /** Web katmanından gelen {enabled, name, events:[{at,kind,title,text}]} planını saklar. */
    static void configure(Context c, String json) {
        if (json != null) {
            try {
                JSONObject data = new JSONObject(json);
                JSONArray events = data.optJSONArray("events");
                prefs(c).edit()
                        .putBoolean("aiEnabled", data.optBoolean("enabled", false))
                        .putString("aiName", data.optString("name", ""))
                        .putInt("aiPending", Math.max(0, data.optInt("pending", 0)))
                        .putString("aiEvents", events == null ? "[]" : events.toString())
                        .apply();
            } catch (Exception ignored) { /* Geçersiz plan eski planı bozmaz. */ }
        }
        schedule(c);
    }

    /** Planlanmış bütün alarmları temizleyip güncel listeyi kurar. */
    static void schedule(Context c) {
        AlarmManager am = c.getSystemService(AlarmManager.class);
        for (int slot = 0; slot < MAX_EVENTS; slot++) am.cancel(alarmIntent(c, slot, null));
        if (!enabled(c)) return;
        long now = System.currentTimeMillis();
        int slot = 0;
        try {
            JSONArray events = new JSONArray(prefs(c).getString("aiEvents", "[]"));
            for (int i = 0; i < events.length() && slot < MAX_EVENTS; i++) {
                JSONObject event = events.optJSONObject(i);
                if (event == null) continue;
                long at = event.optLong("at", 0L);
                if (at <= now + 5000L) continue;
                PendingIntent pi = alarmIntent(c, slot, event);
                try {
                    if (Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms()) am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
                    else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
                } catch (SecurityException e) {
                    am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
                }
                slot++;
            }
        } catch (Exception ignored) { }
        prefs(c).edit().putInt("aiScheduled", slot).apply();
    }

    static void channels(Context c) {
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        NotificationChannel calls = new NotificationChannel(CHANNEL, "Kamp Koçu aramaları", NotificationManager.IMPORTANCE_HIGH);
        calls.setDescription("Okul çıkışı ödev sorması ve teslim öncesi hatırlatma araması.");
        calls.enableVibration(true);
        nm.createNotificationChannel(calls);
    }

    static PendingIntent openCall(Context c, String kind) {
        Intent intent = new Intent(c, MainActivity.class)
                .setAction("tr.com.sinavkampi.AI_CALL")
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP)
                .putExtra("ai_call", true)
                .putExtra("ai_kind", kind == null ? "intake" : kind);
        return PendingIntent.getActivity(c, 21, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static PendingIntent alarmIntent(Context c, int slot, JSONObject event) {
        Intent intent = new Intent(c, AiCallReceiver.class).setAction(AiCallReceiver.TICK).putExtra("slot", slot);
        if (event != null) {
            intent.putExtra("kind", event.optString("kind", "intake"))
                    .putExtra("title", event.optString("title", "Kamp Koçu seni arıyor"))
                    .putExtra("text", event.optString("text", "Bugün hangi ödevleri verdiler?"));
        }
        return PendingIntent.getBroadcast(c, BASE_REQUEST + slot, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static PendingIntent skipIntent(Context c) {
        return PendingIntent.getBroadcast(c, 23, new Intent(c, AiCallReceiver.class).setAction(AiCallReceiver.SKIP), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static boolean allowed(Context c) {
        return Build.VERSION.SDK_INT < 33 || c.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    static void show(Context c, String kind, String title, String text) {
        if (!allowed(c)) return;
        channels(c);
        String safeTitle = title == null || title.isEmpty() ? "Kamp Koçu seni arıyor" : title;
        String safeText = text == null || text.isEmpty() ? "Bugün hangi ödevleri verdiler? Söyle, kaydedeyim." : text;
        String safeKind = kind == null || kind.isEmpty() ? "intake" : kind;
        Notification n = new Notification.Builder(c, CHANNEL)
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle(safeTitle)
                .setContentText(safeText)
                .setStyle(new Notification.BigTextStyle().bigText(safeText + " Dokununca uygulama içi sesli arama başlar."))
                .setContentIntent(openCall(c, safeKind))
                .setAutoCancel(true)
                .setCategory(Notification.CATEGORY_REMINDER)
                .setPriority(Notification.PRIORITY_HIGH)
                .setWhen(System.currentTimeMillis())
                .setShowWhen(true)
                .addAction(new Notification.Action.Builder(null, "Beni ara", openCall(c, safeKind)).build())
                .addAction(new Notification.Action.Builder(null, "Şimdi değil", skipIntent(c)).build())
                .build();
        c.getSystemService(NotificationManager.class).notify(NOTIFICATION_ID, n);
    }

    /** Ayarlardaki "Bildirimi test et" düğmesi. */
    static String testNotify(Context c, String json) {
        if (!allowed(c)) return "{\"ok\":false,\"message\":\"Bildirim izni yok.\"}";
        String kind = "intake", title = "Kamp Koçu seni arıyor", text = "Bugün hangi ödevleri verdiler? Söyle, kaydedeyim.";
        try {
            if (json != null && !json.isEmpty()) {
                JSONObject event = new JSONObject(json);
                kind = event.optString("kind", kind);
                title = event.optString("title", title);
                text = event.optString("text", text);
            }
        } catch (Exception ignored) { }
        show(c, kind, title, text);
        return "{\"ok\":true}";
    }
}
