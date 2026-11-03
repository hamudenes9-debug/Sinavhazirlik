/* Kamp Koçu: ödev listesi, okul çıkışı araması, sesli sohbet ve Groq bağlantısı. */
(() => {
'use strict';
const AIC = window.KampAIcore;
const CONFIG = window.KAMP_AI_CONFIG || {};
const HW_KEY = 'sinav-kampi-homework-v1';
const AI_KEY = 'sinav-kampi-ai-v1';
const LAST_KEY = 'sinav-kampi-ai-last';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODELS = [CONFIG.model || 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'openai/gpt-oss-20b'];
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const A = () => window.KampApp;
const bridge = () => window.AndroidBridge;

let settings = loadSettings();
let homework = loadHomework();
let call = null;
let overlay = null;
let callTimer = null;
let autoTimer = null;

function loadSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(AI_KEY) || 'null');
    return AIC.sanitizeSettings({ ...raw, proxy: (raw && raw.proxy) || CONFIG.proxy || '' });
  } catch {
    return AIC.sanitizeSettings({ time: '16:30', proxy: CONFIG.proxy || '' });
  }
}
function saveSettings() {
  try { localStorage.setItem(AI_KEY, JSON.stringify(settings)); } catch {}
}
function loadHomework() {
  try { return AIC.sanitizeHomework(JSON.parse(localStorage.getItem(HW_KEY) || '[]')); } catch { return []; }
}
function saveHomework() {
  try { localStorage.setItem(HW_KEY, JSON.stringify(homework)); } catch {}
}
function subjects() { return (window.KAMP_DATA && window.KAMP_DATA.subjects) || {}; }
function currentKey() { return (settings.key || CONFIG.key || '').trim(); }
function hasKey() { return !!currentKey(); }
function today() {
  try { if (A()) return A().C.today(); } catch {}
  return new Date(Date.now() + 180 * 60000).toISOString().slice(0, 10);
}

function pendingList() { return AIC.pendingHomework(homework); }
function nextExam() {
  try {
    const app = A();
    if (!app) return null;
    const list = app.activeExams();
    if (!list.length) return null;
    const first = list[0];
    return { name: first.name, days: app.C.daysBetween(app.C.today(), first.date), date: first.date };
  } catch { return null; }
}

