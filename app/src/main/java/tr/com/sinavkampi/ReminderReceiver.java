package tr.com.sinavkampi;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
public final class ReminderReceiver extends BroadcastReceiver {
 static final String TICK="tr.com.sinavkampi.TICK",STOP="tr.com.sinavkampi.STOP";
 @Override public void onReceive(Context c,Intent i){
  if(STOP.equals(i.getAction())){ReminderEngine.stop(c);return;}
  if(TICK.equals(i.getAction()))ReminderEngine.tick(c);
 }
}
