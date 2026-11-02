package tr.com.sinavkampi;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
public final class BootReceiver extends BroadcastReceiver {
 @Override public void onReceive(Context c,Intent i){
  if((Intent.ACTION_BOOT_COMPLETED.equals(i.getAction())||Intent.ACTION_MY_PACKAGE_REPLACED.equals(i.getAction()))&&ReminderEngine.enabled(c)){
   try{c.startForegroundService(new Intent(c,ReminderService.class).setAction(ReminderService.START));}catch(Exception ignored){/* User can reopen after manufacturer restrictions. */}
  }
 }
}