/* ---------- Sayfa ---------- */
function renderPage() {
  const app = A();
  if (!app) return '<div class="empty">Koç yükleniyor…</div>';
  const stats = AIC.homeworkStats(homework, today());
  const exam = nextExam();
  const keyReady = hasKey();
  const subjectOptions = Object.entries(subjects())
    .map(([id, s]) => `<option value="${esc(id)}">${esc(s.name)}</option>`).join('');
  const intro = app.intro('ÖDEV & SESLİ KOÇ', 'Ödevlerini birlikte konuşalım.',
    'Okul çıkışı Kamp Koçu seni arar; ödevlerini sorar, takıldığın yerde ipucu verir.',
    `<button class="btn btn-primary" data-ai="call-now">${app.icon('phone')} Beni şimdi ara</button>`);
  return `${intro}
  <div class="ai-layout">
    <div class="ai-main">
      <section class="call-card">
        <div class="call-card-top"><span class="tag-dark">YAPAY ZEKÂ KOÇ</span><span class="call-pill ${settings.enabled ? 'on' : ''}"><i></i>${settings.enabled ? `Hafta içi ${settings.time}` : 'Arama planı kapalı'}</span></div>
        <div class="call-card-body">
          <div class="coach-avatar">${app.icon('spark')}<span class="coach-ring"></span></div>
          <div class="call-card-copy">
            <h2>Kamp Koçu</h2>
            <p>${settings.enabled ? `Okul çıkışı ${settings.time}'te seni arayacak.` : 'İstersen her okul günü seni arasın.'}</p>
            <div class="call-card-meta">
              <span>${app.icon('check-square')} ${stats.pending ? `${stats.pending} ödev bekliyor` : 'Bekleyen ödev yok'}</span>
              <span>${app.icon('calendar')} ${exam ? `${exam.name} ${exam.days === 0 ? 'bugün' : exam.days === 1 ? 'yarın' : exam.days + ' gün sonra'}` : 'Sınav yok'}</span>
            </div>
          </div>
        </div>
        <div class="call-card-actions">
          <button class="btn btn-white" data-ai="call-now">${app.icon('play')} Sesli arama başlat</button>
          <span class="call-note">${app.icon('shield')} Gerçek telefon araması değil; uygulama içi sesli arama.</span>
        </div>
      </section>

      <section class="card card-padding hw-card">
        <div class="section-heading">
          <div><h2>Ödevlerim</h2><p>Bu liste yalnızca bu cihazda saklanır, buluta gönderilmez.</p></div>
          <span class="progress-pill">${stats.done}/${stats.total} bitti</span>
        </div>
        <form id="hw-form" class="hw-form">
          <input name="title" placeholder="Örn. Matematik çalışma kağıdı, 1-10" maxlength="120" required>
          <select name="subject" aria-label="Ders">${subjectOptions}</select>
          <input type="date" name="due" value="${today()}" required aria-label="Teslim tarihi">
          <button class="btn btn-primary" type="submit">${app.icon('plus')} Ödev ekle</button>
        </form>
        <div class="hw-list">
          ${homework.length ? homework.map(h => {
            const sub = subjects()[h.subject] || { name: h.subject };
            const diff = AIC.dayDiff(today(), h.due);
            return `<div class="hw-row ${h.done ? 'done' : ''}">
              <button class="task-check" data-ai="toggle-hw" data-id="${esc(h.id)}" aria-pressed="${h.done}" aria-label="${esc(h.title)}: ${h.done ? 'tamamlandı' : 'tamamla'}">${h.done ? app.icon('check') : ''}</button>
              <div class="hw-info"><strong>${esc(h.title)}</strong><span>${esc(sub.name)} · <em class="${!h.done && diff !== null && diff < 0 ? 'late' : ''}">${AIC.dueLabel(h.due, today())}</em></span></div>
              <button class="icon-btn hw-del" data-ai="delete-hw" data-id="${esc(h.id)}" aria-label="Ödevi sil">${app.icon('trash')}</button>
            </div>`;
          }).join('') : `<div class="hw-empty">${app.icon('check-square')}<div><strong>Henüz ödev eklemedin.</strong><p>Yarın için bir ödev ekle; koç seni aradığında onu soracak.</p></div></div>`}
        </div>
      </section>
    </div>

    <aside class="ai-aside">
      <section class="card card-padding settings-card">
        <h2>Okul çıkışı araması</h2>
        <label class="setting-row">
          <div><strong>Beni okuldan sonra ara</strong><p>Hafta içi seçtiğin saatte bildirim gelir. Bildirime dokununca koç seni arar.</p></div>
          <input type="checkbox" id="ai-call-toggle" ${settings.enabled ? 'checked' : ''}>
        </label>
        <label class="form-field"><span>Arama saati</span><input type="time" id="ai-call-time" value="${settings.time}" min="12:00" max="22:00"></label>
        <p class="ai-hint">Hafta içi (Pzt–Cum) çalışır. Android’de bildirim izni ve tam alarm izni gerekir.</p>
        <button class="btn btn-white ai-test" data-ai="test-call">${app.icon('bell')} Bildirimi test et</button>
      </section>

      <section class="card card-padding settings-card">
        <h2>Yapay zekâ anahtarı</h2>
        <p class="ai-copy">Anahtar yalnızca bu cihazda saklanır. Sadece Groq’a soru gönderirken kullanılır; buluta eşitlenmez.</p>
        ${CONFIG.key ? `<p class="ai-builtin">${app.icon('check')} Uygulamaya gömülü anahtar kullanılıyor. İstersen kendi anahtarını yazabilirsin.</p>` : ''}
        <label class="form-field"><span>Groq API anahtarı</span><input id="ai-key" type="password" autocomplete="off" spellcheck="false" placeholder="${CONFIG.key ? 'Kendi anahtarın (isteğe bağlı)' : 'gsk_...'}" value="${esc(settings.key)}"></label>
        <div class="ai-key-actions">
          <button class="btn btn-primary" data-ai="save-key">Kaydet</button>
          <button class="btn btn-white" data-ai="clear-key">Sil</button>
        </div>
        <p class="ai-key-state ${keyReady ? 'ready' : ''}">${keyReady ? `${app.icon('check')} Anahtar hazır: koç ayrıntılı yardım verebilir.` : 'Anahtar yok: koç ödev ve sınav bilgilerini yine sesli söyler.'}</p>
      </section>

      <section class="card card-padding">
        <h2>Nasıl konuşuruz?</h2>
        <ul class="ai-commands">
          <li><span>“Matematik ödevini yaptım”</span><small>Ödevi tamamlandı olarak işaretler.</small></li>
          <li><span>“Fen ödevinde takıldım”</span><small>Konuyu hatırlatıp ipucu verir.</small></li>
          <li><span>“Yarın hangi sınav var?”</span><small>Takvimden yanıtlar.</small></li>
        </ul>
        <p class="ai-hint">Mikrofon yoksa yazarak da konuşabilirsin. İnternet yokken koç temel bilgileri söyler.</p>
      </section>
    </aside>
  </div>`;
}

function homeCard() {
  const pending = pendingList();
  if (!pending.length && !settings.enabled) return '';
  const app = A();
  if (!app) return '';
  return `<section class="card ai-home-card">
    <div class="ai-home-icon">${app.icon('phone')}</div>
    <div class="ai-home-copy"><h3>${pending.length ? `${pending.length} ödev seni bekliyor` : 'Kamp Koçu hazır'}</h3><p>${settings.enabled ? `Okul çıkışı ${settings.time}'te seni arayacak.` : 'Okul çıkışı seni aramasını ister misin?'}</p></div>
    <div class="ai-home-actions"><button class="btn btn-white" data-ai="call-now">Ara</button><a href="#aiko" class="text-link">Ödevler ${app.icon('arrow')}</a></div>
  </section>`;
}

/* ---------- Ödev işlemleri ---------- */
function newId() {
  const rand = globalThis.crypto?.randomUUID?.() || (Date.now() + '-' + Math.random().toString(36).slice(2, 10));
  return 'hw-' + rand.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 40);
}
function addHomework(title, subject, due) {
  const item = { id: newId(), title: String(title).trim().slice(0, 120), subject, due, done: false, createdAt: Date.now() };
  if (!AIC.validateHomeworkItem(item)) return false;
  homework = AIC.sanitizeHomework([...homework, item]);
  saveHomework(); applyNativeSchedule();
  return true;
}
function toggleHomework(id) {
  homework = homework.map(h => h.id === id ? { ...h, done: !h.done } : h);
  saveHomework(); applyNativeSchedule();
}
function deleteHomework(id) {
  homework = homework.filter(h => h.id !== id);
  saveHomework(); applyNativeSchedule();
}
function markDone(ids) {
  if (!ids.length) return;
  homework = homework.map(h => ids.includes(h.id) ? { ...h, done: true } : h);
  saveHomework(); applyNativeSchedule();
}

/* ---------- Android zamanlaması ---------- */
function applyNativeSchedule() {
  const b = bridge();
  if (!b || typeof b.configureAiCall !== 'function') return;
  const pending = pendingList();
  try {
    b.configureAiCall(JSON.stringify({
      enabled: settings.enabled,
      time: settings.time,
      pending: pending.length,
      first: pending[0]?.title || '',
      exam: nextExam()?.name || ''
    }));
  } catch (e) { console.warn('AI call schedule', e); }
}

/* ---------- Arama ekranı ---------- */
function buildOverlay() {
  if (overlay) return overlay;
  const app = A();
  if (!app) return null;
  const wrap = document.createElement('div');
  wrap.id = 'ai-call';
  wrap.className = 'call-screen';
  wrap.hidden = true;
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true');
  wrap.setAttribute('aria-label', 'Kamp Koçu araması');
  wrap.innerHTML = `
    <div class="call-glow" aria-hidden="true"></div>
    <div class="call-head"><span>${app.icon('tent')} Sınav Kampı</span><span class="call-secure">${app.icon('shield')} Uygulama içi arama</span></div>
    <div class="call-body">
      <div class="call-avatar"><span class="call-avatar-ring"></span><span class="call-avatar-core">${app.icon('spark')}</span></div>
      <h2>Kamp Koçu</h2>
      <p class="call-status" id="call-status">Bağlanıyor…</p>
      <div class="call-timer" id="call-timer">00:00</div>
      <div class="call-caption" id="call-caption" aria-live="polite"></div>
      <div class="call-log" id="call-log" aria-label="Konuşma dökümü"></div>
    </div>
    <form class="call-input" id="call-form">
      <input id="call-input" autocomplete="off" placeholder="Yazarak cevap ver…" maxlength="500" aria-label="Cevabın">
      <button type="submit" class="call-send" aria-label="Gönder">${app.icon('arrow')}</button>
    </form>
    <div class="call-controls">
      <button class="call-btn" data-ai="toggle-mic" id="call-mic" aria-label="Mikrofonu kapat">${app.icon('mic')}<span>Mikrofon</span></button>
      <button class="call-btn call-hangup" data-ai="hangup" aria-label="Aramayı kapat">${app.icon('phone-off')}<span>Kapat</span></button>
      <button class="call-btn" data-ai="toggle-speaker" id="call-speaker" aria-label="Sesi kapat">${app.icon('volume')}<span>Ses</span></button>
    </div>`;
  document.body.appendChild(wrap);
  overlay = wrap;
  wrap.querySelector('#call-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = wrap.querySelector('#call-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUser(text);
  });
  return wrap;
}

function setStatus(text) { const el = $('#call-status'); if (el) el.textContent = text; }
function setCaption(text) {
  const el = $('#call-caption');
  if (el) el.textContent = text;
  const log = $('#call-log');
  if (!log) return;
  [...log.children].forEach(b => b.classList.remove('live'));
  for (let i = log.children.length - 1; i >= 0; i--) {
    if (log.children[i].textContent === text) { log.children[i].classList.add('live'); break; }
  }
}
function addBubble(role, text) {
  const log = $('#call-log');
  if (!log) return;
  const row = document.createElement('div');
  row.className = 'call-bubble ' + role;
  row.textContent = text;
  log.appendChild(row);
  while (log.children.length > 12) log.removeChild(log.firstChild);
  log.scrollTop = log.scrollHeight;
}
function updateTimer() {
  if (!call?.active) return;
  const seconds = Math.floor((Date.now() - call.startedAt) / 1000);
  const el = $('#call-timer');
  if (el) el.textContent = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}

function startCall(source = 'manual') {
  if (call?.active) return;
  const app = A();
  if (!app) return;
  if (!buildOverlay()) return;
  call = { active: true, messages: [], muted: false, speaker: true, listening: false, speaking: false, startedAt: Date.now(), speakDone: null, source };
  overlay.hidden = false;
  document.body.classList.add('call-open');
  $('#call-log').innerHTML = '';
  $('#call-caption').textContent = '';
  $('#call-input').value = '';
  setStatus('Bağlanıyor…');
  syncMicButton(); syncSpeakerButton();
  clearInterval(callTimer);
  callTimer = setInterval(updateTimer, 1000);
  updateTimer();
  syncFab();
  setTimeout(() => {
    if (!call?.active) return;
    speak(briefing());
  }, 650);
}

function endCall() {
  if (!call) return;
  call.active = false;
  if (call.speakTimer) clearTimeout(call.speakTimer);
  clearInterval(callTimer);
  callTimer = null;
  stopVoice();
  if (overlay) overlay.hidden = true;
  document.body.classList.remove('call-open');
  syncFab();
  call = null;
}

function briefing() {
  const exam = nextExam();
  return AIC.buildBriefing({ nowMs: Date.now(), today: today(), homework, exam });
}

function speak(text) {
  if (!call?.active || !text) return;
  call.speaking = true;
  setStatus('Koç konuşuyor…');
  setCaption(text);
  addBubble('coach', text);
  call.messages.push({ role: 'assistant', content: text });
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (!call) return;
    clearTimeout(call.speakTimer);
    call.speaking = false;
    if (!call.active) return;
    if (!call.speaker) { setStatus('Ses kapalı. Yazabilir veya mikrofonu açabilirsin.'); return; }
    setStatus('Seni dinliyorum…');
    setTimeout(() => { if (call?.active) listen(); }, 250);
  };
  call.speakDone = finish;
  const estimate = Math.min(45000, 2200 + text.length * 55);
  call.speakTimer = setTimeout(finish, estimate);
  const b = bridge();
  if (b && typeof b.speak === 'function') {
    try { b.speak(text); return; } catch {}
  }
  if ('speechSynthesis' in window && call.speaker) {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'tr-TR'; u.rate = 1; u.pitch = 1;
      u.onend = finish; u.onerror = finish;
      window.speechSynthesis.speak(u);
      return;
    } catch {}
  }
}

function listen() {
  if (!call?.active) return;
  if (call.muted) { setStatus('Mikrofon kapalı. Yazarak devam edebilirsin.'); focusInput(); return; }
  const b = bridge();
  if (b && typeof b.listen === 'function') {
    try {
      const result = JSON.parse(b.listen() || '{}');
      if (result.ok) { call.listening = true; setStatus('Seni dinliyorum…'); }
      else setStatus(result.message || 'Seni dinleyemiyorum. Yazarak devam edebilirsin.');
    } catch { setStatus('Seni dinleyemiyorum. Yazarak devam edebilirsin.'); }
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { setStatus('Mikrofon bu cihazda yok. Yazarak cevap verebilirsin.'); focusInput(); return; }
  try {
    const rec = new SR();
    rec.lang = 'tr-TR'; rec.interimResults = false; rec.maxAlternatives = 1; rec.continuous = false;
    call.recognition = rec;
    rec.onstart = () => { if (!call) return; call.listening = true; setStatus('Seni dinliyorum…'); };
    rec.onresult = e => {
      if (!call) return;
      const text = e.results?.[0]?.[0]?.transcript?.trim();
      if (text) handleUser(text);
    };
    rec.onerror = e => {
      if (!call) return;
      call.listening = false;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setStatus('Mikrofon izni yok. Yazarak cevap verebilirsin.');
      else if (e.error !== 'no-speech' && e.error !== 'aborted') setStatus('Seni duyamadım. Yazarak da yazabilirsin.');
      focusInput();
    };
    rec.onend = () => { if (call) call.listening = false; };
    rec.start();
  } catch { setStatus('Mikrofon başlatılamadı. Yazarak devam edebilirsin.'); focusInput(); }
}

function focusInput() { setTimeout(() => $('#call-input')?.focus(), 50); }

function stopVoice() {
  const b = bridge();
  if (b && typeof b.stopVoice === 'function') { try { b.stopVoice(); } catch {} }
  try { window.speechSynthesis?.cancel(); } catch {}
  try { call?.recognition?.abort?.(); } catch {}
}

async function handleUser(text) {
  if (!call?.active) return;
  addBubble('user', text);
  setCaption(text);
  call.messages.push({ role: 'user', content: text });
  const doneIds = AIC.matchDone(text, homework, subjects());
  if (doneIds.length) {
    markDone(doneIds);
    const names = homework.filter(h => doneIds.includes(h.id)).map(h => h.title).join(', ');
    addBubble('note', `${names} tamamlandı olarak işaretlendi.`);
  }
  setStatus('Düşünüyor…');
  let reply;
  if (hasKey() || CONFIG.proxy || settings.proxy) {
    try { reply = await askGroq(text); }
    catch (err) {
      console.warn('Groq', err);
      reply = AIC.offlineAnswer(text, offlineContext());
    }
  } else {
    await new Promise(r => setTimeout(r, 350));
    reply = AIC.offlineAnswer(text, offlineContext());
  }
  if (!call?.active) return;
  speak(reply);
}

function offlineContext() {
  return { today: today(), homework, subjects: subjects(), exam: nextExam() };
}

async function askGroq(userText) {
  const key = currentKey();
  const proxy = settings.proxy || CONFIG.proxy || '';
  const base = { userText, history: call.messages.slice(0, -1), today: today(), homework, exams: [], tasks: [] };
  try {
    const app = A();
    base.exams = app.activeExams().slice(0, 4).map(e => ({ name: e.name, date: e.date, days: app.C.daysBetween(app.C.today(), e.date) }));
    base.tasks = app.todayPlan().map(t => ({ title: t.title, done: !!app.getState().completed[t.id] }));
  } catch {}
  const messages = AIC.composeMessages(base);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    if (proxy) {
      const res = await fetch(proxy, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }), signal: controller.signal });
      if (!res.ok) throw new Error('proxy-' + res.status);
      const data = await res.json();
      const text = data.reply || data.choices?.[0]?.message?.content;
      if (!text) throw new Error('empty');
      return String(text).trim().slice(0, 800);
    }
    if (!key) throw new Error('no-key');
    let lastErr = null;
    for (const model of [...new Set(MODELS)]) {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({ model, messages, max_tokens: 240, temperature: 0.5, top_p: 0.9 }),
        signal: controller.signal
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error('empty');
        return String(text).trim().slice(0, 800);
      }
      const detail = await res.text().catch(() => '');
      lastErr = new Error('groq-' + res.status + ':' + detail.slice(0, 200));
      if (![400, 404].includes(res.status) || !/model|decommission/i.test(detail)) break;
    }
    throw lastErr || new Error('groq');
  } finally { clearTimeout(timeout); }
}

function syncMicButton() {
  const btn = $('#call-mic');
  if (!btn) return;
  btn.classList.toggle('off', !!call?.muted);
  btn.setAttribute('aria-label', call?.muted ? 'Mikrofonu aç' : 'Mikrofonu kapat');
  if (call?.muted) { try { bridge()?.stopListening?.(); } catch {} try { call?.recognition?.abort?.(); } catch {} }
}
function syncSpeakerButton() {
  const btn = $('#call-speaker');
  if (!btn) return;
  btn.classList.toggle('off', call ? !call.speaker : false);
  btn.setAttribute('aria-label', call?.speaker ? 'Sesi kapat' : 'Sesi aç');
  if (call && !call.speaker) { stopVoice(); if (call.speakDone) call.speakDone(); }
  else if (call?.speaker && call.speaking) { bSpeakAgain(); }
}
function bSpeakAgain() {
  const last = [...(call?.messages || [])].reverse().find(m => m.role === 'assistant');
  if (!last) return;
  const b = bridge();
  try { b?.speak?.(last.content); } catch {}
  try { if (!b?.speak && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(last.content); u.lang = 'tr-TR'; window.speechSynthesis.speak(u); } } catch {}
}

/* ---------- Olaylar ---------- */
function onAiClick(btn) {
  const action = btn.dataset.ai;
  const id = btn.dataset.id;
  switch (action) {
    case 'call-now': startCall('manual'); break;
    case 'hangup': endCall(); break;
    case 'toggle-mic': if (call) { call.muted = !call.muted; syncMicButton(); if (!call.muted) listen(); } break;
    case 'toggle-speaker': if (call) { call.speaker = !call.speaker; syncSpeakerButton(); } break;
    case 'save-key': {
      const value = ($('#ai-key')?.value || '').trim();
      if (value && !/^gsk_[A-Za-z0-9]{20,}$/.test(value) && !/^[A-Za-z0-9_-]{24,}$/.test(value)) { A().toast('Anahtar biçimi geçerli görünmüyor. Groq anahtarı gsk_ ile başlar.'); return; }
      settings.key = value; saveSettings(); A().render(); A().toast(value ? 'Anahtar kaydedildi. Koç artık ayrıntılı yardım verebilir.' : 'Anahtar silindi.');
      break;
    }
    case 'clear-key': settings.key = ''; saveSettings(); A().render(); A().toast('Anahtar bu cihazdan silindi.'); break;
    case 'toggle-hw': toggleHomework(id); A().render(); break;
    case 'delete-hw': deleteHomework(id); A().render(); A().toast('Ödev listeden kaldırıldı.'); break;
    case 'test-call': {
      const b = bridge();
      if (b && typeof b.testAiCall === 'function') {
        try { const r = JSON.parse(b.testAiCall() || '{}'); A().toast(r.ok ? 'Test bildirimi gönderildi. Bildirim iznini kontrol et.' : 'Bildirim izni yok. Ayarlar’dan izin ver.'); }
        catch { A().toast('Test bildirimi gönderilemedi.'); }
      } else {
        A().toast('Tarayıcıda arama bildirimi yok. “Beni şimdi ara” ile dene.');
      }
      break;
    }
  }
}

function install() {
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ai]');
    if (b) { e.preventDefault(); onAiClick(b); }
  });
  document.addEventListener('submit', e => {
    if (e.target.id !== 'hw-form') return;
    e.preventDefault();
    const data = new FormData(e.target);
    const title = String(data.get('title') || '').trim();
    const subject = String(data.get('subject') || '');
    const due = String(data.get('due') || today());
    if (!title) { A().toast('Ödev başlığını yaz.'); return; }
    if (!/^20\d{2}-\d{2}-\d{2}$/.test(due)) { A().toast('Geçerli bir teslim tarihi seç.'); return; }
    addHomework(title, subject, due);
    A().render();
    A().toast('Ödev eklendi. Koç seni aradığında bunu soracak.');
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'ai-call-toggle') {
      settings.enabled = e.target.checked; saveSettings(); applyNativeSchedule(); A().render();
      A().toast(settings.enabled ? `Arama planı açıldı: hafta içi ${settings.time}.` : 'Okul çıkışı araması kapatıldı.');
    }
    if (e.target.id === 'ai-call-time') {
      const value = AIC.parseTime(e.target.value);
      if (!value) { A().toast('Geçerli bir saat seç.'); return; }
      settings.time = value; saveSettings(); applyNativeSchedule(); A().render();
      A().toast(`Arama saati ${value} olarak kaydedildi.`);
    }
  });
  window.addEventListener('hashchange', syncFab);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkAuto(); });
  autoTimer = setInterval(checkAuto, 30000);
}

function syncFab() {
  const fab = document.getElementById('ai-fab');
  if (!fab) return;
  const page = (location.hash || '#bugun').replace('#', '').split('?')[0];
  fab.hidden = !!call?.active || page === 'aiko';
}

function checkAuto() {
  if (!settings.enabled || call?.active) return;
  if (!A()) return;
  const now = Date.now();
  const due = AIC.nextCallAt(now - 180000, settings.time);
  if (!due || due > now || now - due >= 180000) return;
  const stamp = new Date(now).toISOString().slice(0, 10) + '|' + settings.time;
  try { if (localStorage.getItem(LAST_KEY) === stamp) return; localStorage.setItem(LAST_KEY, stamp); } catch {}
  startCall('auto');
}

function openFromNotification() {
  if (location.hash !== '#aiko') location.hash = '#aiko';
  setTimeout(() => { if (!call?.active) startCall('notification'); }, 700);
}

/* ---------- Başlat ---------- */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
else install();

window.KampAI = {
  renderPage, homeCard, openFromNotification, startCall, endCall, syncFab,
  _speakDone: () => { if (call?.speakDone) call.speakDone(); },
  _onSpeech: text => { if (call?.active && text) handleUser(String(text)); },
  _onSpeechError: code => {
    if (!call?.active) return;
    setStatus(code === 7 ? 'Hiçbir şey duyamadım. Yazarak da cevap verebilirsin.' : 'Seni duyamadım. Yazarak devam edebilirsin.');
    focusInput();
  },
  _onListening: () => { if (call?.active) { call.listening = true; setStatus('Seni dinliyorum…'); } },
  _onMicPermission: ok => {
    if (!call?.active) return;
    if (ok) listen(); else { setStatus('Mikrofon izni verilmedi. Yazarak cevap verebilirsin.'); focusInput(); }
  },
  _speakUnavailable: () => {
    if (!call?.active) return;
    if (call.speakDone) call.speakDone();
    setStatus('Bu cihazda ses yok. Yazarak sohbet edebilirsin.');
  },
  _syncNative: applyNativeSchedule,
  _homework: () => homework,
  _settings: () => settings
};

setTimeout(() => { applyNativeSchedule(); checkAuto(); }, 1200);
})();
