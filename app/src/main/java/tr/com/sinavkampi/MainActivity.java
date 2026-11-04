package tr.com.sinavkampi;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.os.Build;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.speech.tts.UtteranceProgressListener;
import android.provider.Settings;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebResourceResponse;
import androidx.webkit.WebViewAssetLoader;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.core.content.FileProvider;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Locale;

public final class MainActivity extends Activity {
    private WebView web;
    private WebViewAssetLoader assetLoader;
    private String pendingBackup;
    private TextToSpeech tts;
    private boolean ttsReady;
    private boolean ttsFailed;
    private String pendingSpeech;
    private String voiceName;
    private float speechRate = 1.12f;
    private boolean voiceReady;
    private SpeechRecognizer recognizer;
    private boolean pageReady;
    private boolean pendingAiCall;
    private String pendingAiKind = "intake";
    private static final String HOME = "https://appassets.androidplatform.net/assets/www/index.html";
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getIntent() != null && getIntent().getBooleanExtra("ai_call", false)) { pendingAiCall = true; pendingAiKind = getIntent().getStringExtra("ai_kind"); }
        getWindow().setStatusBarColor(Color.rgb(246,247,242));
        getWindow().setNavigationBarColor(Color.WHITE);
        assetLoader = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
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
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setGeolocationEnabled(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setTextZoom(100);
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) { return assetLoader.shouldInterceptRequest(request.getUrl()); }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("https".equals(uri.getScheme()) && "appassets.androidplatform.net".equals(uri.getHost()) && uri.getPath() != null && uri.getPath().startsWith("/assets/www/")) {
                    String path = uri.getPath();
                    if (path.endsWith(".pdf")) { openPDF(path.substring(path.lastIndexOf('/')+1)); return true; }
                    return false;
                }
                if ("https".equals(uri.getScheme()) && isAuthHost(uri.getHost())) return false;
                return true; // Bundled application: never navigate to an untrusted remote page.
            }
            @Override public void onPageFinished(WebView view, String url) { pageReady = true; refreshStatus(); deliverAiCall(); }
        });
        if (savedInstanceState == null) web.loadUrl(HOME); else web.restoreState(savedInstanceState);
        web.postDelayed(this::initTts, 1200);
    }
    @Override protected void onSaveInstanceState(Bundle state) { super.onSaveInstanceState(state); web.saveState(state); }
    @Override protected void onResume() { super.onResume(); refreshStatus(); deliverAiCall(); }
    @Override protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent); setIntent(intent);
        if (intent != null && intent.getBooleanExtra("ai_call", false)) {
            pendingAiCall = true;
            pendingAiKind = intent.getStringExtra("ai_kind");
            if (pageReady) deliverAiCall(); else if (web != null) web.loadUrl(HOME);
        }
    }
    @Override protected void onPause() {
        super.onPause();
        if (tts != null) tts.stop();
        stopListening();
    }
    private void deliverAiCall() {
        if (!pendingAiCall || web == null || !pageReady) return;
        pendingAiCall = false;
        String kind = pendingAiKind == null || pendingAiKind.isEmpty() ? "intake" : pendingAiKind;
        web.postDelayed(() -> web.evaluateJavascript("window.KampAI&&window.KampAI.openFromNotification(" + JSONObject.quote(kind) + ")", null), 700);
    }
    private void js(String script) { if (web != null) web.post(() -> web.evaluateJavascript(script, null)); }
    private boolean googleTtsInstalled() {
        try { getPackageManager().getPackageInfo("com.google.android.tts", 0); return true; } catch (Exception e) { return false; }
    }
    private static boolean online(Context c) {
        try {
            ConnectivityManager manager = (ConnectivityManager) c.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkCapabilities caps = manager == null ? null : manager.getNetworkCapabilities(manager.getActiveNetwork());
            return caps != null && caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
        } catch (Exception e) { return false; }
    }
    private void applyVoicePreference() {
        if (tts == null || !ttsReady) return;
        android.content.SharedPreferences prefs = getSharedPreferences("sinav-kampi", MODE_PRIVATE);
        String saved = prefs.getString("ttsVoice", "");
        float rate = prefs.getFloat("ttsRate", 1.12f);
        boolean preferNetwork = prefs.getBoolean("ttsNetwork", true);
        boolean connected = online(this);
        speechRate = Math.max(0.7f, Math.min(1.4f, rate));
        try {
            tts.setSpeechRate(speechRate);
            tts.setPitch(1.0f);
        } catch (Exception ignored) { }
        Voice chosen = null;
        Voice bestOffline = null;
        try {
            for (Voice voice : tts.getVoices()) {
                if (!"tr".equals(voice.getLocale().getLanguage())) continue;
                boolean needsNetwork = voice.isNetworkConnectionRequired();
                if (!needsNetwork) {
                    if (bestOffline == null || voice.getQuality() > bestOffline.getQuality()) bestOffline = voice;
                }
                if (!saved.isEmpty() && saved.equals(voice.getName())) { chosen = voice; break; }
            }
            /* Kayıtlı ses yoksa: internetliyse en yüksek kaliteli bulut sesi, değilse cihaz sesi. */
            if (chosen == null && preferNetwork && connected) {
                int best = -1;
                for (Voice voice : tts.getVoices()) {
                    if (!"tr".equals(voice.getLocale().getLanguage())) continue;
                    if (!voice.isNetworkConnectionRequired()) continue;
                    if (voice.getQuality() > best) { best = voice.getQuality(); chosen = voice; }
                }
            }
            if (chosen == null) chosen = bestOffline;
            if (chosen == null) {
                for (Voice voice : tts.getVoices()) {
                    if (!"tr".equals(voice.getLocale().getLanguage())) continue;
                    chosen = voice;
                    break;
                }
            }
        } catch (Exception ignored) { }
        if (chosen != null) {
            try {
                tts.setVoice(chosen);
                voiceName = chosen.getName();
                voiceReady = true;
            } catch (Exception ignored) { }
        }
    }
    private void initTts() {
        if (tts != null || ttsFailed) return;
        tts = googleTtsInstalled()
                ? new TextToSpeech(this, status -> onTtsReady(status), "com.google.android.tts")
                : new TextToSpeech(this, status -> onTtsReady(status));
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override public void onStart(String id) { }
            @Override public void onDone(String id) { js("window.KampAI&&window.KampAI._speakDone()"); }
            @Override public void onError(String id) { js("window.KampAI&&window.KampAI._speakDone()"); }
        });
    }
    private void onTtsReady(int status) {
            if (status == TextToSpeech.SUCCESS) {
                int result = tts.setLanguage(Locale.forLanguageTag("tr-TR"));
                ttsReady = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED;
                if (!ttsReady) {
                    int fallback = tts.setLanguage(Locale.getDefault());
                    ttsReady = fallback != TextToSpeech.LANG_MISSING_DATA && fallback != TextToSpeech.LANG_NOT_SUPPORTED;
                }
            }
            if (ttsReady) applyVoicePreference();
            if (!ttsReady) {
                ttsFailed = true;
                pendingSpeech = null;
                js("window.KampAI&&window.KampAI._speakUnavailable()");
                return;
            }
            if (pendingSpeech != null) {
                speakNow(pendingSpeech);
                pendingSpeech = null;
            }
    }
    private void speakNow(String text) {
        if (tts == null || !ttsReady) return;
        try {
            tts.setSpeechRate(speechRate);
            if (voiceName != null && !voiceName.isEmpty()) {
                for (Voice voice : tts.getVoices()) if (voiceName.equals(voice.getName())) { tts.setVoice(voice); break; }
            }
        } catch (Exception ignored) { }
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "ai-" + System.currentTimeMillis());
    }
    private String voicesJson() {
        JSONArray list = new JSONArray();
        if (tts != null) {
            try {
                for (Voice voice : tts.getVoices()) {
                    if (!"tr".equals(voice.getLocale().getLanguage())) continue;
                    list.put(new JSONObject()
                            .put("name", voice.getName())
                            .put("quality", voice.getQuality())
                            .put("network", voice.isNetworkConnectionRequired())
                            .put("label", (voice.isNetworkConnectionRequired() ? "İnternetli" : "Çevrimdışı") + " · kalite " + voice.getQuality()));
                }
            } catch (Exception ignored) { }
        }
        return list.toString();
    }
    private void releaseRecognizer(boolean cancel) {
        if (recognizer == null) return;
        try { if (cancel) recognizer.cancel(); } catch (Exception ignored) { }
        try { recognizer.destroy(); } catch (Exception ignored) { }
        recognizer = null;
    }
    private void stopListening() { releaseRecognizer(true); }
    private void startListening() {
        try {
            releaseRecognizer(false);
            recognizer = SpeechRecognizer.createSpeechRecognizer(this);
            recognizer.setRecognitionListener(new RecognitionListener() {
                @Override public void onReadyForSpeech(Bundle params) { js("window.KampAI&&window.KampAI._onListening()"); }
                @Override public void onBeginningOfSpeech() { }
                @Override public void onRmsChanged(float rmsdB) { }
                @Override public void onBufferReceived(byte[] buffer) { }
                @Override public void onEndOfSpeech() { }
                @Override public void onError(int error) {
                    releaseRecognizer(false);
                    js("window.KampAI&&window.KampAI._onSpeechError(" + error + ")");
                }
                @Override public void onResults(Bundle results) {
                    ArrayList<String> list = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    String text = list != null && !list.isEmpty() ? list.get(0) : "";
                    releaseRecognizer(false);
                    if (text != null && !text.isEmpty()) js("window.KampAI&&window.KampAI._onSpeech(" + JSONObject.quote(text) + ")");
                }
                @Override public void onPartialResults(Bundle partialResults) { }
                @Override public void onEvent(int eventType, Bundle params) { }
            });
            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
                    .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                    .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "tr-TR")
                    .putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "tr-TR")
                    .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
                    .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, false)
                    .putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 1500L);
            recognizer.startListening(intent);
        } catch (Exception e) {
            js("window.KampAI&&window.KampAI._onSpeechError(0)");
        }
    }
    private void refreshStatus() { if(web!=null) web.post(() -> web.evaluateJavascript("window.nativeStatusChanged && window.nativeStatusChanged()",null)); }
    private void message(String text) { runOnUiThread(()->Toast.makeText(this,text,Toast.LENGTH_LONG).show()); }
    private boolean hasNotifications() { return Build.VERSION.SDK_INT < 33 || checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)==PackageManager.PERMISSION_GRANTED; }
    @Override public void onRequestPermissionsResult(int code,String[] permissions,int[] results) {
        super.onRequestPermissionsResult(code,permissions,results);
        if(code==33) { message(results.length>0 && results[0]==PackageManager.PERMISSION_GRANTED ? "Bildirim izni verildi. Hatırlatma düğmesini açabilirsin." : "Bildirim izni verilmedi. Telefon ayarlarından izin verebilirsin."); refreshStatus(); }
        if(code==34) {
            boolean granted = results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED;
            js("window.KampAI&&window.KampAI._onMicPermission(" + granted + ")");
            message(granted ? "Mikrofon izni verildi. Koç seni dinleyebilir." : "Mikrofon izni verilmedi. Yazarak devam edebilirsin.");
        }
    }
    @Override public void onBackPressed() { if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
    @Override protected void onDestroy() {
        stopListening();
        if (tts != null) { try { tts.stop(); tts.shutdown(); } catch (Exception ignored) { } tts = null; }
        if (web != null) { web.removeJavascriptInterface("AndroidBridge"); web.destroy(); }
        super.onDestroy();
    }
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
    private static boolean isAuthHost(String host) {
        if (host == null) return false;
        return host.equals("sinavkam.firebaseapp.com") || host.equals("accounts.google.com") || host.equals("accounts.google.com.tr") || host.equals("github.com") || host.equals("api.github.com") || host.endsWith(".googleapis.com") || host.endsWith(".gstatic.com");
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
        try(InputStream in=getAssets().open("www/pdfs/"+file);OutputStream out=new FileOutputStream(target)){byte[] buffer=new byte[8192];int n;while((n=in.read(buffer))!=-1){out.write(buffer,0,n);}}
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
        @JavascriptInterface public void aiChat(String payload) { AiChat.request(web, payload); }
        @JavascriptInterface public void speak(String text) {
            if (text == null || text.isEmpty()) return;
            final String clean = text.length() > 3600 ? text.substring(0, 3600) : text;
            runOnUiThread(() -> {
                if (ttsFailed) { js("window.KampAI&&window.KampAI._speakUnavailable()"); return; }
                if (!ttsReady) { pendingSpeech = clean; initTts(); return; }
                tts.stop();
                speakNow(clean);
            });
        }
        @JavascriptInterface public String voiceList() { runOnUiThread(MainActivity.this::initTts); return voicesJson(); }
        @JavascriptInterface public void setVoiceConfig(String json) {
            try {
                JSONObject data = new JSONObject(json == null ? "{}" : json);
                String voice = data.optString("voice", "");
                float rate = (float) data.optDouble("rate", 1.12);
                boolean preferNetwork = data.optBoolean("preferNetwork", true);
                getSharedPreferences("sinav-kampi", MODE_PRIVATE).edit().putString("ttsVoice", voice).putFloat("ttsRate", Math.max(0.7f, Math.min(1.4f, rate))).putBoolean("ttsNetwork", preferNetwork).apply();
                voiceName = voice;
                speechRate = Math.max(0.7f, Math.min(1.4f, rate));
                runOnUiThread(MainActivity.this::applyVoicePreference);
            } catch (Exception ignored) { }
        }
        @JavascriptInterface public void previewVoice(String text) {
            final String sample = text == null || text.isEmpty() ? "Merhaba! Ben Kamp Koçu. Bugün hangi ödevleri verdiler?" : text;
            runOnUiThread(() -> {
                if (ttsReady) { applyVoicePreference(); tts.stop(); speakNow(sample); }
                else { pendingSpeech = sample; initTts(); }
            });
        }
        @JavascriptInterface public void openTtsSettings() {
            try { startActivity(new Intent("com.android.settings.TTS_SETTINGS").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
            catch (Exception e) { openAppSettings(); }
        }
        @JavascriptInterface public void stopVoice() { runOnUiThread(() -> { if (tts != null) tts.stop(); stopListening(); }); }
        @JavascriptInterface public void stopListening() { runOnUiThread(MainActivity.this::stopListening); }
        @JavascriptInterface public String listen() {
            if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                runOnUiThread(() -> requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, 34));
                return "{\"ok\":false,\"message\":\"Mikrofon izni isteniyor…\"}";
            }
            if (!SpeechRecognizer.isRecognitionAvailable(MainActivity.this)) return "{\"ok\":false,\"message\":\"Bu cihazda konuşma tanıma yok. Yazarak devam edebilirsin.\"}";
            runOnUiThread(MainActivity.this::startListening);
            return "{\"ok\":true}";
        }
        @JavascriptInterface public String voiceStatus() {
            return "{\"tts\":" + ttsReady + ",\"stt\":" + SpeechRecognizer.isRecognitionAvailable(MainActivity.this) + "}";
        }
        @JavascriptInterface public void configureAiCall(String json) { AiCall.configure(MainActivity.this, json); }
        @JavascriptInterface public String aiCallStatus() {
            try { return new JSONObject().put("enabled", AiCall.enabled(MainActivity.this)).put("scheduled", AiCall.prefs(MainActivity.this).getInt("aiScheduled", 0)).toString(); }
            catch (Exception e) { return "{}"; }
        }
        @JavascriptInterface public String testAiCall(String payload) { return AiCall.testNotify(MainActivity.this, payload); }
        @JavascriptInterface public void sharePDF(String file) {
            try{Uri uri=FileProvider.getUriForFile(MainActivity.this,getPackageName()+".files",copyPDF(file));Intent send=new Intent(Intent.ACTION_SEND).setType("application/pdf").putExtra(Intent.EXTRA_STREAM,uri).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);startActivity(Intent.createChooser(send,"PDF’yi paylaş veya kaydet"));}catch(Exception e){message("PDF paylaşılamadı.");}
        }
        @JavascriptInterface public void saveBackup(String json) {
            runOnUiThread(()->{pendingBackup=json;Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("application/json").putExtra(Intent.EXTRA_TITLE,"sinav-kampi-yedek.json");try{startActivityForResult(i,41);}catch(Exception e){message("Dosya kaydetme ekranı açılamadı.");}});
        }
        private void openAppSettings(){try{startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,Uri.parse("package:"+getPackageName())));}catch(Exception e){message("Telefon ayarlarından Sınav Kampı’nı aç.");}}
    }
}
