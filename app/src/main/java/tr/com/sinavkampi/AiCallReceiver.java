package tr.com.sinavkampi;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Planlanan koç aramasını ve "şimdi değil" düğmesini karşılar. */
public final class AiCallReceiver extends BroadcastReceiver {
    static final String TICK = "tr.com.sinavkampi.AI_CALL_TICK";
    static final String SKIP = "tr.com.sinavkampi.AI_CALL_SKIP";

    @Override public void onReceive(Context c, Intent intent) {
        String action = intent == null ? null : intent.getAction();
        if (TICK.equals(action)) {
            AiCall.show(c, intent.getStringExtra("kind"), intent.getStringExtra("title"), intent.getStringExtra("text"));
        } else if (SKIP.equals(action)) {
            c.getSystemService(NotificationManager.class).cancel(AiCall.NOTIFICATION_ID);
        }
    }
}
