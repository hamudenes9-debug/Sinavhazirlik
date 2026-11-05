/* Çevrimiçi beyin: OpenRouter üzerinden yapay zekâ yanıtı.
 * Anahtar hiçbir zaman HTML'e yazılmaz; yalnızca istek başlığında kullanılır.
 * Tarayıcıda fetch, Android'de yerel köprü (AndroidBridge.networkChat) kullanılır. */
(function (root) {
  'use strict';

  const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
  const DEFAULT_MODEL = 'google/gemini-2.0-flash-001';
  const KEY_RE = /^sk-or-v1-[A-Za-z0-9]{32,120}$/;
  const MODEL_RE = /^[A-Za-z0-9][A-Za-z0-9._:\/-]{2,80}$/;
  const TIMEOUT_MS = 25000;

  const pending = new Map();
  let seq = 0;

  function sanitizeKey(value) {
    const text = String(value || '').trim();
    return KEY_RE.test(text) ? text : '';
  }
  function sanitizeModel(value) {
    const text = String(value || '').trim();
    return MODEL_RE.test(text) ? text : DEFAULT_MODEL;
  }
  function maskKey(key) {
    const text = String(key || '');
    if (!text) return '';
    return text.slice(0, 8) + '…' + text.slice(-4);
  }

  /* Konuşma kuralları: 6. sınıf düzeyi, sesli okunacak kadar kısa, uydurma yok. */
  function systemPrompt(context) {
    const c = context || {};
    const lines = [
      'Sen "Kamp Koçu"sun: 6. sınıf öğrencisiyle Türkçe konuşan, sıcak ve zeki bir çalışma koçusun.',
      'Kurallar:',
      '- Sesli konuşuyorsun. En fazla 3 kısa cümle kur; madde işareti, emoji ve markdown kullanma.',
      '- Anlaşılır Türkçe kullan; 6. sınıf düzeyine uygun konuş.',
      '- Emin olmadığın bilgide tahmin etme; "bunu notlarımdan çıkaramadım" de.',
      '- Ödev ve sınav tarihleri için yalnızca aşağıdaki bilgilere dayan; olmayan ödev veya tarih uydurma.',
      '- Sağlık veya acil durumda öğrenciyi güvendiği bir yetişkine yönlendir.'
    ];
    if (c.today) lines.push(`Bugün: ${c.today}.`);
    if (c.name) lines.push(`Öğrencinin adı: ${c.name}.`);
    if (Array.isArray(c.exams) && c.exams.length) {
      lines.push('Sınavlar: ' + c.exams.slice(0, 4).map(e => `${e.name} ${e.date}`).join(', ') + '.');
    }
    if (Array.isArray(c.homework) && c.homework.length) {
      lines.push('Bekleyen ödevler: ' + c.homework.slice(0, 5).map(h => h.title).join(', ') + '.');
    }
    return lines.join('\n');
  }

  function buildMessages(input) {
    const i = input || {};
    const history = (Array.isArray(i.history) ? i.history : [])
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content.slice(0, 600) }));
    const messages = [{ role: 'system', content: systemPrompt(i.context) }];
    for (const message of history) messages.push(message);
    messages.push({ role: 'user', content: String(i.question || '').slice(0, 600) });
    return messages;
  }

  function buildBody(input) {
    const i = input || {};
    const payload = {
      model: sanitizeModel(i.model),
      messages: i.messages || buildMessages(i),
      temperature: 0.4,
      max_tokens: 240
    };
    if (i.strict !== false) payload.provider = { data_collection: 'deny' };
    return JSON.stringify(payload);
  }

  function buildRequest(input) {
    const i = input || {};
    const key = sanitizeKey(i.key);
    if (!key) return null;
    return { url: ENDPOINT, auth: key, body: buildBody(i) };
  }

  function cleanAnswer(text) {
    let out = String(text || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/^\s*[-•–*]\s+/gm, ' ')
      .replace(/^\s*\d+\.\s+/gm, ' ')
      .replace(/[*_`#>]/g, ' ')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ' ')
      .replace(/\s+([,.;:!?])/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    if (!out) return '';
    if (out.length > 420) {
      const cut = out.slice(0, 420);
      const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
      out = stop > 120 ? cut.slice(0, stop + 1) : cut.trim() + '…';
    }
    return out;
  }

  function errorReason(status, body) {
    const text = String(body || '').slice(0, 400);
    if (status === 0) return 'İnternete ulaşamadım';
    if (status === 401 || status === 403) return 'OpenRouter anahtarı geçersiz';
    if (status === 402) return 'OpenRouter kredisi bitti';
    if (status === 404) return 'Model bulunamadı';
    if (status === 429) return 'Çok fazla istek gönderildi, biraz sonra dene';
    if (status >= 500) return 'OpenRouter şu an yanıt vermiyor';
    try {
      const json = JSON.parse(text);
      if (json && json.error && json.error.message) return String(json.error.message).slice(0, 120);
    } catch {}
    return 'Çevrimiçi beyin yanıt vermedi';
  }

  function parseResponse(status, body) {
    if (!(status >= 200 && status < 300)) return { ok: false, error: errorReason(status, body), status };
    let json = null;
    try { json = JSON.parse(body); } catch { return { ok: false, error: 'Yanıt okunamadı', status }; }
    const choice = json && json.choices && json.choices[0];
    const raw = choice && choice.message && choice.message.content;
    const text = cleanAnswer(raw);
    if (!text) return { ok: false, error: 'Boş yanıt geldi', status };
    return { ok: true, text, model: json.model || '', status };
  }

  /* Yerel beyin yeterli mi? Değilse çevrimiçi beyne sorulur. */
  function needsNetwork(input) {
    const i = input || {};
    if (i.online === false) return false;
    const intent = String(i.intent || '');
    if (intent === 'simplify') return true;
    if (intent !== 'question' && intent !== 'chat') return false;
    const text = String(i.question || '');
    if (/detayli anlat|daha fazla bilgi|internetten|arastir|derinlemesine/.test(String(i.normalized || '').toLowerCase())) return true;
    if (/çıkaramadım/.test(String(i.localAnswer || ''))) return true;
    return /detaylı anlat|daha fazla bilgi|internetten|araştır|derinlemesine/i.test(text);
  }

  async function fetchTransport(url, auth, body) {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), TIMEOUT_MS) : null;
    try {
      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth,
          'HTTP-Referer': 'https://github.com/hamudenes9-debug/Sinavhazirlik',
          'X-Title': 'Sinav Kampi'
        },
        body,
        ...(controller ? { signal: controller.signal } : {})
      });
      return { status: response.status, text: await response.text() };
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  /* Android köprüsü: Java tarafı sonucu KampNet._resolve(id, status, body) ile döndürür. */
  function nativeTransport(url, auth, body) {
    const bridge = root.AndroidBridge;
    if (!bridge || typeof bridge.networkChat !== 'function') return null;
    return new Promise(resolve => {
      const id = 'net-' + (++seq);
      const timer = setTimeout(() => {
        if (pending.has(id)) { pending.delete(id); resolve({ status: 0, text: 'zaman aşımı' }); }
      }, TIMEOUT_MS + 5000);
      pending.set(id, value => { clearTimeout(timer); resolve(value); });
      try {
        bridge.networkChat(id, url, auth, body);
      } catch (error) {
        pending.delete(id);
        clearTimeout(timer);
        resolve({ status: 0, text: String(error && error.message || 'köprü hatası') });
      }
    });
  }

  function _resolve(id, status, body) {
    const done = pending.get(id);
    if (!done) return;
    pending.delete(id);
    done({ status: Number(status) || 0, text: String(body == null ? '' : body) });
  }

  function pickTransport(custom) {
    if (typeof custom === 'function') return custom;
    return async (url, auth, body) => {
      const native = nativeTransport(url, auth, body);
      if (native) return native;
      return fetchTransport(url, auth, body);
    };
  }

  /* Model adı geçersizse ya da sağlayıcı kısıtı reddedilirse sırayla denenir. */
  const FALLBACK_MODELS = ['openai/gpt-4o-mini', 'google/gemini-2.0-flash-001', 'anthropic/claude-3.5-haiku'];

  async function ask(input) {
    const i = input || {};
    const key = sanitizeKey(i.key);
    if (!key) return { ok: false, error: 'OpenRouter anahtarı yok' };
    const transport = pickTransport(i.transport);
    const messages = i.messages || buildMessages(i);
    const first = sanitizeModel(i.model);
    const attempts = [{ model: first, strict: true }, { model: first, strict: false }];
    for (const fallback of FALLBACK_MODELS) {
      if (attempts.length >= 3) break;
      if (fallback !== first) attempts.push({ model: fallback, strict: false });
    }
    let last = { ok: false, error: 'Çevrimiçi beyin yanıt vermedi' };
    for (const attempt of attempts) {
      const body = buildBody({ messages, model: attempt.model, strict: attempt.strict });
      let result = null;
      try {
        result = await transport(ENDPOINT, key, body);
      } catch (error) {
        return { ok: false, error: errorReason(0, ''), detail: String(error && error.message || error) };
      }
      const parsed = parseResponse(result && result.status, result && result.text);
      if (parsed.ok) return { ...parsed, model: attempt.model };
      last = parsed;
      if ([401, 402, 403, 429].includes(Number(result && result.status))) break;
    }
    return last;
  }

  function testQuestion() {
    return 'Kendini tek cümleyle tanıt ve bugün nasıl çalışmam gerektiğini söyle.';
  }

  const api = { ENDPOINT, DEFAULT_MODEL, FALLBACK_MODELS, sanitizeKey, sanitizeModel, maskKey, systemPrompt, buildMessages, buildBody, buildRequest, cleanAnswer, parseResponse, errorReason, needsNetwork, ask, testQuestion, _resolve };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KampNet = api;
})(typeof window !== 'undefined' ? window : globalThis);
