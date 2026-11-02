package tr.com.sinavkampi;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.core.content.FileProvider;
import org.json.JSONObject;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public final class MainActivity extends Activity {
    private WebView web;
    private String pendingBackup;
    private static final String HOME = "file:///android_asset/www/index.html";
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(246,247,242));
        getWindow().setNavigationBarColor(Color.WHITE);
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(246,247,242));
        setContentView(web);
        View root = web;
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars() | android.view.WindowInsets.Type.displayCutout());
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return insets;
        });
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setGeolocationEnabled(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setTextZoom(100);
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("file".equals(uri.getScheme()) && uri.getPath() != null && uri.getPath().startsWith("/android_asset/www/")) {
                    String path = uri.getPath();
                    if (path.endsWith(".pdf")) { openPDF(path.substring(path.lastIndexOf('/')+1)); return true; }
                    return false;
                }
                return true; // Bundled application: never navigate to an untrusted remote page.
            }
            @Override public void onPageFinished(WebView view, String url) { refreshStatus(); }
        });
        if (savedInstanceState == null) web.loadUrl(HOME); else web.restoreState(savedInstanceState);
    }
    @Override protected void onSaveInstanceState(Bundle state) { super.onSaveInstanceState(state); web.saveState(state); }
    @Override protected void onResume() { super.onResume(); refreshStatus(); }
    private void refreshStatus() { if(web!=null) web.post(() -> web.evaluateJavascript("window.nativeStatusChanged && window.nativeStatusChanged()",null)); }
    private void message(String text) { runOnUiThread(()->Toast.makeText(this,text,Toast.LENGTH_LONG).show()); }
    private boolean hasNotifications() { return Build.VERSION.SDK_INT < 33 || checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)==PackageManager.PERMISSION_GRANTED; }
    @Override public void onRequestPermissionsResult(int code,String[] permissions,int[] results) {
        super.onRequestPermissionsResult(code,permissions,results);
        if(code==33) { message(results.length>0 && results[0]==PackageManager.PERMISSION_GRANTED ? "Bildirim izni verildi. Hatırlatma düğmesini açabilirsin." : "Bildirim izni verilmedi. Telefon ayarlarından izin verebilirsin."); refreshStatus(); }
    }
    @Override public void onBackPressed() { if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
    @Override protected void onDestroy() { if(web!=null){web.removeJavascriptInterface("AndroidBridge");web.destroy();}super.onDestroy(); }
    @Override protected void onActivityResult(int request,int result,Intent data) {
        super.onActivityResult(request,result,data);
        if(request==41 && result==RESULT_OK && data!=null && data.getData()!=null && pendingBackup!=null) {
            try (OutputStream os=getContentResolver().openOutputStream(data.getData())) {
                if(os==null) throw new Exception();
                os.write(pendingBackup.getBytes(StandardCharsets.UTF_8));
                pendingBackup=null;message("İlerleme yedeğin kaydedildi.");
            } catch(Exception e){message("Yedek kaydedilemedi. Başka bir klasör deneyebilirsin.");}
        }
    }
    private static boolean validPdf(String file) { return file!=null && file.matches("[a-z0-9-]+\\.pdf"); }
    private void openPDF(String file) {
        if(!validPdf(file))return;
        try(InputStream test=getAssets().open("www/pdfs/"+file)) {
            Intent intent=new Intent(this,PdfViewerActivity.class);intent.putExtra("file",file);startActivity(intent);
        }catch(Exception e){message("PDF açılamadı. Uygulamayı yeniden açmayı dene.");}
    }
    private File copyPDF(String file) throws Exception {
        if(!validPdf(file))throw new IllegalArgumentException();
        File dir=new File(getCacheDir(),"pdfs");if(!dir.exists()&&!dir.mkdirs())throw new Exception();
        File target=new File(dir,file);
        try(InputStream in=getAssets().open("www/pdfs/"+file);OutputStream out=new FileOutputStream(target)){in.transferTo(out);}
        return target;
    }
    public final class Bridge {
        @JavascriptInterface public String getStatus() {
            try { return new JSONObject().put("notifications",hasNotifications()).put("exact",ReminderEngine.canExact(MainActivity.this)).put("battery",ReminderEngine.batteryUnrestricted(MainActivity.this)).put("enabled",ReminderEngine.enabled(MainActivity.this)).put("serviceRunning",ReminderService.running).toString(); }catch(Exception e){return "{}";}
        }
        @JavascriptInterface public void configure(String json) { ReminderEngine.configure(MainActivity.this,json); }
        @JavascriptInterface public String startReminders() {
            if(!hasNotifications()){requestNotificationPermission();return "{\"ok\":false,\"message\":\"Önce bildirim iznini ver, sonra hatırlatma düğmesini yeniden aç.\"}";}
            ReminderEngine.setEnabled(MainActivity.this,true);
            Intent intent=new Intent(MainActivity.this,ReminderService.class).setAction(ReminderService.START);
            startForegroundService(intent);
            return "{\"ok\":true}";
        }
        @JavascriptInterface public String stopReminders() { ReminderEngine.stop(MainActivity.this);return "{\"ok\":true}"; }
        @JavascriptInterface public String testNotification() {
            if(!hasNotifications())return "{\"ok\":false}";
            ReminderEngine.notifyExam(MainActivity.this,true);return "{\"ok\":true}";
        }
        @JavascriptInterface public void requestNotificationPermission() {
            if(Build.VERSION.SDK_INT>=33 && !hasNotifications())requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS},33);
            else if(!hasNotifications())message("Bildirim izni için telefon ayarlarını kullan.");
            else { Intent i=new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE,getPackageName()).putExtra(Settings.EXTRA_CHANNEL_ID,ReminderEngine.REMINDERS);try{startActivity(i);}catch(Exception e){message("Bildirimler zaten izinli.");} }
        }
        @JavascriptInterface public void openExactAlarmSettings() {
            if(Build.VERSION.SDK_INT>=31){try{startActivity(new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,Uri.parse("package:"+getPackageName())));}catch(Exception e){openAppSettings();}}
        }
        @JavascriptInterface public void openBatterySettings() {
            try{startActivity(new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,Uri.parse("package:"+getPackageName())));}catch(Exception e){openAppSettings();}
        }
        @JavascriptInterface public void openPDF(String file){MainActivity.this.openPDF(file);}
        @JavascriptInterface public void sharePDF(String file) {
            try{Uri uri=FileProvider.getUriForFile(MainActivity.this,getPackageName()+".files",copyPDF(file));Intent send=new Intent(Intent.ACTION_SEND).setType("application/pdf").putExtra(Intent.EXTRA_STREAM,uri).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);startActivity(Intent.createChooser(send,"PDF’yi paylaş veya kaydet"));}catch(Exception e){message("PDF paylaşılamadı.");}
        }
        @JavascriptInterface public void saveBackup(String json) {
            runOnUiThread(()->{pendingBackup=json;Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("application/json").putExtra(Intent.EXTRA_TITLE,"sinav-kampi-yedek.json");try{startActivityForResult(i,41);}catch(Exception e){message("Dosya kaydetme ekranı açılamadı.");}});
        }
        private void openAppSettings(){try{startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,Uri.parse("package:"+getPackageName())));}catch(Exception e){message("Telefon ayarlarından Sınav Kampı’nı aç.");}}
    }
}
