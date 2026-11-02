package tr.com.sinavkampi;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.PowerManager;
import org.json.JSONArray;
import org.json.JSONObject;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;

final class ReminderEngine {
    static final String REMINDERS="exam_reminders_v1", SERVICE="study_reminder_service";
    static final int REMINDER_ID=101, SERVICE_ID=100;
    static final long INTERVAL=600_000L;
    static final ZoneId ZONE=ZoneId.of("Europe/Istanbul");
    private ReminderEngine(){}
    static SharedPreferences prefs(Context c){return c.getSharedPreferences("sinav-kampi",Context.MODE_PRIVATE);}
    static boolean enabled(Context c){return prefs(c).getBoolean("enabled",false);}
    static void configure(Context c,String json){try{JSONObject data=new JSONObject(json);prefs(c).edit().putString("config",json).putString("settings",data.getJSONObject("settings").toString()).putString("exams",data.getJSONArray("exams").toString()).apply();}catch(Exception ignored){}}
    static void setEnabled(Context c,boolean enabled){prefs(c).edit().putBoolean("enabled",enabled).apply();}
    static void channels(Context c){
        NotificationManager nm=c.getSystemService(NotificationManager.class);
        NotificationChannel service=new NotificationChannel(SERVICE,"Açık çalışma hatırlatıcısı",NotificationManager.IMPORTANCE_LOW);
        service.setDescription("Açıkken görünen bildirim. Hatırlatmaları buradan durdurabilirsin.");service.setShowBadge(false);
        NotificationChannel reminders=new NotificationChannel(REMINDERS,"10 dakikalık sınav hatırlatmaları",NotificationManager.IMPORTANCE_DEFAULT);
        reminders.setDescription("Yaklaşan sınavının adını ve tarihini hatırlatır.");
        nm.createNotificationChannel(service);nm.createNotificationChannel(reminders);
    }
    static PendingIntent openApp(Context c){return PendingIntent.getActivity(c,10,new Intent(c,MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP|Intent.FLAG_ACTIVITY_CLEAR_TOP),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);}
    static PendingIntent stopIntent(Context c){return PendingIntent.getBroadcast(c,11,new Intent(c,ReminderReceiver.class).setAction(ReminderReceiver.STOP),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);}
    static PendingIntent alarmIntent(Context c){return PendingIntent.getBroadcast(c,12,new Intent(c,ReminderReceiver.class).setAction(ReminderReceiver.TICK),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);}
    static Notification serviceNotification(Context c){return new Notification.Builder(c,SERVICE).setSmallIcon(R.drawable.ic_notification).setContentTitle("Sınav Kampı · Hatırlatıcı açık").setContentText("Her 10 dakikada bir sınavını hatırlatırım.").setContentIntent(openApp(c)).setOngoing(true).setOnlyAlertOnce(true).setCategory(Notification.CATEGORY_SERVICE).addAction(new Notification.Action.Builder(null,"Durdur",stopIntent(c)).build()).build();}
    static boolean canExact(Context c){return Build.VERSION.SDK_INT<31 || c.getSystemService(AlarmManager.class).canScheduleExactAlarms();}
    static boolean batteryUnrestricted(Context c){return c.getSystemService(PowerManager.class).isIgnoringBatteryOptimizations(c.getPackageName());}
    static void schedule(Context c,long delay){
        if(!enabled(c))return;
        long when=System.currentTimeMillis()+Math.max(1000,delay);
        prefs(c).edit().putLong("nextAt",when).apply();
        AlarmManager am=c.getSystemService(AlarmManager.class);PendingIntent pi=alarmIntent(c);am.cancel(pi);
        try{if(canExact(c))am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,when,pi);else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,when,pi);}catch(SecurityException e){am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,when,pi);}
    }
    static void stop(Context c){setEnabled(c,false);prefs(c).edit().remove("nextAt").apply();c.getSystemService(AlarmManager.class).cancel(alarmIntent(c));c.stopService(new Intent(c,ReminderService.class));c.getSystemService(NotificationManager.class).cancel(REMINDER_ID);}
    static boolean quiet(Context c){try{JSONObject s=new JSONObject(prefs(c).getString("settings","{}"));if(!s.optBoolean("quiet",false))return false;LocalTime now=LocalTime.now(ZONE),start=LocalTime.parse(s.optString("quietStart","22:00")),end=LocalTime.parse(s.optString("quietEnd","08:00"));if(start.equals(end))return false;return start.isBefore(end)?!now.isBefore(start)&&now.isBefore(end):!now.isBefore(start)||now.isBefore(end);}catch(Exception e){return false;}}
    static final class Exam {String name;LocalDate date;int period;}
    static Exam nextExam(Context c){
        ArrayList<Exam> list=new ArrayList<>();
        try{JSONArray exams=new JSONArray(prefs(c).getString("exams","[]"));LocalDate today=LocalDate.now(ZONE);for(int i=0;i<exams.length();i++){JSONObject j=exams.getJSONObject(i);Exam e=new Exam();e.name=j.getString("name");e.date=LocalDate.parse(j.getString("date"));e.period=j.optInt("period",1);if(!e.date.isBefore(today))list.add(e);}}catch(Exception ignored){}
        list.sort(Comparator.comparing((Exam e)->e.date).thenComparingInt(e->e.period));return list.isEmpty()?null:list.get(0);
    }
    static String reminderText(Context c){Exam e=nextExam(c);if(e==null)return "Yaklaşan sınavın yok. Takvimini kontrol etmeyi unutma!";long days=java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(ZONE),e.date);return (days==0?"Bugün":days==1?"Yarın":days+" gün sonra")+" "+e.name+" sınavın var!";}
    static void notifyExam(Context c){notifyExam(c,false);}
    static void notifyExam(Context c,boolean force){
        if(!force&&!enabled(c)&&!ReminderService.running)return;
        if(Build.VERSION.SDK_INT>=33&&c.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)!=PackageManager.PERMISSION_GRANTED)return;
        channels(c);
        Notification n=new Notification.Builder(c,REMINDERS).setSmallIcon(R.drawable.ic_notification).setContentTitle("Sınav Kampı").setContentText(reminderText(c)).setStyle(new Notification.BigTextStyle().bigText(reminderText(c)+"\nKüçük bir tekrar, büyük bir adım. Çözdüğün sorulara devam et.")).setContentIntent(openApp(c)).setAutoCancel(true).setOnlyAlertOnce(false).setCategory(Notification.CATEGORY_REMINDER).setWhen(System.currentTimeMillis()).setShowWhen(true).addAction(new Notification.Action.Builder(null,"Hatırlatmaları durdur",stopIntent(c)).build()).build();
        c.getSystemService(NotificationManager.class).notify(REMINDER_ID,n);
    }
    static void tick(Context c){if(!enabled(c))return;long now=System.currentTimeMillis(),last=prefs(c).getLong("lastSent",0);if(now-last>=INTERVAL-10000){if(!quiet(c))notifyExam(c);prefs(c).edit().putLong("lastSent",now).apply();}schedule(c,INTERVAL);}
}
