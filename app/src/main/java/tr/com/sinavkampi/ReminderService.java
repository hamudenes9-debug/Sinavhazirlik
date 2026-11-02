package tr.com.sinavkampi;
import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.content.pm.ServiceInfo;
import android.os.Build;

/** User-started, visible study timer. Exact alarms provide the primary cadence.
 * The handler is a redundant in-process tick; ReminderEngine deduplicates both.
 * This is not an invisible data-sync service. */
public final class ReminderService extends Service {
 static final String START="tr.com.sinavkampi.START";
 static volatile boolean running=false;
 private final Handler handler=new Handler(Looper.getMainLooper());
 private final Runnable tick=new Runnable(){@Override public void run(){if(!ReminderEngine.enabled(ReminderService.this)){stopSelf();return;}ReminderEngine.tick(ReminderService.this);handler.postDelayed(this,ReminderEngine.INTERVAL);}};
 @Override public void onCreate(){super.onCreate();ReminderEngine.channels(this);}
 @Override public int onStartCommand(Intent intent,int flags,int startId){
  if(intent!=null&&ReminderReceiver.STOP.equals(intent.getAction())){ReminderEngine.stop(this);return START_NOT_STICKY;}
  if(!ReminderEngine.enabled(this)){stopSelf();return START_NOT_STICKY;}
  try{if(Build.VERSION.SDK_INT>=34)startForeground(ReminderEngine.SERVICE_ID,ReminderEngine.serviceNotification(this),ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);else startForeground(ReminderEngine.SERVICE_ID,ReminderEngine.serviceNotification(this));}catch(Exception e){ReminderEngine.stop(this);return START_NOT_STICKY;}
  running=true;
  handler.removeCallbacks(tick);
  long next=ReminderEngine.prefs(this).getLong("nextAt",0),delay=next>System.currentTimeMillis()?next-System.currentTimeMillis():ReminderEngine.INTERVAL;
  ReminderEngine.schedule(this,delay);
  handler.postDelayed(tick,delay);
  return START_STICKY;
 }
 @Override public void onDestroy(){running=false;handler.removeCallbacks(tick);super.onDestroy();}
 @Override public IBinder onBind(Intent intent){return null;}
}
