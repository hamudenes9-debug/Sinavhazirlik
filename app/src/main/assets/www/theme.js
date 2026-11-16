/* Renk temaları: seçim cihazda saklanır, sayfa açılmadan önce uygulanır. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root || window).KampTheme = api;
})(typeof window !== 'undefined' ? window : globalThis, function (root) {
  'use strict';
  const KEY = 'sinav-kampi-tema';
  const THEMES = [
    { id: 'kamp', name: 'Kamp', hint: 'Yeşil & krem', sw: ['#e7edde', '#3d6750', '#df693f'], meta: '#f6f7f2' },
    { id: 'okyanus', name: 'Okyanus', hint: 'Mavi & turkuaz', sw: ['#dcecf4', '#1f6f8b', '#e98a5f'], meta: '#f2f7fa' },
    { id: 'gunbatimi', name: 'Gün batımı', hint: 'Sıcak turuncu', sw: ['#fbe6d3', '#9c4f2d', '#e0a04a'], meta: '#fdf6f0' },
    { id: 'lavanta', name: 'Lavanta', hint: 'Mor & lila', sw: ['#ece4f7', '#5b4479', '#c67f9c'], meta: '#f8f5fc' },
    { id: 'gece', name: 'Gece', hint: 'Koyu tema', sw: ['#22302a', '#7fae86', '#e3a06a'], meta: '#121a16' }
  ];
  const ids = () => THEMES.map(theme => theme.id);
  function normalize(name) { return ids().includes(String(name)) ? String(name) : 'kamp'; }
  function current() {
    try {
      const saved = root.localStorage && root.localStorage.getItem(KEY);
      if (saved) return normalize(saved);
    } catch { }
    const attr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.dataset.theme : '';
    return normalize(attr);
  }
  function syncMeta(id) {
    if (typeof document === 'undefined') return;
    const theme = THEMES.find(item => item.id === id) || THEMES[0];
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.meta);
  }
  function apply(name) {
    const id = normalize(name);
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.dataset.theme = id;
      syncMeta(id);
    }
    try { root.localStorage && root.localStorage.setItem(KEY, id); } catch { }
    return id;
  }
  function cycle() {
    const list = ids();
    return apply(list[(list.indexOf(current()) + 1) % list.length]);
  }
  function picker() {
    const active = current();
    return `<div class="theme-grid" role="radiogroup" aria-label="Renk teması">${THEMES.map(theme => `
      <button type="button" class="theme-tile${theme.id === active ? ' active' : ''}" data-theme-pick="${theme.id}" role="radio" aria-checked="${theme.id === active}">
        <span class="theme-swatches" aria-hidden="true">${theme.sw.map(color => `<i style="background:${color}"></i>`).join('')}</span>
        <strong>${theme.name}</strong>
        <small>${theme.hint}</small>
        ${theme.id === active ? '<span class="theme-check" aria-hidden="true">✓</span>' : ''}
      </button>`).join('')}</div>`;
  }
  const api = { KEY, THEMES, ids, normalize, current, apply, cycle, picker, syncMeta };
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', event => {
      const pick = event.target.closest && event.target.closest('[data-theme-pick]');
      if (pick) {
        event.preventDefault();
        apply(pick.dataset.themePick);
        if (window.KampApp) { window.KampApp.render(); window.KampApp.toast(`Tema: ${(THEMES.find(t => t.id === pick.dataset.themePick) || {}).name || ''}`); }
        return;
      }
      const cycleButton = event.target.closest && event.target.closest('[data-theme-cycle]');
      if (cycleButton) {
        event.preventDefault();
        const id = cycle();
        const theme = THEMES.find(item => item.id === id) || THEMES[0];
        if (window.KampApp) { window.KampApp.render(); window.KampApp.toast(`Tema: ${theme.name}`); }
      }
    });
    if (document.documentElement) {
      document.documentElement.dataset.theme = current();
      syncMeta(current());
    }
  }
  return api;
});
