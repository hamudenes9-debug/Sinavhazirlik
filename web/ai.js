/* Kamp Koçu: ödev listesi, günlük çıkış saati aramaları ve tamamen cihazda çalışan sesli koç. */
(() => {
'use strict';
const AIC = window.KampAIcore;
/* ai-net.js yüklenemezse koç yalnızca cihazda çalışmaya devam eder. */
const NET = window.KampNet || {
  DEFAULT_MODEL: '', FALLBACK_MODELS: [],
  sanitizeKey: () => '', sanitizeModel: v => String(v || ''), maskKey: v => String(v || ''),
  needsNetwork: () => false, buildMessages: () => [], testQuestion: () => '',
  ask: async () => ({ ok: false, error: 'Çevrimiçi beyin yüklenmedi' })
};
const HW_KEY = 'sinav-kampi-homework-v1';
const AI_KEY = 'sinav-kampi-ai-v1';
const LAST_KEY = 'sinav-kampi-ai-last';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const A = () => window.KampApp;
const bridge = () => window.AndroidBridge;
const DAY_LABELS = {1: 'Pazartesi', 2: 'Salı', 3: 'Çarşamba', 4: 'Perşembe', 5: 'Cuma', 6: 'Cumartesi', 7: 'Pazar'};

let settings = loadSettings();
let homework = loadHomework();
let call = null;
let overlay = null;
let callTimer = null;
let autoTimer = null;
/* Uygulamayla gelen doğal ses klipleri: cihazın robotik sesine düşmeden önce bunlar çalınır. */
const CLIPS = {
  intro: 'Merhaba! Ben Kamp Koçu. Bugün hangi ödevleri verdiler? Dersleriyle birlikte söyle, kaydedeyim.',
  who: 'Ben Kamp Koçu’yum. Ödevlerini kaydediyorum, sınavlarına hazırlanmana yardım ediyorum ve teslimden bir gün önce seni hatırlatıyorum.',
  capabilities: 'Ödevlerini sesle kaydediyorum, teslimden önce arıyorum, sınav takvimini söylüyorum. Ders sorularına da örnekle cevap veriyorum.',
  thanks: 'Ne demek, her zaman. Şimdi bugün hangi ödevleri verdiler, onu söyle.',
  none: 'Ödev yoksa harika. O zaman bugünkü sınav tekrarına kısa bir bakış atalım mı?',
  saved: 'Kaydettim. Teslimden bir gün önce seni yine ararım. Başka ödev var mı?',
  retry: 'Tam çıkaramadım. Örnek: matematik çalışma kağıdı, fen özeti. Dersleriyle birlikte söyler misin?',
  reminder: 'Yarın ödevinin teslimi var. Bugün bitirmek için kısa bir plan yapalım mı?',
  exam: 'Yarın sınavın var, unutma. Bugün kısa bir tekrar yeterli.',
  greet: 'Merhaba! Ben Kamp Koçu. Bugün hangi ödevleri verdiler?'
};
let clipAudio = null;
let clipFallback = null;
function stopClip() {
  try { if (clipAudio) { clipAudio.pause(); clipAudio.currentTime = 0; } } catch {}
  clipAudio = null;
  clipFallback = null;
  const b = bridge();
  if (b && typeof b.stopClip === 'function') { try { b.stopClip(); } catch {} }
}
function playRing() {
  if (settings.voicePack === false) return;
  const b = bridge();
  if (b && typeof b.playClip === 'function') {
    clipFallback = { name: 'ring', fail: () => {} };
    try { b.playClip('ring'); return; } catch {}
  }
  try {
    clipAudio = new Audio('voice/ring.wav');
    clipAudio.onended = () => { clipAudio = null; };
    const played = clipAudio.play();
    if (played && played.catch) played.catch(() => { clipAudio = null; });
  } catch {}
}
function testAudio() {
  playRing();
  setTimeout(() => speak('Merhaba, ben Kamp Koçu. Zil sesi ve sesim böyle geliyor.'), 1400);
  return 'Zil çalıyor, ardından koç konuşacak. Telefonun medya sesini açmayı unutma.';
}
function speakClip(name, ok, fail) {
  try {
    if (!CLIPS[name] || settings.voicePack === false) return false;
    const b = bridge();
    if (b && typeof b.playClip === 'function') {
      clipFallback = { name, fail };
      b.playClip(name);
      return true;
    }
    const audio = new Audio('voice/' + name + '.mp3');
    audio.preload = 'auto';
    clipAudio = audio;
    let settled = false;
    const done = () => { if (settled) return; settled = true; clipAudio = null; ok(); };
    const bad = () => { if (settled) return; settled = true; clipAudio = null; fail(); };
    audio.onended = done;
    audio.onerror = bad;
    const played = audio.play();
    if (played && played.catch) played.catch(bad);
    return true;
  } catch { return false; }
}
let knowledgeCache = null;
let netWarned = false;

/* Çevrimiçi beyin: anahtar ayarlardan ya da derleme sırasında gömülen yapılandırmadan gelir. */
function bakedConfig() { return (window.KAMP_AI_CONFIG || {}); }
function effectiveKey() { return (settings.apiKey || NET.sanitizeKey(bakedConfig().openrouterKey) || ''); }
function keySource() { return settings.apiKey ? 'user' : (NET.sanitizeKey(bakedConfig().openrouterKey) ? 'builtin' : ''); }
function netModel() { return NET.sanitizeModel(settings.model || bakedConfig().model || ''); }
function onlineEnabled() { return settings.online !== false && !!effectiveKey(); }
function hasInternet() { try { return navigator.onLine !== false; } catch { return true; } }
function examContext() {
  try {
    const app = A();
    if (!app) return [];
    return app.activeExams().filter(e => app.C.daysBetween(app.C.today(), e.date) >= 0).slice(0, 4).map(e => ({ name: e.name, date: e.date }));
  } catch { return []; }
}
async function askOnline(question, intent) {
  if (!onlineEnabled() || !hasInternet()) return null;
  const history = (call?.messages || []).filter(m => m.role === 'user' || m.role === 'assistant').slice(-6);
  const result = await NET.ask({
    question,
    intent,
    history,
    key: effectiveKey(),
    model: netModel(),
    context: { today: today(), name: name(), exams: examContext(), homework: pendingList().map(h => ({ title: h.title, due: h.due })) }
  });
  if (result.ok) return result.text;
  if (!netWarned) {
    netWarned = true;
    try { A()?.toast?.(`Çevrimiçi beyin: ${result.error}. Cihazdaki bilgiyle devam ediyorum.`); } catch {}
    console.warn('OpenRouter', result.error);
  }
  return null;
}
function netStatusText() {
  if (!effectiveKey()) return 'Anahtar yok: koç yalnızca cihazdaki bilgiyle çalışır.';
  if (settings.online === false) return 'Çevrimiçi beyin kapalı: yalnızca cihazdaki bilgi kullanılıyor.';
  const source = keySource() === 'builtin' ? 'uygulamayla gelen anahtar' : 'senin girdiğin anahtar';
  return `Hazır · ${source} · model: ${netModel()}`;
}

function loadSettings() {
  try { return AIC.sanitizeSettings(JSON.parse(localStorage.getItem(AI_KEY) || 'null') || {}); }
  catch { return AIC.sanitizeSettings({}); }
}
function saveSettings() { try { localStorage.setItem(AI_KEY, JSON.stringify(settings)); } catch {} }
function loadHomework() { try { return AIC.sanitizeHomework(JSON.parse(localStorage.getItem(HW_KEY) || '[]')); } catch { return []; } }
function saveHomework() { try { localStorage.setItem(HW_KEY, JSON.stringify(homework)); } catch {} }
function subjects() { return (window.KAMP_DATA && window.KAMP_DATA.subjects) || {}; }
function today() {
  try { if (A()) return A().C.today(); } catch {}
  return AIC.istDate(Date.now());
}
function name() { return settings.name || ''; }
function pendingList() { return AIC.pendingHomework(homework); }
function nextExam() {
  try {
    const app = A();
    if (!app) return null;
    const list = app.activeExams()
      .filter(e => app.C.daysBetween(app.C.today(), e.date) >= 0)
      .sort((a, b) => a.date.localeCompare(b.date) || a.period - b.period);
    if (!list.length) return null;
    const first = list[0];
    return { name: first.name, days: app.C.daysBetween(app.C.today(), first.date), date: first.date };
  } catch { return null; }
}
function homeworkSummary() {
  const pending = pendingList();
  if (!pending.length) return 'Bekleyen ödev yok';
  const dueTomorrow = pending.filter(h => h.due === AIC.addDaysISO(today(), 1)).length;
  return dueTomorrow ? `${pending.length} ödev · ${dueTomorrow} tanesi yarın` : `${pending.length} ödev bekliyor`;
}

/* ---------- Sayfa ---------- */
function dayRows() {
  return [1, 2, 3, 4, 5].map(day => `<label class="day-row">
      <span>${DAY_LABELS[day]}</span>
      <input type="time" data-day-time="${day}" value="${esc(settings.days[String(day)] || '')}" aria-label="${DAY_LABELS[day]} çıkış saati" placeholder="--:--">
      <button type="button" class="day-clear" data-ai="clear-day" data-day="${day}" aria-label="${DAY_LABELS[day]} aramasını kaldır">${settings.days[String(day)] ? '×' : '—'}</button>
    </label>`).join('');
}

function renderPage() {
  const app = A();
  if (!app) return '<div class="empty">Koç yükleniyor…</div>';
  setTimeout(() => { fillVoiceOptions(); applyVoiceConfig(); }, 60);
  const stats = AIC.homeworkStats(homework, today());
  const exam = nextExam();
  const subjectOptions = Object.entries(subjects())
    .map(([id, s]) => `<option value="${esc(id)}">${esc(s.name)}</option>`).join('');
  const schedule = AIC.scheduleSummary(settings.days);
  const intro = app.intro('ÖDEV & SESLİ KOÇ',
    settings.name ? `${settings.name}, ödevlerini birlikte konuşalım.` : 'Ödevlerini birlikte konuşalım.',
    'Okuldan çıktığın saatte Kamp Koçu seni arar; ödevleri sorar, kaydeder ve teslimden önce hatırlatır.',
    `<button class="btn btn-primary" data-ai="call-now">${app.icon('phone')} Beni şimdi ara</button>`);
  return `${intro}
  <div class="ai-layout">
    <div class="ai-main">
      <section class="call-card">
        <div class="call-card-top"><span class="tag-dark">YAPAY ZEKÂ KOÇ</span><span class="call-pill ${settings.enabled ? 'on' : ''}"><i></i>${settings.enabled ? schedule : 'Arama planı kapalı'}</span></div>
        <div class="call-card-body">
          <div class="coach-avatar">${app.icon('spark')}<span class="coach-ring"></span></div>
          <div class="call-card-copy">
            <h2>Kamp Koçu</h2>
            <p>${settings.enabled ? `Okul çıkışında seni arayacak: ${schedule}.` : 'Çıkış saatini seç; her okul günü seni arasın.'}</p>
            <div class="call-card-meta">
              <span>${app.icon('check-square')} ${stats.pending ? `${stats.pending} ödev bekliyor` : 'Bekleyen ödev yok'}</span>
              <span>${app.icon('calendar')} ${exam ? `${exam.name} ${exam.days === 0 ? 'bugün' : exam.days === 1 ? 'yarın' : exam.days > 1 ? exam.days + ' gün sonra' : 'geçti'}` : 'Sınav yok'}</span>
            </div>
          </div>
        </div>
        <div class="call-card-actions">
          <button class="btn btn-white" data-ai="call-now">${app.icon('play')} Sesli arama başlat</button>
          <button class="btn btn-white" data-ai="call-intake">${app.icon('check-square')} Bugünkü ödevleri söyle</button>
          <span class="call-note">${app.icon('shield')} Gerçek telefon araması değil; uygulama içi sesli arama.</span>
        </div>
      </section>

      <section class="card card-padding hw-card">
        <div class="section-heading">
          <div><h2>Ödevlerim</h2><p>Koç aradığında söylediklerin buraya kaydedilir. Liste bu cihazda kalır.</p></div>
          <span class="progress-pill">${stats.done}/${stats.total} bitti</span>
        </div>
        <form id="hw-form" class="hw-form">
          <input name="title" placeholder="Örn. Matematik çalışma kağıdı, 1-10" maxlength="120" required>
          <select name="subject" aria-label="Ders">${subjectOptions}</select>
          <input type="date" name="due" value="${AIC.nextSchoolDay(today())}" required aria-label="Teslim tarihi">
          <button class="btn btn-primary" type="submit">${app.icon('plus')} Ödev ekle</button>
        </form>
        <div class="hw-list">
          ${homework.length ? homework.map(h => {
            const sub = subjects()[h.subject] || { name: h.subject === 'diger' ? 'Diğer' : h.subject };
            const diff = AIC.dayDiff(today(), h.due);
            return `<div class="hw-row ${h.done ? 'done' : ''}">
              <button class="task-check" data-ai="toggle-hw" data-id="${esc(h.id)}" aria-pressed="${h.done}" aria-label="${esc(h.title)}: ${h.done ? 'tamamlandı' : 'tamamla'}">${h.done ? app.icon('check') : ''}</button>
              <div class="hw-info"><strong>${esc(h.title)}</strong><span>${esc(sub.name)} · <em class="${!h.done && diff !== null && diff < 0 ? 'late' : ''}">${AIC.dueLabel(h.due, today())}</em></span></div>
              <button class="icon-btn hw-del" data-ai="delete-hw" data-id="${esc(h.id)}" aria-label="Ödevi sil">${app.icon('trash')}</button>
            </div>`;
          }).join('') : `<div class="hw-empty">${app.icon('check-square')}<div><strong>Henüz ödev eklemedin.</strong><p>Akşam koç seni aradığında söyle; o kaydeder. İstersen buradan da ekleyebilirsin.</p></div></div>`}
        </div>
      </section>
    </div>

    <aside class="ai-aside">
      <section class="card card-padding settings-card">
        <h2>Okul çıkışı araması</h2>
        <label class="form-field"><span>Koç sana nasıl hitap etsin?</span><input id="ai-name" maxlength="24" autocomplete="off" placeholder="Örn. Ahmet" value="${esc(settings.name)}"></label>
        <label class="setting-row">
          <div><strong>Her okul günü beni ara</strong><p>Çıkış saatinde “bugün hangi ödevleri verdiler?” diye sorar ve kaydeder.</p></div>
          <input type="checkbox" id="ai-call-toggle" ${settings.enabled ? 'checked' : ''}>
        </label>
        <div class="day-list" aria-label="Günlük çıkış saatleri">${dayRows()}</div>
        <p class="ai-hint">Örnek: Pazartesi <strong>16:00</strong>, diğer günler <strong>15:10</strong>. Boş bırakılan gün aranmaz. Teslimden bir gün önce ayrıca hatırlatma araması yapılır.</p>
        <button class="btn btn-white ai-test" data-ai="test-call">${app.icon('bell')} Bildirimi test et</button>
      </section>

      <section class="card card-padding settings-card">
        <h2>Koçun beyni</h2>
        <p class="ai-copy">Koç önce <strong>cihazdaki bilgi bankasına</strong> bakar: ders notları, PDF özetleri, hesap makinesi, ödev ve sınavların hep cihazda. Cihazdaki bilgi yetmezse ve internet varsa soruyu OpenRouter’daki yapay zekâya iletir.</p>
        <ul class="ai-commands">
          <li><span>“EBOB nasıl bulunur?”</span><small>Bilgi bankasından örnekli yanıt.</small></li>
          <li><span>“12 × 8 kaç eder?”</span><small>Gerçekten hesaplar.</small></li>
          <li><span>“Bana soru sor”</span><small>Test sorusu sorar, cevabını değerlendirir.</small></li>
          <li><span>“Cebrail’in görevi ne?”</span><small>Cihazdaki PDF notlarından yanıtlar (${(window.KAMP_PDF_KB || []).length} not parçası).</small></li>
          <li><span>“Present perfect nedir?”</span><small>Cihazda yoksa çevrimiçi beyin yanıtlar.</small></li>
        </ul>
        <label class="setting-row">
          <div><strong>Çevrimiçi beyin (OpenRouter)</strong><p>Cihazdaki bilgi yetmediğinde sorunun metni yapay zekâya gönderilir. Kapalıysa koç yalnızca cihazda çalışır.</p></div>
          <input type="checkbox" id="ai-online" ${settings.online !== false ? 'checked' : ''}>
        </label>
        <label class="form-field"><span>OpenRouter API anahtarı ${keySource() === 'builtin' ? '<em>(uygulamayla geliyor)</em>' : ''}</span><input id="ai-api-key" type="password" autocomplete="off" spellcheck="false" placeholder="${effectiveKey() ? 'Kayıtlı: ' + esc(NET.maskKey(effectiveKey())) + ' — değiştirmek için yaz' : 'sk-or-v1-…'}" value=""></label>
        <label class="form-field"><span>Model</span><input id="ai-model" maxlength="80" autocomplete="off" spellcheck="false" value="${esc(netModel())}" placeholder="${NET.DEFAULT_MODEL}"></label>
        <div class="ai-key-actions">
          <button class="btn btn-white" data-ai="paste-key">${app.icon('file')} Panodan yapıştır</button>
          <button class="btn btn-white" data-ai="test-online">${app.icon('spark')} Bağlantıyı dene</button>
          ${keySource() === 'user' ? '<button class="btn btn-white" data-ai="clear-key">Anahtarı sil</button>' : ''}
        </div>
        <p class="ai-hint" id="ai-online-hint">${esc(netStatusText())}</p>
        <p class="ai-hint">Ses kaydı uygulamadan çıkmaz ve saklanmaz; konuşmayı yazıya çeviren Android konuşma servisi Google üzerinden çalışabilir. Çevrimiçi beyin yalnızca sorunun metnini ve ders bağlamını gönderir. Koç sürümü 1.11.0.</p>
      </section>

      <section class="card card-padding">
        <h2>Koçun sesi</h2>
        <p class="ai-copy">Telefonundaki Türkçe sesler arasından seç. “Sesi dene” ile hemen dinleyebilirsin.</p>
        <label class="form-field"><span>Ses</span><select id="ai-voice"><option value="">${settings.voice ? 'Seçili ses' : 'Varsayılan (en iyi ses)'}</option></select></label>
        <label class="setting-row voice-row">
          <div><strong>İnternetli doğal ses</strong><p>Çevrimiçiyken Google’ın daha doğal Türkçe sesini kullanır. Kapalıysa cihazdaki sade ses konuşur.</p></div>
          <input type="checkbox" id="ai-network-voice" ${settings.preferNetwork !== false ? 'checked' : ''}>
        </label>
        <label class="setting-row voice-row">
          <div><strong>Doğal ses paketi</strong><p>Koçun sabit cümleleri uygulamayla gelen doğal kayıtlarla okunur; cihaz sesi gerekmez.</p></div>
          <input type="checkbox" id="ai-voice-pack" ${settings.voicePack !== false ? 'checked' : ''}>
        </label>
        <label class="form-field"><span>Konuşma hızı: <strong id="ai-rate-label">${settings.rate.toFixed(2)}×</strong></span><input type="range" id="ai-rate" min="0.8" max="1.35" step="0.05" value="${settings.rate}"></label>
        <div class="ai-key-actions">
          <button class="btn btn-primary" data-ai="preview-voice">${app.icon('volume')} Sesi dene</button>
          <button class="btn btn-white" data-ai="install-voice">Türkçe sesi indir</button>
        </div>
        <p class="ai-hint" id="ai-voice-hint">Doğal ses paketi kapalıysa telefonun Türkçe sesi kullanılır: Google Konuşma Hizmetleri ve Türkçe ses paketi en iyi sonucu verir. Koç sürümü 1.11.0.</p>
      </section>

      <section class="card card-padding">
        <h2>Nasıl konuşuruz?</h2>
        <ul class="ai-commands">
          <li><span>“Matematik çalışma kağıdı, fen özeti”</span><small>Çıkış aramasında söylersen ödevler kaydedilir.</small></li>
          <li><span>“Matematik ödevini yaptım”</span><small>Ödevi tamamlandı olarak işaretler.</small></li>
          <li><span>“Fen ödevinde takıldım”</span><small>Konuyu hatırlatıp ipucu verir.</small></li>
        </ul>
        <p class="ai-hint">Aramada yazma yoktur; koç yalnızca mikrofonla dinler. Teslimden önceki gün koç “ödevin var, unutma” der.</p>
      </section>
    </aside>
  </div>`;
}

function fillVoiceOptions() {
  const select = $('#ai-voice');
  const b = bridge();
  if (!select || !b || typeof b.voiceList !== 'function') return;
  let voices = [];
  try { voices = JSON.parse(b.voiceList() || '[]'); } catch { voices = []; }
  if (!voices.length) return;
  const current = settings.voice || '';
  select.innerHTML = `<option value="">Varsayılan (en iyi ses)</option>` + voices
    .map(v => `<option value="${esc(v.name)}" ${v.name === current ? 'selected' : ''}>${esc(v.label)}</option>`)
    .join('');
}

function applyVoiceConfig() {
  const b = bridge();
  if (b && typeof b.setVoiceConfig === 'function') {
    try { b.setVoiceConfig(JSON.stringify({ voice: settings.voice || '', rate: settings.rate, preferNetwork: settings.preferNetwork !== false })); } catch {}
  }
}

function homeCard() {
  const pending = pendingList();
  if (!pending.length && !settings.enabled) return '';
  const app = A();
  if (!app) return '';
  return `<section class="card ai-home-card">
    <div class="ai-home-icon">${app.icon('phone')}</div>
    <div class="ai-home-copy"><h3>${settings.name ? `${settings.name}, ` : ''}${pending.length ? `${pending.length} ödev seni bekliyor` : 'Kamp Koçu hazır'}</h3><p>${settings.enabled ? `Çıkışta arayacak: ${AIC.scheduleSummary(settings.days)}` : 'Okul çıkışı seni aramasını ister misin?'}</p></div>
    <div class="ai-home-actions"><button class="btn btn-white" data-ai="call-now">Ara</button><a href="#aiko" class="text-link">Ödevler ${app.icon('arrow')}</a></div>
  </section>`;
}

/* ---------- Ödev işlemleri ---------- */
function newId() {
  const rand = globalThis.crypto?.randomUUID?.() || (Date.now() + '-' + Math.random().toString(36).slice(2, 10));
  return 'hw-' + rand.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 40);
}
function addHomework({ title, subject, due, manual }) {
  const clean = String(title || '').trim();
  /* Üçüncü katman: sesli/otomatik kayıtta sohbet cümlesi asla ödev olmaz. Elle eklemede kullanıcıya güvenilir. */
  if (!manual && AIC.isNotHomework(clean)) return null;
  const item = { id: newId(), title: clean.slice(0, 120), subject, due, done: false, createdAt: Date.now() };
  if (!AIC.validateHomeworkItem(item)) return null;
  homework = AIC.sanitizeHomework([...homework, item]);
  saveHomework(); applyNativeSchedule();
  return item;
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

/* ---------- Arama planı ---------- */
function buildSchedule(now = Date.now()) {
  const events = [];
  const nameText = name();
  for (const slot of AIC.upcomingCalls(now, settings.days, 8)) {
    events.push({
      at: slot.at,
      kind: 'intake',
      title: 'Kamp Koçu seni arıyor',
      text: `${nameText ? nameText + ', ' : ''}bugün hangi ödevleri verdiler? Söyle, kaydedeyim.`
    });
  }
  const date = AIC.istDate(now);
  const tomorrow = AIC.addDaysISO(date, 1);
  const dueTomorrow = pendingList().filter(h => h.due === tomorrow);
  if (dueTomorrow.length) {
    const at = AIC.istAt(date, '18:00');
    if (at && at > now + 60000) {
      const titles = dueTomorrow.map(h => h.title).join(', ');
      events.push({
        at,
        kind: 'reminder',
        title: `${nameText ? nameText + '! ' : ''}Ödevin var, unutma`,
        text: `Yarın ${titles} teslim. Hadi birlikte bakalım.`
      });
    }
  }
  const exam = nextExam();
  if (exam && exam.days === 1) {
    const at = AIC.istAt(date, '18:30');
    if (at && at > now + 60000) {
      events.push({ at, kind: 'reminder', title: `${nameText ? nameText + '! ' : ''}Yarın sınavın var`, text: `Yarın ${exam.name} sınavın var, unutma. Kısa bir tekrar yapalım mı?` });
    }
  }
  return events.sort((a, b) => a.at - b.at).slice(0, 12);
}

function applyNativeSchedule() {
  const list = settings.enabled ? buildSchedule() : [];
  const b = bridge();
  if (b && typeof b.configureAiCall === 'function') {
    try {
      b.configureAiCall(JSON.stringify({ enabled: settings.enabled, name: name(), events: list, pending: pendingList().length }));
    } catch (e) { console.warn('AI call schedule', e); }
  }
  return list;
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
    <div class="call-voice-note" id="call-voice-note">${app.icon('mic')} Yazma yok — koç yalnızca sesle konuşur.</div>
    <div class="call-controls">
      <button class="call-btn" data-ai="toggle-mic" id="call-mic" aria-label="Mikrofonu kapat">${app.icon('mic')}<span>Mikrofon</span></button>
      <button class="call-btn call-hangup" data-ai="hangup" aria-label="Aramayı kapat">${app.icon('phone-off')}<span>Kapat</span></button>
      <button class="call-btn" data-ai="toggle-speaker" id="call-speaker" aria-label="Sesi kapat">${app.icon('volume')}<span>Ses</span></button>
    </div>`;
  document.body.appendChild(wrap);
  overlay = wrap;
  return wrap;
}

const QUIZ_LETTERS = ['A', 'B', 'C', 'D'];
function quizPool() {
  const quizzes = (window.KAMP_CONTENT || {}).quizzes || {};
  const subs = subjects();
  return Object.keys(quizzes)
    .filter(id => Array.isArray(quizzes[id]) && quizzes[id].length && subs[id])
    .map(id => ({ id, list: quizzes[id] }));
}
function startQuiz(preferred) {
  if (!call?.active) return false;
  const pool = quizPool();
  if (!pool.length) { speak('Test soruları yüklenmemiş. Başka bir şey sorabilirsin.'); return false; }
  const chosen = pool.find(p => p.id === preferred) || pool[Math.floor(Math.random() * pool.length)];
  const q = chosen.list[Math.floor(Math.random() * chosen.list.length)];
  if (!q || !Array.isArray(q.options) || !q.options.length) return false;
  call.quiz = { subject: chosen.id, q };
  call.quizOffer = null;
  const list = q.options.slice(0, 4).map((o, i) => `${QUIZ_LETTERS[i]}: ${o}`).join('. ');
  addBubble('note', `Test sorusu (${(subjects()[chosen.id] || {}).name || chosen.id})`);
  speak(`Soru: ${q.q} Seçenekler: ${list}. Cevabını söyle.`);
  return true;
}
function answerQuiz(text) {
  const quiz = call?.quiz;
  if (!quiz) return false;
  const n = AIC.norm(text);
  if (/vazgec|bitti|yeter|istemiyorum|hayir/.test(n)) {
    call.quiz = null; call.quizOffer = null;
    speak('Tamam, testi bıraktık. İstersen bir ders sorusu sor.');
    return true;
  }
  const q = quiz.q;
  let pick = -1;
  const letter = /(?:^|\s)([abcd])(?:\s|$|sikki|sik)/.exec(n);
  if (letter) pick = QUIZ_LETTERS.indexOf(letter[1].toUpperCase());
  if (pick < 0) {
    const num = /(?:^|\s)([1-4])(?:\s|$)/.exec(n);
    if (num) pick = Number(num[1]) - 1;
  }
  if (pick < 0) {
    const option = q.options.findIndex(o => {
      const target = AIC.norm(o);
      return target && (n === target || n.includes(target));
    });
    pick = option;
  }
  if (pick < 0 || pick >= q.options.length) {
    speak('Cevabı anlayamadım. “A”, “B”, “C” ya da “D” diyebilirsin.');
    return true;
  }
  const correct = Number(q.answer);
  call.quiz = null;
  call.quizOffer = quiz.subject;
  if (pick === correct) {
    speak(`Doğru! ${q.explanation || ''} Bir tane daha sorayım mı?`);
  } else {
    speak(`Doğru cevap ${QUIZ_LETTERS[correct]}: ${q.options[correct]}. ${q.explanation || ''} Bir tane daha sorayım mı?`);
  }
  return true;
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

function opening(mode) {
  if (mode === 'intake') return { text: AIC.intakePrompt({ nowMs: Date.now(), name: name() }), clip: 'intro' };
  if (mode === 'reminder') {
    const text = AIC.dueReminder({ homework, tomorrow: AIC.addDaysISO(today(), 1), today: today(), name: name() });
    if (text) return { text, clip: 'reminder' };
    const exam = nextExam();
    if (exam && exam.days === 1) return { text: `${name() ? name() + '! ' : ''}Yarın ${exam.name} sınavın var, unutma. Kısa bir tekrar yapalım mı?`, clip: 'exam' };
  }
  return { text: AIC.buildBriefing({ nowMs: Date.now(), today: today(), homework, exam: nextExam(), name: name() }), clip: null };
}

function startCall(mode = 'manual') {
  if (call?.active) return;
  if (!buildOverlay()) return;
  call = { active: true, mode, messages: [], muted: false, speaker: true, listening: false, speaking: false, startedAt: Date.now(), speakDone: null, intakeDone: mode !== 'intake' };
  overlay.hidden = false;
  document.body.classList.add('call-open');
  $('#call-log').innerHTML = '';
  $('#call-caption').textContent = '';
  setStatus(mode === 'intake' || mode === 'reminder' ? 'Aranıyor…' : 'Bağlanıyor…');
  syncMicButton(); syncSpeakerButton();
  clearInterval(callTimer);
  callTimer = setInterval(updateTimer, 1000);
  updateTimer();
  syncFab();
  const incoming = mode === 'intake' || mode === 'reminder';
  if (incoming) playRing();
  setTimeout(() => { if (call?.active) { const open = opening(mode); speak(CLIPS[open.clip] || open.text, open.clip); } }, incoming ? 2600 : 650);
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
  A()?.render?.();
}

function speak(text, clip) {
  if (!call?.active || !text) return;
  stopClip();
  text = AIC.speechText(text);
  if (!text) return;
  call.speaking = true;
  call.lastAnswer = text;
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
  if (clip && speakClip(clip, finish, () => speakDevice(text, finish))) return;
  speakDevice(text, finish);
}

/* Klip yoksa veya çalınamazsa cihazın ses motoru konuşur. */
function speakDevice(text, finish) {
  const b = bridge();
  if (b && typeof b.speak === 'function') {
    try { b.speak(text); return; } catch {}
  }
  if ('speechSynthesis' in window && call.speaker) {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'tr-TR'; u.rate = 1.05; u.pitch = 1.02;
      const voice = bestTurkishVoice();
      if (voice) u.voice = voice;
      u.onend = finish; u.onerror = finish;
      window.speechSynthesis.speak(u);
      return;
    } catch {}
  }
}

function bestTurkishVoice() {
  try {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const turkish = voices.filter(v => /^tr/i.test(v.lang || ''));
    return turkish.find(v => /google/i.test(v.name)) || turkish[0] || null;
  } catch { return null; }
}

function listen() {
  if (!call?.active) return;
  if (call.muted) { setStatus('Mikrofon kapalı. Açmak için mikrofon düğmesine dokun.'); return; }
  const b = bridge();
  if (b && typeof b.listen === 'function') {
    try {
      const result = JSON.parse(b.listen() || '{}');
      if (result.ok) { call.listening = true; setStatus('Seni dinliyorum…'); }
      else setStatus(result.message || 'Seni dinleyemiyorum. Mikrofon düğmesine dokunup tekrar dene.');
    } catch { setStatus('Seni dinleyemiyorum. Mikrofon düğmesine dokunup tekrar dene.'); }
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { setStatus('Bu tarayıcıda mikrofon yok. APK’da konuşabilirsin.'); return; }
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
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setStatus('Mikrofon izni yok. Tarayıcı ayarlarından izin ver.');
      else if (e.error !== 'no-speech' && e.error !== 'aborted') setStatus('Seni duyamadım. Mikrofon düğmesine dokunup tekrar konuş.');
    };
    rec.onend = () => { if (call) call.listening = false; };
    rec.start();
  } catch { setStatus('Mikrofon başlatılamadı. Mikrofon düğmesine dokunup tekrar dene.'); }
}

function stopVoice() {
  stopClip();
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

  const intent = AIC.classifyUtterance(text, subjects());

  /* Test modu: aktif soru varsa cevabı değerlendir. */
  if (call.quiz && answerQuiz(text)) return;
  if (call.quizOffer && /evet|sor|tabi|olur|devam/.test(AIC.norm(text))) { startQuiz(call.quizOffer); return; }
  if (call.quizOffer) call.quizOffer = null;
  if (intent === 'quiz') { startQuiz(); return; }
  if (intent === 'simplify') {
    const last = call.lastAnswer || '';
    setStatus('Düşünüyor…');
    const simpler = await askOnline(`Şunu 6. sınıf öğrencisine iki kısa cümleyle, daha basit anlat: ${last}`.slice(0, 500), 'simplify');
    if (simpler) { speak(simpler); return; }
    const simple = last.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ').trim();
    speak(simple ? 'Kısaca: ' + simple : 'Hangi konuda takıldığını söyle, daha basit anlatayım.');
    return;
  }

  /* Okul çıkışı araması: yalnızca gerçekten ödev söylenmişse kaydet. */
  if (call.mode === 'intake' && !call.intakeDone) {
    /* İkinci koruma: soru/sohbet cümlesi, model "ödev" dese bile kaydedilmez. */
    if (intent === 'homework' && AIC.isNotHomework(text)) {
      setStatus('Düşünüyor…');
      A().toast('Bu bir sohbet sorusu; ödev olarak kaydetmedim.');
      const realIntent = AIC.classifyUtterance(text, subjects());
      const reply = await answerChat(text, realIntent);
      const clip = realIntent === 'identity' ? 'who' : realIntent === 'capabilities' ? 'capabilities' : null;
      speak(clip ? CLIPS[clip] : reply, clip);
      return;
    }
    if (intent === 'homework') {
      let items = AIC.parseHomeworkUtterance(text, subjects(), today());
      items = items.filter(it => it && !AIC.isNotHomework(it.title));
      if (items.length) {
        const saved = items.map(addHomework).filter(Boolean);
        call.intakeDone = true;
        if (saved.length) {
          addBubble('note', `${saved.map(h => `${(subjects()[h.subject] || {}).name || 'Diğer'} – ${h.title}`).join(', ')} kaydedildi. Teslim: ${AIC.formatDateTR(saved[0].due, true)}.`);
          A()?.render?.();
          setStatus('Koç konuşuyor…');
          speak(CLIPS.saved, 'saved');
          return;
        }
      }
      setStatus('Düşünüyor…');
      speak(CLIPS.retry, 'retry');
      return;
    }
    if (intent === 'no-homework') {
      call.intakeDone = true;
      speak(CLIPS.none, 'none');
      return;
    }
    /* Soru, selamlama, sohbet: kaydetme, cevap ver ve ödevleri yeniden sor. */
    setStatus('Düşünüyor…');
    const answer = await answerChat(text, intent);
    if (intent === 'identity') speak(CLIPS.who, 'who');
    else if (intent === 'capabilities') speak(CLIPS.capabilities, 'capabilities');
    else if (intent === 'greeting') speak(CLIPS.greet, 'greet');
    else if (intent === 'ack') speak(CLIPS.thanks, 'thanks');
    else speak(answer + ' Bu arada bugün hangi ödevleri verdiler? Söylersen kaydederim.');
    return;
  }

  if (call.quiz && answerQuiz(text)) return;
  const doneIds = AIC.matchDone(text, homework, subjects());
  if (doneIds.length) {
    const names = homework.filter(h => doneIds.includes(h.id)).map(h => h.title).join(', ');
    markDone(doneIds);
    addBubble('note', `${names} tamamlandı olarak işaretlendi.`);
  }
  setStatus('Düşünüyor…');
  const reply = await answerChat(text, AIC.classifyUtterance(text, subjects()));
  if (!call?.active) return;
  speak(reply);
}

function knowledgeIndex() {
  if (knowledgeCache) return knowledgeCache;
  try { knowledgeCache = AIC.buildKnowledgeIndex({ subjects: subjects(), quizzes: (window.KAMP_CONTENT || {}).quizzes || {}, kb: window.KAMP_KB || [], pdfKb: window.KAMP_PDF_KB || [] }); }
  catch { knowledgeCache = []; }
  return knowledgeCache;
}
function offlineContext() {
  return { today: today(), homework, subjects: subjects(), exam: nextExam(), name: name(), knowledge: knowledgeIndex() };
}

/* Sorulara cevap: tamamen cihazda, bilgi bankası + hesap + ödev/sınav bağlamı. */
async function answerChat(text, intent) {
  const ctx = offlineContext();
  const local = AIC.offlineAnswer(text, ctx);
  let answer = local;
  if (intent === 'question' || intent === 'chat') {
    const knowledge = AIC.knowledgeAnswer(text, ctx);
    if (knowledge) answer = knowledge;
  }
  const need = NET.needsNetwork({ intent, question: text, normalized: AIC.norm(text), localAnswer: answer, online: settings.online !== false });
  if (need && onlineEnabled() && hasInternet()) {
    setStatus('Çevrimiçi düşünüyor…');
    const online = await askOnline(text, intent);
    if (online) return online;
  }
  return answer;
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
  else if (call?.speaker && call.speaking) bSpeakAgain();
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
    case 'call-intake': startCall('intake'); break;
    case 'hangup': endCall(); break;
    case 'toggle-mic': if (call) { call.muted = !call.muted; syncMicButton(); if (!call.muted) listen(); } break;
    case 'toggle-speaker': if (call) { call.speaker = !call.speaker; syncSpeakerButton(); } break;
    case 'clear-day': {
      const day = String(btn.dataset.day);
      settings.days[day] = '';
      saveSettings(); applyNativeSchedule(); A().render();
      A().toast(`${DAY_LABELS[day]} araması kaldırıldı.`);
      break;
    }
    case 'test-online': {
      if (!effectiveKey()) { A().toast('Önce bir OpenRouter anahtarı ekle.'); break; }
      A().toast('OpenRouter deneniyor…');
      NET.ask({
        question: NET.testQuestion(),
        intent: 'chat',
        key: effectiveKey(),
        model: netModel(),
        context: { today: today(), name: name(), exams: examContext() }
      }).then(result => {
        if (result.ok) A().toast('Çevrimiçi beyin hazır: ' + result.text.slice(0, 90));
        else A().toast('Bağlantı kurulamadı: ' + result.error);
      });
      break;
    }
    case 'paste-key': {
      const save = text => {
        const key = NET.sanitizeKey(text);
        if (!key) { A().toast('Panoda geçerli bir OpenRouter anahtarı yok (sk-or-v1-… ile başlamalı).'); return; }
        settings.apiKey = key;
        settings.online = true;
        saveSettings();
        A().render();
        A().toast('Anahtar cihaza kaydedildi. “Bağlantıyı dene” ile kontrol edebilirsin.');
      };
      const b = bridge();
      if (b && typeof b.readClipboard === 'function') {
        try { save(String(b.readClipboard() || '')); break; } catch {}
      }
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(save).catch(() => A().toast('Pano okunamadı; anahtarı alana yapıştır.'));
      } else A().toast('Pano okunamadı; anahtarı alana yapıştır.');
      break;
    }
    case 'clear-key': {
      settings.apiKey = '';
      saveSettings();
      A().render();
      A().toast('Anahtar silindi. Koç cihazdaki bilgiyle çalışıyor.');
      break;
    }
    case 'preview-voice': {
      if (settings.voicePack !== false && speakClip('intro', () => {}, () => {})) break;
      const b = bridge();
      const sample = 'Merhaba! Ben Kamp Koçu. Bugün hangi ödevleri verdiler?';
      if (b && typeof b.previewVoice === 'function') { try { b.previewVoice(sample); } catch { A().toast('Ses denemesi başlatılamadı.'); } }
      else if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(sample);
        u.lang = 'tr-TR'; u.rate = settings.rate;
        const v = bestTurkishVoice(); if (v) u.voice = v;
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
      } else A().toast('Bu cihazda ses motoru yok.');
      break;
    }
    case 'install-voice': {
      const b = bridge();
      if (b && typeof b.openTtsSettings === 'function') { try { b.openTtsSettings(); } catch {} }
      A().toast('Telefon → Dil ve giriş → Metin okuma → Google Konuşma Hizmetleri → Türkçe ses verisini indir.');
      break;
    }
    case 'tts-settings': {
      const b = bridge();
      if (b && typeof b.openTtsSettings === 'function') { try { b.openTtsSettings(); } catch {} }
      else A().toast('Telefon Ayarları → Dil ve giriş → Metin okuma bölümünü aç.');
      break;
    }
    case 'toggle-hw': toggleHomework(id); A().render(); break;
    case 'delete-hw': deleteHomework(id); A().render(); A().toast('Ödev listeden kaldırıldı.'); break;
    case 'test-call': {
      const b = bridge();
      const first = buildSchedule()[0];
      if (b && typeof b.testAiCall === 'function') {
        try {
          const r = JSON.parse(b.testAiCall(first ? JSON.stringify(first) : '') || '{}');
          A().toast(r.ok ? `Test bildirimi gönderildi: ${first ? first.text : 'Kamp Koçu seni arıyor'}` : 'Bildirim izni yok. Ayarlar’dan izin ver.');
        } catch { A().toast('Test bildirimi gönderilemedi.'); }
      } else {
        A().toast(first ? `Planlanan arama: ${AIC.formatClock(first.at)} — ${first.text}` : 'Önce bir gün ve saat seç.');
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
    const due = String(data.get('due') || AIC.nextSchoolDay(today()));
    if (!title) { A().toast('Ödev başlığını yaz.'); return; }
    if (!/^20\d{2}-\d{2}-\d{2}$/.test(due)) { A().toast('Geçerli bir teslim tarihi seç.'); return; }
    addHomework({ title, subject, due, manual: true });
    A().render();
    A().toast('Ödev eklendi. Teslimden bir gün önce koç hatırlatacak.');
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'ai-call-toggle') {
      settings.enabled = e.target.checked; saveSettings(); applyNativeSchedule(); A().render();
      A().toast(settings.enabled ? `Arama planı açıldı: ${AIC.scheduleSummary(settings.days)}.` : 'Okul çıkışı araması kapatıldı.');
    }
    if (e.target.id === 'ai-voice-pack') {
      settings.voicePack = e.target.checked;
      saveSettings(); A().render();
      A().toast(settings.voicePack ? 'Doğal ses paketi açıldı.' : 'Cihazın ses motoru kullanılacak.');
    }
    if (e.target.id === 'ai-online') {
      settings.online = e.target.checked;
      saveSettings(); A().render();
      A().toast(settings.online ? 'Çevrimiçi beyin açıldı.' : 'Çevrimiçi beyin kapatıldı; her şey cihazda.');
    }
    if (e.target.id === 'ai-model') {
      const model = NET.sanitizeModel(e.target.value);
      settings.model = model;
      saveSettings();
      A().toast('Model kaydedildi: ' + model);
    }
    if (e.target.id === 'ai-network-voice') {
      settings.preferNetwork = e.target.checked;
      saveSettings(); applyVoiceConfig(); A().render();
      A().toast(settings.preferNetwork ? 'Doğal (internetli) ses açıldı.' : 'Cihazdaki çevrimdışı ses kullanılacak.');
    }
    if (e.target.id === 'ai-voice') {
      settings.voice = e.target.value || '';
      saveSettings(); applyVoiceConfig();
      A().toast(settings.voice ? 'Ses kaydedildi. “Sesi dene” ile dinleyebilirsin.' : 'Varsayılan ses kullanılacak.');
    }
    const day = e.target.dataset?.dayTime;
    if (day) {
      const value = AIC.parseTime(e.target.value);
      if (value === null && e.target.value) { A().toast('Geçerli bir saat seç.'); return; }
      settings.days[day] = value || '';
      saveSettings(); applyNativeSchedule(); A().render();
      A().toast(value ? `${DAY_LABELS[day]} araması ${value} olarak kaydedildi.` : `${DAY_LABELS[day]} araması kaldırıldı.`);
    }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'ai-rate') {
      settings.rate = Math.max(0.7, Math.min(1.4, Number(e.target.value) || 1.12));
      const label = $('#ai-rate-label');
      if (label) label.textContent = settings.rate.toFixed(2) + '×';
      clearTimeout(window.__aiRateTimer);
      window.__aiRateTimer = setTimeout(() => { saveSettings(); applyVoiceConfig(); }, 250);
      return;
    }
    if (e.target.id === 'ai-api-key') {
      clearTimeout(window.__aiKeyTimer);
      window.__aiKeyTimer = setTimeout(() => {
        const typed = String(e.target.value || '').trim();
        if (!typed) return;
        const key = NET.sanitizeKey(typed);
        if (!key) { A().toast('Anahtar biçimi geçersiz. sk-or-v1- ile başlamalı.'); return; }
        settings.apiKey = key;
        settings.online = true;
        saveSettings();
        const input = $('#ai-api-key');
        if (input) input.value = '';
        A().render();
        A().toast('Anahtar kaydedildi. “Bağlantıyı dene” ile kontrol edebilirsin.');
      }, 900);
      return;
    }
    if (e.target.id !== 'ai-name') return;
    clearTimeout(window.__aiNameTimer);
    window.__aiNameTimer = setTimeout(() => {
      settings.name = String(e.target.value || '').trim().replace(/\s+/g, ' ').slice(0, 24);
      saveSettings(); applyNativeSchedule();
    }, 600);
  });
  window.addEventListener('hashchange', syncFab);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { applyNativeSchedule(); checkAuto(); } });
  autoTimer = setInterval(checkAuto, 30000);
}

function syncFab() {
  const fab = document.getElementById('ai-fab');
  if (!fab) return;
  const page = (location.hash || '#bugun').replace('#', '').split('?')[0];
  fab.hidden = !!call?.active || page === 'aiko';
}

/* Tarayıcıda (APK dışında) alarm yok: açıkken zamanı yakalar. */
function checkAuto() {
  if (!settings.enabled || call?.active) return;
  if (!A()) return;
  const now = Date.now();
  const events = buildSchedule(now - 180000);
  const due = events.find(ev => ev.at <= now && now - ev.at < 180000);
  if (!due) return;
  const stamp = AIC.istDate(now) + '|' + due.kind + '|' + AIC.formatClock(due.at);
  try { if (localStorage.getItem(LAST_KEY) === stamp) return; localStorage.setItem(LAST_KEY, stamp); } catch {}
  startCall(due.kind);
}

function openFromNotification(kind) {
  const mode = kind === 'intake' || kind === 'reminder' ? kind : 'manual';
  if (location.hash !== '#aiko') location.hash = '#aiko';
  setTimeout(() => { if (!call?.active) startCall(mode); }, 700);
}

/* ---------- Başlat ---------- */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
else install();

window.KampAI = {
  testAudio,
  renderPage, homeCard, openFromNotification, startCall, endCall, syncFab,
  _speakDone: () => { if (call?.speakDone) call.speakDone(); },
  _clipResult: (name, ok) => {
    if (ok) { clipFallback = null; return; }
    const pending = clipFallback;
    clipFallback = null;
    if (pending && pending.name === name && typeof pending.fail === 'function') pending.fail();
  },
  _onSpeech: text => { if (call?.active && text) handleUser(String(text)); },
  _say: text => { if (call?.active && text) handleUser(String(text)); },
  _onSpeechError: code => {
    if (!call?.active) return;
    setStatus(code === 7 ? 'Hiçbir şey duyamadım. Mikrofon düğmesine dokunup tekrar konuş.' : 'Seni duyamadım. Mikrofon düğmesine dokunup tekrar konuş.');
  },
  _onListening: () => { if (call?.active) { call.listening = true; setStatus('Seni dinliyorum…'); } },
  _onMicPermission: ok => {
    if (!call?.active) return;
    if (ok) listen(); else setStatus('Mikrofon izni verilmedi. Telefon ayarlarından izin ver.');
  },
  _speakUnavailable: () => {
    if (!call?.active) return;
    if (call.speakDone) call.speakDone();
    setStatus('Bu cihazda ses çıkışı yok. Yazılı döküm ekranda görünüyor.');
  },
  _syncNative: applyNativeSchedule,
  _answer: (text, intent = 'question') => answerChat(String(text), intent),
  _netStatus: () => ({ online: onlineEnabled(), key: keySource(), model: netModel(), text: netStatusText() }),
  _askOnline: text => askOnline(String(text), 'question'),
  _homework: () => homework,
  _settings: () => settings,
  _plan: () => buildSchedule(),
  _quiz: () => (call && call.quiz ? { subject: call.quiz.subject, q: call.quiz.q } : null),
  _answerQuiz: text => (call ? answerQuiz(String(text)) : false),
  _intake: text => {
    const items = AIC.parseHomeworkUtterance(text, subjects(), today());
    return items.map(addHomework).filter(Boolean);
  }
};

setTimeout(() => { applyNativeSchedule(); applyVoiceConfig(); checkAuto(); A()?.render?.(); }, 900);
})();
