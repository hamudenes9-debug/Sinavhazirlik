package tr.com.sinavkampi;

import android.webkit.WebView;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/** Groq isteğini WebView yerine doğrudan Java'dan yapar: CORS engeli olmaz. */
final class AiChat {
    private static final String ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
    private static final String FALLBACK_MODEL = "llama-3.3-70b-versatile";

    private AiChat() {}

    static void request(final WebView web, final String payload) {
        Thread worker = new Thread(() -> {
            String id = "";
            JSONObject result = new JSONObject();
            try {
                JSONObject in = new JSONObject(payload == null ? "{}" : payload);
                id = in.optString("id", "");
                String key = in.optString("key", "").trim();
                if (key.isEmpty()) throw new IllegalStateException("no-key");
                boolean ping = in.optBoolean("ping", false);
                List<String> models = new ArrayList<>();
                JSONArray given = in.optJSONArray("models");
                if (given != null) for (int i = 0; i < given.length() && i < 4; i++) {
                    String model = given.optString(i, "").trim();
                    if (!model.isEmpty() && !models.contains(model)) models.add(model);
                }
                if (models.isEmpty()) models.add(FALLBACK_MODEL);
                JSONArray messages = in.optJSONArray("messages");
                if (ping) {
                    messages = new JSONArray().put(new JSONObject().put("role", "user").put("content", "Tek kelimeyle yanıtla: hazır"));
                }
                if (messages == null || messages.length() == 0) throw new IllegalStateException("empty-messages");

                String lastError = null;
                for (String model : models) {
                    JSONObject body = new JSONObject();
                    body.put("model", model);
                    body.put("messages", messages);
                    body.put("max_tokens", ping ? 8 : 240);
                    body.put("temperature", 0.5);
                    body.put("top_p", 0.9);
                    HttpResult response = post(key, body.toString(), ping ? 12000 : 20000);
                    if (response.code == 200) {
                        JSONObject data = new JSONObject(response.body);
                        JSONArray choices = data.optJSONArray("choices");
                        JSONObject first = choices == null ? null : choices.optJSONObject(0);
                        JSONObject message = first == null ? null : first.optJSONObject("message");
                        String text = message == null ? "" : message.optString("content", "").trim();
                        if (!text.isEmpty()) {
                            result.put("ok", true).put("text", text.length() > 900 ? text.substring(0, 900) : text).put("model", model);
                            dispatch(web, id, result);
                            return;
                        }
                        lastError = "empty";
                        continue;
                    }
                    lastError = "groq-" + response.code;
                    /* Model adı reddedildiyse sıradaki modeli dene; diğer hatalarda dur. */
                    if (response.code != 400 && response.code != 404) break;
                }
                throw new IllegalStateException(lastError == null ? "groq" : lastError);
            } catch (Exception e) {
                try {
                    String message = e.getMessage() == null ? "error" : e.getMessage();
                    result.put("ok", false).put("error", message);
                } catch (Exception ignored) { }
            }
            dispatch(web, id, result);
        }, "kamp-ai-chat");
        worker.setDaemon(true);
        worker.start();
    }

    private static final class HttpResult {
        final int code;
        final String body;
        HttpResult(int code, String body) { this.code = code; this.body = body; }
    }

    private static HttpResult post(String key, String body, int readTimeoutMs) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(ENDPOINT).openConnection();
        try {
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(12000);
            connection.setReadTimeout(readTimeoutMs);
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + key);
            connection.setRequestProperty("User-Agent", "SinavKampi/1.5 (Android)");
            try (OutputStream out = connection.getOutputStream()) {
                out.write(body.getBytes(StandardCharsets.UTF_8));
            }
            int code = connection.getResponseCode();
            InputStream stream = code >= 200 && code < 300 ? connection.getInputStream() : connection.getErrorStream();
            String text = "";
            if (stream != null) {
                try (InputStream in = new BufferedInputStream(stream); ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
                    byte[] chunk = new byte[4096];
                    int read;
                    while ((read = in.read(chunk)) != -1) buffer.write(chunk, 0, read);
                    text = new String(buffer.toByteArray(), StandardCharsets.UTF_8);
                }
            }
            return new HttpResult(code, text);
        } finally {
            connection.disconnect();
        }
    }

    /** Sonucu ana iş parçacığında web katmanına iletir. */
    private static void dispatch(WebView web, String id, JSONObject result) {
        if (web == null) return;
        final String script = "window.KampAI&&window.KampAI._aiReply(" + JSONObject.quote(id) + "," + JSONObject.quote(result.toString()) + ")";
        web.post(() -> web.evaluateJavascript(script, null));
    }
}
