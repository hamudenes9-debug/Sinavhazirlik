/* GitHub sürüm kontrolü: uygulama her açılışta yeni APK var mı diye bakar.
   WebView içinde ağ isteği Android köprüsüyle yapılır; tarayıcıda fetch kullanılır. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root || window).KampUpdate = api;
})(typeof window !== 'undefined' ? window : globalThis, function (root) {
  'use strict';
  const REPO = 'hamudenes9-debug/Sinavhazirlik';
  const API = 'https://api.github.com/repos/' + REPO + '/releases/latest';
  const DISMISS_KEY = 'sinav-kampi-guncelleme-v1';
  const REFRESH_MS = 5 * 60 * 1000;
  const state = { status: 'idle', current: '', info: null, available: false, dismissed: '', error: '', checkedAt: 0, downloading: false, progress: 0, message: '' };
  const pending = new Map();

  function parseVersion(value) {
    return String(value == null ? '' : value).trim().replace(/^v/i, '').split(/[.\-+]/)
      .map(part => parseInt(part, 10)).filter(part => Number.isFinite(part));
  }
  function compareVersions(a, b) {
    const left = parseVersion(a), right = parseVersion(b);
    const size = Math.max(left.length, right.length);
    for (let i = 0; i < size; i++) {
      const x = left[i] || 0, y = right[i] || 0;
      if (x !== y) return x > y ? 1 : -1;
    }
    return 0;
  }
  function normalizeVersion(value) {
    const parts = parseVersion(value);
    return parts.length ? parts.slice(0, 3).join('.') : '0.0.0';
  }
  function pickApk(assets) {
    const list = Array.isArray(assets) ? assets : [];
    const apk = list.find(asset => /\.apk$/i.test(String(asset && asset.name || '')));
    if (!apk) return null;
    return { url: String(apk.browser_download_url || ''), name: String(apk.name || 'Sinav-Kampi.apk'), size: Number(apk.size) || 0 };
  }
  function parseRelease(data) {
    if (!data || typeof data !== 'object') return null;
    const version = normalizeVersion(data.tag_name || data.name);
    if (version === '0.0.0') return null;
    return {
      version,
      tag: String(data.tag_name || ''),
      title: String(data.name || 'Sınav Kampı ' + version),
      notes: String(data.body || '').trim(),
      page: String(data.html_url || ''),
      apk: pickApk(data.assets),
      publishedAt: String(data.published_at || '')
    };
  }
  function currentVersion() {
    try {
      const bridge = root.AndroidBridge;
      if (bridge && typeof bridge.getVersion === 'function') {
        const version = normalizeVersion(bridge.getVersion());
        if (version !== '0.0.0') return version;
      }
    } catch { }
    return normalizeVersion(root.KAMP_VERSION || '0.0.0');
  }
  function dismissedVersion() {
    try { return String((root.localStorage && root.localStorage.getItem(DISMISS_KEY)) || ''); } catch { return ''; }
  }
  function dismiss(version) {
    try { root.localStorage && root.localStorage.setItem(DISMISS_KEY, String(version || '')); } catch { }
    state.dismissed = String(version || '');
  }
  function nativeGet(url) {
    const bridge = root.AndroidBridge;
    if (!bridge || typeof bridge.httpGet !== 'function') return null;
    return new Promise(resolve => {
      const id = 'get' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      pending.set(id, resolve);
      try { bridge.httpGet(id, url); }
      catch { pending.delete(id); resolve({ status: 0, text: '' }); }
      setTimeout(() => { if (pending.has(id)) { pending.delete(id); resolve({ status: 0, text: '' }); } }, 12000);
    });
  }
  async function fetchJson(url) {
    const request = nativeGet(url);
    if (request) return request;
    if (typeof fetch !== 'function') return { status: 0, text: '' };
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 12000) : null;
    try {
      const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store', signal: controller ? controller.signal : undefined });
      const text = await response.text();
      return { status: response.status, text };
    } catch { return { status: 0, text: '' }; }
    finally { if (timer) clearTimeout(timer); }
  }
  async function check(options = {}) {
    if (state.status === 'checking') return state;
    if (!options.force && state.checkedAt && Date.now() - state.checkedAt < REFRESH_MS) return state;
    state.status = 'checking'; state.error = ''; state.message = '';
    state.current = currentVersion();
    const online = (() => { try { return root.navigator.onLine !== false; } catch { return true; } })();
    if (!online) {
      state.status = 'offline'; state.checkedAt = Date.now();
      state.error = 'İnternet yokken güncelleme kontrol edilemez.';
      return state;
    }
    const response = await fetchJson(API + '?t=' + Date.now());
    state.checkedAt = Date.now();
    if (response.status === 404) {
      state.status = 'error'; state.error = 'Yayınlanmış sürüm bulunamadı.';
      return state;
    }
    if (response.status !== 200) {
      state.status = 'error';
      state.error = response.status === 403 || response.status === 429
        ? 'GitHub şu an çok istek aldı; biraz sonra yeniden dene.'
        : 'Güncelleme sunucusuna ulaşılamadı.';
      return state;
    }
    let data = null;
    try { data = JSON.parse(response.text); } catch { data = null; }
    const info = parseRelease(data);
    if (!info) {
      state.status = 'error'; state.error = 'Sürüm bilgisi okunamadı.';
      return state;
    }
    state.info = info;
    state.current = currentVersion();
    state.available = compareVersions(state.current, info.version) < 0;
    state.dismissed = dismissedVersion();
    state.status = 'ready';
    state.message = state.available ? `Yeni sürüm hazır: v${info.version}` : `Uygulaman güncel (v${state.current}).`;
    return state;
  }
  function canInstallNative() {
    const bridge = root.AndroidBridge;
    return !!(bridge && typeof bridge.downloadUpdate === 'function');
  }
  function download() {
    const info = state.info;
    if (!info || !info.apk || !info.apk.url) {
      if (info && info.page) { try { root.open(info.page, '_blank', 'noopener'); } catch { } }
      return false;
    }
    if (canInstallNative()) {
      state.downloading = true; state.progress = 0;
      state.message = 'Güncelleme indiriliyor…';
      try { root.AndroidBridge.downloadUpdate(info.apk.url, info.version); return true; }
      catch { state.downloading = false; state.message = 'İndirme başlatılamadı.'; return false; }
    }
    try { root.open(info.apk.url, '_blank', 'noopener'); return true; } catch { return false; }
  }
  function banner() {
    if (!state.available || state.downloading) return '';
    if (state.dismissed && compareVersions(state.dismissed, state.info && state.info.version) >= 0) return '';
    const info = state.info || {};
    return `<section class="update-banner" role="status">
      <span class="update-badge" aria-hidden="true">↑</span>
      <div class="update-copy"><strong>Yeni sürüm hazır: v${escapeHtml(info.version || '')}</strong><p>${escapeHtml(firstLine(info.notes) || 'Yeni özellikler ve düzeltmeler seni bekliyor.')}</p></div>
      <div class="update-actions">
        <button type="button" class="btn update-go" data-update="download">Güncelle</button>
        <button type="button" class="update-later" data-update="later">Sonra</button>
      </div>
    </section>`;
  }
  function settingsCard() {
    const status = state.status === 'ready'
      ? (state.available ? `Yeni sürüm hazır: v${state.info.version}` : `Uygulaman güncel (v${state.current}).`)
      : state.status === 'checking' ? 'Kontrol ediliyor…'
        : state.status === 'offline' ? 'İnternet yok; kontrol edilemedi.'
          : state.status === 'error' ? state.error
            : 'Uygulama açılırken güncellemeler otomatik kontrol edilir.';
    const canDownload = state.available && state.info && state.info.apk;
    return `<section class="card settings-card" id="update-settings">
      <h2>${'⟳'} Sürüm ve güncellemeler</h2>
      <p>Sınav Kampı GitHub’daki en son sürümü her açılışta kontrol eder. Yeni sürüm varsa indirip kurmayı önerir.</p>
      <div class="update-status${state.available ? ' has-update' : ''}">
        <div><strong>Sürüm v${escapeHtml(state.current || currentVersion())}</strong><small>${escapeHtml(status)}</small></div>
        ${state.available && state.info ? `<span class="tag">v${escapeHtml(state.info.version)} hazır</span>` : ''}
      </div>
      ${state.downloading ? `<div class="update-progress"><i style="width:${Math.max(3, Math.min(100, state.progress))}%"></i></div><p class="calendar-note">${escapeHtml(state.message || 'İndiriliyor…')}</p>` : ''}
      <div class="settings-actions">
        <button class="btn btn-white" data-update="check">${'⟳'} Kontrol et</button>
        ${canDownload ? `<button class="btn btn-primary" data-update="download">Güncellemeyi indir</button>` : ''}
        <a class="btn btn-white" href="https://github.com/${REPO}/releases" target="_blank" rel="noopener">Sürüm notları</a>
      </div>
      <p class="calendar-note">Güncelleme dosyası GitHub’dan indirilir; kurulumu Android onaylar. İnternet yoksa uygulama çalışmaya devam eder.</p>
    </section>`;
  }
  function firstLine(text) {
    const lines = String(text || '').split('\n').map(line => line.trim()).filter(Boolean);
    const useful = lines.find(line => !/^#/.test(line) && line.replace(/[*_`\-\s]/g, '').length > 3);
    return (useful || lines[0] || '').replace(/^#+\s*/, '').replace(/[*_`]/g, '').trim().slice(0, 160);
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function rerender(force) {
    const app = root.KampApp;
    if (!app || typeof app.render !== 'function') return;
    const active = typeof document !== 'undefined' ? document.activeElement : null;
    /* Kullanıcı bir düğmeye ya da alana odaklanmışsa sayfayı altından çekmeyelim
       (form yazımı ve testler bozulmasın). İndirme ilerlemesinde ise elle güncelliyoruz. */
    if (!force && active && active !== document.body) return;
    try { app.render(); } catch { }
  }
  const api = {
    REPO, API, DISMISS_KEY, state,
    parseVersion, compareVersions, normalizeVersion, pickApk, parseRelease, currentVersion,
    dismiss, check, download, banner, settingsCard,
    _resolve(id, status, text) {
      const resolve = pending.get(id);
      if (!resolve) return;
      pending.delete(id);
      resolve({ status: Number(status) || 0, text: String(text || '') });
    },
    _progress(id, percent, message) {
      state.downloading = true;
      state.progress = Math.max(0, Math.min(100, Number(percent) || 0));
      if (message) state.message = String(message);
      rerender(true);
    },
    _finish(message, installed) {
      state.downloading = false;
      state.progress = 0;
      state.message = String(message || '');
      if (installed && state.info) dismiss(state.info.version);
      rerender(true);
    }
  };
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', event => {
      const button = event.target.closest && event.target.closest('[data-update]');
      if (!button) return;
      event.preventDefault();
      const action = button.dataset.update;
      if (action === 'download') { download(); rerender(); return; }
      if (action === 'later') { if (state.info) dismiss(state.info.version); rerender(); return; }
      if (action === 'check') { check({ force: true }).then(rerender); rerender(); }
    });
    const boot = () => setTimeout(() => check().then(rerender), 1200);
    if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
    else document.addEventListener('DOMContentLoaded', boot);
    if (typeof root.addEventListener === 'function') {
      root.addEventListener('online', () => check({ force: true }).then(rerender));
      /* Uygulama arka plandan dönünce de bak: "her açılışta" davranışı. */
      root.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && Date.now() - state.checkedAt > REFRESH_MS) check({ force: true }).then(rerender);
      });
    }
  }
  return api;
});
