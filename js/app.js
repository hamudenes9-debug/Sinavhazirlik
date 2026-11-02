/* =========================================================
   Sınav Kampı · 6. Sınıf 1. Dönem 1. Yazılı Hazırlık
   Vanilla JS · hash router · localStorage · PWA
   ========================================================= */
(function () {
  "use strict";

  var K = window.KAMP || { sinavlar: [], plan: [], pdfler: [] };
  var LS = "kamp-v1";
  var SAAT = { "2. ders": "09:50", "3. ders": "10:50", "4. ders": "13:00", "5. ders": "14:00" };

  /* ---------------- storage ---------------- */
  var defaults = {
    ad: "",
    bildirimOn: false,
    aralik: 10,
    checks: {},
    sonuclar: {},
    gunluk: {},
    uyari: 0
  };
  var S = load();

  function load() {
    try {
      var raw = localStorage.getItem(LS);
      var o = raw ? JSON.parse(raw) : {};
      return Object.assign({}, defaults, o);
    } catch (e) { return Object.assign({}, defaults); }
  }
  function save() {
    try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {}
  }

  /* ---------------- utils ---------------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function bold(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function startOfDay(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function daysBetween(a, b) { return Math.round((startOfDay(b) - startOfDay(a)) / 86400000); }

  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
    "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  function fmtTarih(d) {
    return d.getDate() + " " + AYLAR[d.getMonth()] + " " + d.getFullYear() + ", " + GUNLER[d.getDay()];
  }
  function fmtKisa(d) { return d.getDate() + " " + AYLAR[d.getMonth()]; }

  function examDate(e) {
    var t = SAAT[e.saat] || "10:00";
    var p = t.split(":");
    return new Date(e.tarih + "T" + p[0] + ":" + p[1] + ":00");
  }

  /* sınav listesi: geçmişler dahil, tarih sıralı */
  var EXAMS = (K.sinavlar || []).map(function (e) {
    var d = examDate(e);
    return Object.assign({}, e, { dt: d, key: e.id, ts: d.getTime() });
  }).sort(function (a, b) { return a.ts - b.ts; });

  function examById(id) {
    for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === id) return EXAMS[i];
    return null;
  }
  /* aynı dersin 2. sınavı ayrı kayıt; ders içeriği aynı obje */
  function upcoming(now) {
    now = now || new Date();
    return EXAMS.filter(function (e) { return e.dt.getTime() + 40 * 60000 > now.getTime(); });
  }
  function pastExams(now) {
    now = now || new Date();
    return EXAMS.filter(function (e) { return e.dt.getTime() + 40 * 60000 <= now.getTime(); });
  }
  function nextExam(now) {
    var u = upcoming(now);
    return u.length ? u[0] : null;
  }
  function kalanMetin(ms) {
    if (ms <= 0) return "başladı";
    var d = Math.floor(ms / 86400000);
    var h = Math.floor((ms % 86400000) / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    if (d > 0) return d + " gün " + h + " sa";
    if (h > 0) return h + " sa " + m + " dk";
    if (m > 0) return m + " dk " + s + " sn";
    return s + " sn";
  }

  /* ---------------- toast ---------------- */
  var toastT = null;
  function toast(msg) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove("show"); }, 3200);
  }

  /* ---------------- bildirimler ---------------- */
  var Cap = window.Capacitor;
  var isNative = !!(Cap && typeof Cap.isNativePlatform === "function" && Cap.isNativePlatform());
  function nativeLN() {
    return (Cap && Cap.Plugins && Cap.Plugins.LocalNotifications) || null;
  }
  var notifIndex = 0;

  function mesajlar() {
    var now = new Date();
    var nx = nextExam(now);
    if (!nx) {
      return [{ title: "Sınav Kampı 🎉", body: "1. dönem 1. yazılılar bitti. Tebrikler, dinlenmeyi hak ettin!" }];
    }
    var out = [];
    var g = daysBetween(now, nx.dt);
    var ders = nx.ad;
    if (g <= 0) {
      out.push({ title: "Bugün " + ders + " sınavın var! 🔔", body: "Saat " + nx.saat + " (" + (SAAT[nx.saat] || "") + "). Son 30 dakika tekrar kartlarına bak, yeni konu açma. Başarılar!" });
      out.push({ title: ders + " sınavı bugün ⏰", body: "Kalan: " + kalanMetin(nx.ts - now.getTime()) + ". Kalem, silgi, cetvelini hazırla." });
    } else if (g === 1) {
      out.push({ title: "Yarın " + ders + " sınavın var 🔔", body: nx.gun + " · " + nx.saat + ". Bugün 45-60 dakika çalış, PDF özetini oku ve 8 soruluk mini testi çöz." });
      out.push({ title: "Yarın " + ders + "! Son hazırlık", body: "Konu özeti → mini test → yanlışlarını tekrar. Erken uyu, en az 7 saat uyku." });
    } else if (g <= 3) {
      out.push({ title: ders + " sınavına " + g + " gün kaldı 📚", body: "Bugün " + (g === 2 ? "40" : "30") + " dakika " + ders + " çalış. " + nx.gun + " · " + nx.saat + "." });
    } else {
      out.push({ title: ders + " sınavına " + g + " gün kaldı ⏳", body: "Kamp planındaki bugünün maddelerini tamamla. Sınav: " + nx.gun + " · " + nx.saat + "." });
    }
    if (g > 0 && g <= 1) {
      out.push({ title: "Sınav Kampı · öneri", body: "İpucu: " + (nx.ipuclari && nx.ipuclari[0] ? nx.ipuclari[0].replace(/\*\*/g, "") : "PDF özetini tekrar et.") });
    }
    return out;
  }

  function notifDurumu() {
    if (!("Notification" in window)) return "desteklenmiyor";
    return Notification.permission;
  }

  function showNotification(title, body) {
    var ln = nativeLN();
    if (ln) {
      try {
        ln.schedule({ notifications: [{
          id: Math.floor(Math.random() * 100000),
          title: title, body: body,
          smallIcon: "ic_stat_icon", iconColor: "#4f46e5"
        }] });
        toast("🔔 " + title);
        return;
      } catch (e) {}
    }
    if ("Notification" in window && Notification.permission === "granted") {
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(function (reg) {
          reg.showNotification(title, {
            body: body,
            icon: "icons/icon-192.png",
            badge: "icons/icon-192.png",
            tag: "kamp-" + Date.now(),
            vibrate: [120, 60, 120]
          });
        }).catch(function () {});
      } else {
        try { new Notification(title, { body: body, icon: "icons/icon-192.png" }); } catch (e) {}
      }
      toast("🔔 " + title);
    } else {
      toast("🔔 " + title + " — " + body);
    }
  }

  function donguBildirim() {
    var m = mesajlar();
    var msg = m[notifIndex % m.length];
    notifIndex++;
    showNotification(msg.title, msg.body);
    S.uyari = Date.now();
    save();
  }

  var timerId = null;
  function bildirimDongusuBaslat() {
    clearInterval(timerId);
    if (!S.bildirimOn) return;
    var ms = Math.max(1, Number(S.aralik) || 10) * 60000;
    timerId = setInterval(donguBildirim, ms);
  }

  /* Native (APK) tarafında uygulama kapalıyken de çalışan zamanlanmış bildirimler */
  function nativeZamanla() {
    var ln = nativeLN();
    if (!ln) return;
    try {
      ln.cancel({ notifications: [] }).catch(function () {});
      var simdi = Date.now();
      var adim = Math.max(1, Number(S.aralik) || 10) * 60000;
      var liste = [];
      var n = 0;
      // önümüzdeki 24 saat, her X dakikada bir
      for (var t = simdi + adim; t < simdi + 24 * 3600000 && n < 144; t += adim) {
        var nx = nextExam(new Date(t));
        var baslik, govde;
        if (!nx) { baslik = "Sınav Kampı"; govde = "Yazılılar bitti, tebrikler!"; }
        else {
          var g = daysBetween(new Date(t), nx.dt);
          var kalan = kalanMetin(nx.ts - t);
          if (g === 0) { baslik = "Bugün " + nx.ad + " sınavın var! 🔔"; govde = nx.saat + " · kalan " + kalan; }
          else if (g === 1) { baslik = "Yarın " + nx.ad + " sınavın var 🔔"; govde = nx.gun + " · " + nx.saat + " · kalan " + kalan; }
          else { baslik = nx.ad + " sınavına " + g + " gün kaldı"; govde = nx.gun + " · " + nx.saat + " · kalan " + kalan; }
        }
        liste.push({ id: 1000 + n, title: baslik, body: govde, schedule: { at: new Date(t) }, smallIcon: "ic_stat_icon" });
        n++;
      }
      // her sınav için önceki akşam 20:00 hatırlatması
      EXAMS.forEach(function (e, i) {
        var oncekiGun = new Date(e.dt.getTime() - 86400000); oncekiGun.setHours(20, 0, 0, 0);
        if (oncekiGun.getTime() > simdi) {
          liste.push({ id: 5000 + i, title: "Yarın " + e.ad + " sınavın var 🔔",
            body: e.gun + " · " + e.saat + ". Bugün 45 dk çalışmayı unutma!",
            schedule: { at: oncekiGun }, smallIcon: "ic_stat_icon" });
        }
        var sabah = new Date(e.dt); sabah.setHours(7, 30, 0, 0);
        if (sabah.getTime() > simdi) {
          liste.push({ id: 6000 + i, title: "Bugün " + e.ad + " sınavın var!",
            body: e.saat + " (" + (SAAT[e.saat] || "") + "). Son 30 dakika kartlarına bak.",
            schedule: { at: sabah }, smallIcon: "ic_stat_icon" });
        }
      });
      if (liste.length) ln.schedule({ notifications: liste }).catch(function () {});
    } catch (e) {}
  }

  function bildirimAc() {
    var ln = nativeLN();
    if (ln) {
      ln.requestPermissions().then(function (r) {
        S.bildirimOn = r.display === "granted";
        save();
        nativeZamanla();
        bildirimDongusuBaslat();
        toast(S.bildirimOn ? "Bildirimler açıldı (her " + S.aralik + " dk)" : "Bildirim izni verilmedi");
        render();
      }).catch(function () { toast("Bildirim izni alınamadı"); });
      return;
    }
    if (!("Notification" in window)) {
      S.bildirimOn = true; save(); bildirimDongusuBaslat();
      toast("Tarayıcı bildirimi yok; uygulama içi uyarılar açıldı.");
      render();
      return;
    }
    Notification.requestPermission().then(function (p) {
      S.bildirimOn = p === "granted" || p === "denied" ? true : false;
      save();
      bildirimDongusuBaslat();
      if (p === "granted") {
        showNotification("Bildirimler açık 🔔", "Her " + S.aralik + " dakikada bir sınav geri sayımı gelecek.");
      } else {
        toast("İzin verilmedi — uygulama içi hatırlatıcı kullanılacak.");
      }
      render();
    }).catch(function () {
      S.bildirimOn = true; save(); bildirimDongusuBaslat(); render();
    });
  }

  function bildirimKapat() {
    S.bildirimOn = false; save(); bildirimDongusuBaslat();
    var ln = nativeLN();
    if (ln) { try { ln.cancel({ notifications: [] }).catch(function () {}); } catch (e) {} }
    toast("Bildirimler kapatıldı");
    render();
  }

  /* ---------------- router ---------------- */
  var TABS = { ana: "/", sinavlar: "/sinavlar", kamp: "/kamp", pdf: "/pdf", daha: "/daha" };
  var view = $("#view");
  var liveTimer = null;

  function route() {
    var h = (location.hash || "#/").replace(/^#/, "");
    if (!h) h = "/";
    clearInterval(liveTimer);
    var parts = h.split("/").filter(Boolean);

    if (parts.length === 0) { renderHome(); setTab("ana"); }
    else if (parts[0] === "sinavlar") { renderSinavlar(); setTab("sinavlar"); }
    else if (parts[0] === "sinav" && parts[1]) { renderSinav(parts[1]); setTab("sinavlar"); }
    else if (parts[0] === "test" && parts[1]) { renderTest(parts[1]); setTab("sinavlar"); }
    else if (parts[0] === "kamp") { renderKamp(); setTab("kamp"); }
    else if (parts[0] === "pdf") { renderPdf(); setTab("pdf"); }
    else if (parts[0] === "daha") { renderDaha(); setTab("daha"); }
    else { renderHome(); setTab("ana"); }

    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }

  function setTab(t) {
    $$("#tabbar a").forEach(function (a) { a.classList.toggle("active", a.dataset.tab === t); });
  }

  window.addEventListener("hashchange", route);

  /* ---------------- topbar ---------------- */
  var QUOTES = [
    "Küçük bir adım, her gün atıldığında büyük fark yaratır.",
    "Bugün 45 dakika çalışan, yarın sınavda 10 dakika kazanır.",
    "Bilmediğin soru, öğrenmeyi bekleyen bir fırsattır.",
    "Yanlış yaptığın soru, doğrusunu öğrendiğin gündür.",
    "Planı olan öğrenci değil, planı uygulayan kazanır.",
    "Erken uyu; hafıza gece çalışır.",
    "12 sınav bitince bu günleri gülümseyerek hatırlayacaksın."
  ];
  function gununSozu() {
    var d = new Date();
    var i = (d.getFullYear() + d.getMonth() + d.getDate()) % QUOTES.length;
    return QUOTES[i];
  }

  function renderTopbar() {
    var nx = nextExam();
    var renk = nx ? nx.renk : "#4f46e5";
    $("#topbar").style.background = "linear-gradient(135deg, " + renk + ", " + shade(renk, -26) + ")";
    var selam = new Date().getHours() < 12 ? "Günaydın" : new Date().getHours() < 18 ? "İyi günler" : "İyi akşamlar";
    $("#topbarInner").innerHTML =
      '<div class="brand"><div class="brand__logo">🎯</div><div style="min-width:0">' +
      '<div class="brand__t">Sınav Kampı</div>' +
      '<div class="brand__s">' + esc(S.ad ? S.ad + " · " : "") + "6. Sınıf · 1. Dönem 1. Yazılı</div>" +
      "</div></div>" +
      '<div class="topbar__spacer"></div>' +
      '<button class="iconbtn" id="btnBell" aria-label="Bildirim ayarları">' + (S.bildirimOn ? "🔔" : "🔕") + "</button>";
    var b = $("#btnBell");
    if (b) b.onclick = function () { location.hash = "#/daha"; };
    void selam;
  }

  function shade(hex, amt) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    var r = Math.min(255, Math.max(0, (n >> 16) + amt));
    var g = Math.min(255, Math.max(0, ((n >> 8) & 255) + amt));
    var b = Math.min(255, Math.max(0, (n & 255) + amt));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* ---------------- ANA SAYFA ---------------- */
  function renderHome() {
    var now = new Date();
    var nx = nextExam(now);
    var tamam = Object.keys(S.checks).filter(function (k) { return S.checks[k]; }).length;
    var toplamMadde = (K.plan || []).reduce(function (a, p) { return a + p.maddeler.length; }, 0);
    var toplamSinav = EXAMS.length;
    var gecen = pastExams(now).length;

    var h = "";

    if (nx) {
      var fark = nx.ts - now.getTime();
      h +=
        '<section class="hero" style="background:linear-gradient(140deg,' + nx.renk + "," + shade(nx.renk, -34) + ')">' +
        '<div class="hero__eyebrow">Sıradaki sınav</div>' +
        '<div class="hero__title">' + nx.emoji + " " + esc(nx.ad) + "</div>" +
        '<div class="hero__meta">' + esc(nx.gun) + " · " + esc(nx.saat) + " (" + (SAAT[nx.saat] || "") + ")" +
        (daysBetween(now, nx.dt) === 0 ? " · <b>BUGÜN</b>" : daysBetween(now, nx.dt) === 1 ? " · <b>YARIN</b>" : "") + "</div>" +
        '<div class="hero__cd" id="heroCd">' + cdBoxlar(fark) + "</div>" +
        '<div class="hero__actions">' +
        '<a class="btn btn--light" href="#/sinav/' + nx.id + '">Hemen hazırlan →</a>' +
        (nx.pdfler && nx.pdfler[0] ? '<a class="btn btn--ghost" href="pdf/' + nx.pdfler[0].dosya + '" target="_blank" rel="noopener">📄 PDF</a>' : "") +
        "</div></section>";
    } else {
      h += '<section class="hero" style="background:linear-gradient(140deg,#059669,#047857)">' +
        '<div class="hero__eyebrow">Kamp tamamlandı</div>' +
        '<div class="hero__title">Tebrikler! 🎉</div>' +
        '<div class="hero__meta">1. dönem 1. yazılıların hepsi bitti. Yanlış defterini sakla, ikinci yazılılarda işine yarayacak.</div>' +
        "</section>";
    }

    /* durum çubuğu */
    h += '<div class="grid3" style="margin-top:12px">' +
      '<div class="stat"><b>' + (toplamSinav - gecen) + "</b><span>Kalan sınav</span></div>" +
      '<div class="stat"><b>' + tamam + "/" + toplamMadde + "</b><span>Çalışma</span></div>" +
      '<div class="stat"><b>' + (S.bildirimOn ? S.aralik + " dk" : "Kapalı") + "</b><span>Bildirim</span></div>" +
      "</div>";

    if (!S.bildirimOn) {
      h += '<div class="banner banner--warn" style="margin-top:12px"><b>Bildirimler kapalı.</b> ' +
        'Her ' + S.aralik + ' dakikada “Yarın … sınavın var” hatırlatması için ' +
        '<button class="linklike" id="hBildirim">bildirimi aç</button>.</div>';
    }

    /* bugünün planı */
    var bugun = (K.plan || []).filter(function (p) { return p.tarih === dayKey(now); })[0];
    if (!bugun) bugun = (K.plan || []).filter(function (p) { return p.tarih >= dayKey(now); })[0];
    if (bugun) {
      var dk = bugun.tarih + "|" + bugun.baslik;
      h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">' +
        (bugun.tarih === dayKey(now) ? "Bugünün planı" : "Sıradaki gün: " + esc(bugun.gun)) +
        '</h2><a class="sect__link" href="#/kamp">Tüm plan</a></div>' +
        '<div class="card"><div class="row row--between" style="margin-bottom:8px">' +
        '<div class="grow"><div style="font-weight:800;font-size:14px">' + esc(bugun.baslik) + "</div>" +
        '<div class="tiny muted">' + esc(bugun.gun) + " · " + esc(bugun.sure) + "</div></div>" +
        '<span class="pill">' + maddeDurum(dk, bugun.maddeler.length) + "</span></div>";
      bugun.maddeler.forEach(function (m, i) {
        h += checkRow(dk + "|" + i, m);
      });
      h += "</div></section>";
    }

    /* sınav takvimi önizleme */
    var up = upcoming(now).slice(0, 4);
    if (up.length) {
      h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Yaklaşan sınavlar</h2>' +
        '<a class="sect__link" href="#/sinavlar">Tümü (' + toplamSinav + ")</a></div>";
      up.forEach(function (e) { h += examRow(e, now); });
      h += "</section>";
    }

    /* hızlı erişim */
    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Hızlı erişim</h2></div>' +
      '<div class="grid2">' +
      quickCard("⚡", "Son 30 dk kartları", "Sınav öncesi tekrar", "pdf/11-son-30-dakika-tekrar-kartlari.pdf") +
      quickCard("🎯", "40 soruluk deneme", "Genel tekrar testi", "pdf/10-genel-tekrar-40-soru.pdf") +
      quickCard("🧮", "Matematik çözümlü", "3 örnek sınav", "pdf/03-matematik-cozumlu-ornek-sinavlar.pdf") +
      quickCard("🗓️", "Kamp programı", "Gün gün plan PDF", "pdf/00-kamp-programi-ve-calisma-plani.pdf") +
      "</div></section>";

    h += '<section class="sect"><div class="card" style="background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:0">' +
      '<div class="tiny" style="font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#6366f1">Günün sözü</div>' +
      '<div class="quote" style="margin-top:6px">“' + esc(gununSozu()) + '”</div></div></section>';

    view.innerHTML = h;
    renderTopbar();

    if ($("#hBildirim")) $("#hBildirim").onclick = bildirimAc;
    bindChecks();
    bindPdfLinks();

    if (nx) {
      liveTimer = setInterval(function () {
        var el = $("#heroCd");
        if (!el) return;
        el.innerHTML = cdBoxlar(nx.ts - Date.now());
        var m = $("#heroMeta");
        void m;
      }, 1000);
    }
  }

  function cdBoxlar(ms) {
    if (ms < 0) ms = 0;
    var d = Math.floor(ms / 86400000);
    var h = Math.floor((ms % 86400000) / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    function box(v, l) { return '<div class="cdbox"><b>' + pad(v) + "</b><span>" + l + "</span></div>"; }
    return box(d, "gün") + box(h, "saat") + box(m, "dakika") + box(s, "saniye");
  }

  function maddeDurum(key, n) {
    var t = 0;
    for (var i = 0; i < n; i++) if (S.checks[key + "|" + i]) t++;
    return t + "/" + n + " tamam";
  }

  function checkRow(id, metin) {
    return '<div class="check' + (S.checks[id] ? " done" : "") + '" data-check="' + esc(id) + '">' +
      '<div class="check__box">✓</div><div class="check__t">' + bold(metin) + "</div></div>";
  }

  function bindChecks() {
    $$("[data-check]").forEach(function (el) {
      el.onclick = function () {
        var id = el.getAttribute("data-check");
        S.checks[id] = !S.checks[id];
        save();
        el.classList.toggle("done", !!S.checks[id]);
      };
    });
  }

  function quickCard(emoji, t, s, href) {
    return '<a class="card" style="display:flex;align-items:center;gap:10px;padding:13px" href="' + href + '" target="_blank" rel="noopener">' +
      '<div style="font-size:22px">' + emoji + "</div><div><div style=\"font-weight:780;font-size:13px\">" + esc(t) + "</div>" +
      '<div class="tiny muted">' + esc(s) + "</div></div></a>";
  }

  function examRow(e, now) {
    now = now || new Date();
    var fark = e.ts - now.getTime();
    var bugun = daysBetween(now, e.dt) === 0;
    var gecti = fark < -40 * 60000;
    return '<div class="exam' + (bugun ? " exam--today" : "") + (gecti ? " exam--past" : "") + '" data-exam="' + e.id + '">' +
      '<div class="exam__ico" style="background:' + hexAlpha(e.renk, .12) + '">' + e.emoji + "</div>" +
      '<div class="grow"><div class="exam__name">' + esc(e.ad) + "</div>" +
      '<div class="exam__meta">' + esc(fmtKisa(e.dt)) + " · " + esc(e.saat) + " (" + (SAAT[e.saat] || "") + ")" +
      (bugun ? ' · <span style="color:#b45309;font-weight:700">bugün</span>' : "") + " · " + e.kazanimlar.length + " kazanım</div></div>" +
      '<div class="exam__cd"><b style="color:' + e.renk + '">' + (gecti ? "✓" : fark < 0 ? "şimdi" : kisaKalan(fark)) + "</b>" +
      '<span>' + (gecti ? "bitti" : "kaldı") + "</span></div></div>";
  }

  function kisaKalan(ms) {
    var d = Math.floor(ms / 86400000);
    if (d >= 1) return d + " gün";
    var h = Math.floor(ms / 3600000);
    if (h >= 1) return h + " sa";
    return Math.max(1, Math.floor(ms / 60000)) + " dk";
  }
  function hexAlpha(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function bindExamRows() {
    $$("[data-exam]").forEach(function (el) {
      el.onclick = function () { location.hash = "#/sinav/" + el.getAttribute("data-exam"); };
    });
  }

  /* ---------------- SINAVLAR ---------------- */
  function renderSinavlar() {
    var now = new Date();
    var up = upcoming(now);
    var old = pastExams(now).reverse();
    var h = '<div class="sect__head"><h2 class="sect__title">Sınav takvimim</h2>' +
      '<span class="pill">' + EXAMS.length + " sınav</span></div>" +
      '<div class="card" style="padding:13px"><div class="tiny muted">' + esc(K.okul || "") + "</div>" +
      '<div style="font-weight:750;font-size:13px;margin-top:3px">' + esc(K.donem || "") + "</div></div>";

    var groups = {};
    var order = [];
    up.forEach(function (e) {
      var k = e.tarih;
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(e);
    });
    order.forEach(function (k) {
      var d = groups[k][0].dt;
      h += '<div class="daygroup"><div class="daygroup__head">' + esc(fmtTarih(d)) + "</div>";
      groups[k].forEach(function (e) { h += examRow(e, now); });
      h += "</div>";
    });

    if (old.length) {
      h += '<div class="daygroup"><div class="daygroup__head">Geçmiş sınavlar</div>';
      old.forEach(function (e) { h += examRow(e, now); });
      h += "</div>";
    }
    view.innerHTML = h;
    renderTopbar();
    bindExamRows();
    bindPdfLinks();
  }

  /* ---------------- SINAV DETAY ---------------- */
  function renderSinav(id) {
    var e = examById(id);
    if (!e) { view.innerHTML = '<div class="empty">Sınav bulunamadı.</div>'; return; }
    var now = new Date();
    var fark = e.ts - now.getTime();
    var sonuc = S.sonuclar[id];

    var h = '<section class="detail__hero" style="background:linear-gradient(140deg,' + e.renk + "," + shade(e.renk, -34) + ')">' +
      '<div class="row row--between"><div class="emoji">' + e.emoji + "</div>" +
      '<span class="pill" style="background:rgba(255,255,255,.2);color:#fff">' + (fark < -40 * 60000 ? "Tamamlandı" : kisaKalan(fark) + " kaldı") + "</span></div>" +
      '<h1 style="margin-top:8px">' + esc(e.ad) + "</h1>" +
      '<div class="small" style="opacity:.92;margin-top:4px">' + esc(e.gun) + " · " + esc(e.saat) + " (" + (SAAT[e.saat] || "") + ")</div>" +
      "</section>" +
      '<div class="banner" style="margin-top:12px">' + bold(e.sinavNotu) + "</div>";

    h += '<div class="grid2" style="margin-top:12px">' +
      '<a class="btn btn--primary btn--block" href="#/test/' + e.id + '">🎯 Mini test (' + e.quiz.length + " soru)</a>" +
      '<a class="btn btn--line btn--block" href="#/kamp">⏱️ Odak çalış</a></div>';

    if (sonuc) {
      h += '<div class="card" style="margin-top:12px"><div class="row row--between">' +
        '<div><div style="font-weight:800">Son test sonucun</div>' +
        '<div class="tiny muted">' + esc(sonuc.tarih) + "</div></div>" +
        '<span class="pill ' + (sonuc.dogru / sonuc.toplam >= .7 ? "pill--ok" : "pill--warn") + '">' +
        sonuc.dogru + "/" + sonuc.toplam + " doğru</span></div></div>";
    }

    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Ne sorulacak? (kazanımlar)</h2></div>';
    e.kazanimlar.forEach(function (k) {
      h += '<div class="acc"><button class="acc__head"><span class="note-ic">📌</span>' +
        "<span>" + esc(k.kod) + "</span><span class='chev'>▾</span></button>" +
        '<div class="acc__body"><ul><li>' + bold(k.metin) + "</li></ul></div></div>";
    });
    h += "</section>";

    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Konu özeti</h2>' +
      '<span class="tiny muted">dokun, açılsın</span></div>';
    e.notlar.forEach(function (n, i) {
      h += '<div class="acc' + (i === 0 ? " open" : "") + '"><button class="acc__head"><span class="note-ic">📖</span>' +
        "<span>" + esc(n.b) + "</span><span class='chev'>▾</span></button><div class='acc__body'><ul>";
      n.m.forEach(function (m) { h += "<li>" + bold(m) + "</li>"; });
      h += "</ul></div></div>";
    });
    h += "</section>";

    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Püf noktaları</h2></div><div class="card">';
    e.ipuclari.forEach(function (x) {
      h += '<div class="row" style="align-items:flex-start;margin-bottom:8px"><span style="color:#059669">✔</span>' +
        '<div class="small grow">' + bold(x) + "</div></div>";
    });
    h += "</div></section>";

    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Hazırlık PDF\'leri</h2>' +
      '<a class="sect__link" href="#/pdf">Tümü</a></div>';
    (e.pdfler || []).forEach(function (p) { h += pdfRow(p); });
    h += '<div style="margin-top:9px">' + pdfRow(K.mebOrnek) + "</div></section>";

    view.innerHTML = h;
    renderTopbar();
    bindAcc();
    bindPdfLinks();
  }

  function bindAcc() {
    $$(".acc__head").forEach(function (b) {
      b.onclick = function () { b.parentNode.classList.toggle("open"); };
    });
  }

  function pdfRow(p) {
    if (!p) return "";
    return '<a class="pdf" href="pdf/' + p.dosya + '" target="_blank" rel="noopener">' +
      '<div class="pdf__ico">' + (p.emoji || "📄") + "</div>" +
      '<div class="grow"><div class="pdf__t">' + esc(p.ad) + "</div>" +
      '<div class="pdf__s">' + esc(p.aciklama || "PDF · dokunarak aç") + "</div></div>" +
      '<span class="pill">Aç</span></a>';
  }

  /* ---------------- MİNİ TEST ---------------- */
  var quizState = null;

  function renderTest(id) {
    var e = examById(id);
    if (!e) { view.innerHTML = '<div class="empty">Test bulunamadı.</div>'; return; }
    quizState = { e: e, i: 0, dogru: 0, cevaplar: [], secildi: false };
    drawQuiz();
  }

  function drawQuiz() {
    var q = quizState, e = q.e, n = e.quiz.length;
    if (q.i >= n) return quizSonuc();
    var soru = e.quiz[q.i];
    var yuzde = Math.round((q.i / n) * 100);
    var h = '<div class="row row--between" style="margin-bottom:10px">' +
      '<a class="btn btn--line btn--sm" href="#/sinav/' + e.id + '">← ' + esc(e.kisa) + "</a>" +
      '<span class="pill">Soru ' + (q.i + 1) + " / " + n + "</span></div>" +
      '<div class="quiz__bar"><i style="width:' + yuzde + '%"></i></div>' +
      '<div class="card" style="margin-top:14px;padding:18px">' +
      '<div class="tiny" style="font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:' + e.renk + '">' + esc(e.ad) + "</div>" +
      '<div style="font-size:17px;font-weight:780;margin-top:8px;letter-spacing:-.2px">' + bold(soru.s) + "</div>" +
      '<div id="opts" style="margin-top:12px">';
    soru.o.forEach(function (o, j) {
      h += '<button class="qopt" data-opt="' + j + '"><span class="qopt__k">' + "ABCD"[j] + "</span><span>" + bold(o) + "</span></button>";
    });
    h += '</div><div id="fb"></div></div>';
    h += '<div class="row" style="margin-top:14px;gap:10px">' +
      '<button class="btn btn--line grow" id="skipBtn">Geç</button>' +
      '<button class="btn btn--primary grow" id="nextBtn" disabled>Sonraki →</button></div>';

    view.innerHTML = h;
    renderTopbar();

    $$("#opts .qopt").forEach(function (b) {
      b.onclick = function () { cevapla(parseInt(b.getAttribute("data-opt"), 10), soru); };
    });
    $("#skipBtn").onclick = function () { q.i++; q.secildi = false; drawQuiz(); };
    $("#nextBtn").onclick = function () { q.i++; q.secildi = false; drawQuiz(); };
  }

  function cevapla(sec, soru) {
    var q = quizState;
    if (q.secildi) return;
    q.secildi = true;
    var dogru = sec === soru.d;
    if (dogru) q.dogru++;
    q.cevaplar.push({ s: soru.s, sec: sec, d: soru.d, dogru: dogru });
    $$("#opts .qopt").forEach(function (b) {
      var j = parseInt(b.getAttribute("data-opt"), 10);
      b.disabled = true;
      if (j === soru.d) b.classList.add("correct");
      else if (j === sec) b.classList.add("wrong");
    });
    $("#fb").innerHTML = '<div class="explain"><b>' + (dogru ? "✅ Doğru!" : "❌ Doğru cevap: " + "ABCD"[soru.d]) +
      "</b><div style='margin-top:5px'>" + bold(soru.a) + "</div></div>";
    $("#nextBtn").disabled = false;
    $("#nextBtn").textContent = (q.i + 1 >= q.e.quiz.length) ? "Sonucu gör →" : "Sonraki →";
  }

  function quizSonuc() {
    var q = quizState, e = q.e, n = e.quiz.length;
    var puan = Math.round((q.dogru / n) * 100);
    S.sonuclar[e.id] = { dogru: q.dogru, toplam: n, tarih: fmtTarih(new Date()), puan: puan };
    var gun = dayKey();
    S.gunluk[gun] = S.gunluk[gun] || { soru: 0, dogru: 0 };
    S.gunluk[gun].soru += n;
    S.gunluk[gun].dogru += q.dogru;
    save();

    var yanlislar = q.cevaplar.filter(function (c) { return !c.dogru; });
    var h = '<div class="card" style="text-align:center;padding:24px">' +
      '<div class="tiny muted" style="text-transform:uppercase;letter-spacing:1px;font-weight:800">' + esc(e.ad) + " · mini test</div>" +
      '<div class="scorebig" style="margin-top:8px;color:' + (puan >= 70 ? "#059669" : puan >= 40 ? "#d97706" : "#dc2626") + '">' + puan + "</div>" +
      '<div class="small muted">100 üzerinden · ' + q.dogru + "/" + n + " doğru</div>" +
      '<div style="margin-top:14px" class="progress"><i style="width:' + puan + '%"></i></div>' +
      '<div style="margin-top:14px">' + (puan >= 70 ? "Harika! Bu ders tamam sayılır, sadece yanlışlarını tekrar et. 💪" :
        puan >= 40 ? "Fena değil. Yanlış yaptığın konuları özetten bir kez daha oku." :
          "Konu özetini tekrar okuyup testi yeniden çöz. Merak etme, tekrar her şeyi çözer.") + "</div>" +
      "</div>";

    if (yanlislar.length) {
      h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Yanlışların (' + yanlislar.length + ")</h2></div>";
      yanlislar.forEach(function (c) {
        h += '<div class="card" style="margin-top:9px;padding:13px"><div class="small" style="font-weight:700">' + bold(c.s) + "</div>" +
          '<div class="tiny" style="margin-top:6px;color:#dc2626">Senin cevabın: ' + "ABCD"[c.sec] + "</div>" +
          '<div class="tiny" style="color:#059669">Doğru cevap: ' + "ABCD"[c.d] + "</div></div>";
      });
      h += "</section>";
    }

    h += '<div class="grid2" style="margin-top:14px">' +
      '<button class="btn btn--primary btn--block" id="tekrar">🔁 Yeniden çöz</button>' +
      '<a class="btn btn--line btn--block" href="#/sinav/' + e.id + '">Konu özeti</a></div>' +
      '<div style="height:8px"></div>' +
      '<a class="btn btn--soft btn--block" href="#/sinavlar">Sınav takvimine dön</a>';

    view.innerHTML = h;
    renderTopbar();
    $("#tekrar").onclick = function () { renderTest(e.id); };
  }

  /* ---------------- KAMP ---------------- */
  var timer = { sure: 25 * 60, kalan: 25 * 60, calisiyor: false, id: null, mod: 25 };

  function renderKamp() {
    var now = new Date();
    var toplam = 0, tamam = 0;
    (K.plan || []).forEach(function (p) {
      p.maddeler.forEach(function (_, i) {
        toplam++;
        if (S.checks[p.tarih + "|" + p.baslik + "|" + i]) tamam++;
      });
    });
    var yuzde = toplam ? Math.round((tamam / toplam) * 100) : 0;

    var h = '<div class="sect__head"><h2 class="sect__title">Sınav kampı</h2>' +
      '<span class="pill pill--ok">%' + yuzde + " tamam</span></div>" +
      '<div class="card"><div class="row row--between" style="margin-bottom:8px">' +
      '<div><div style="font-weight:800">' + tamam + " / " + toplam + ' çalışma maddesi</div>' +
      '<div class="tiny muted">' + esc(K.okul || "") + "</div></div>" +
      '<span class="pill">' + upcoming(now).length + " sınav kaldı</span></div>" +
      '<div class="progress"><i style="width:' + yuzde + '%"></i></div></div>';

    /* odak sayacı */
    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Odak sayacı (Pomodoro)</h2></div>' +
      '<div class="card"><div class="timer"><div class="timer__v" id="timerV">' + dk(timer.kalan) + "</div>" +
      '<div class="timer__l" id="timerL">' + (timer.calisiyor ? "çalışıyor" : "hazır") + "</div></div>" +
      '<div class="chips">' +
      '<button class="chip' + (timer.mod === 25 ? " on" : "") + '" data-mod="25">25 dk çalış</button>' +
      '<button class="chip' + (timer.mod === 5 ? " on" : "") + '" data-mod="5">5 dk mola</button>' +
      '<button class="chip' + (timer.mod === 45 ? " on" : "") + '" data-mod="45">45 dk derin</button>' +
      "</div>" +
      '<div class="grid2" style="margin-top:14px">' +
      '<button class="btn btn--primary" id="timerBtn">' + (timer.calisiyor ? "⏸ Duraklat" : "▶ Başlat") + "</button>" +
      '<button class="btn btn--line" id="timerReset">↺ Sıfırla</button>' +
      "</div></div></section>";

    h += '<section class="sect"><div class="sect__head"><h2 class="sect__title">Gün gün çalışma planı</h2></div>';
    (K.plan || []).forEach(function (p) {
      var dk2 = p.tarih + "|" + p.baslik;
      var bugun = p.tarih === dayKey(now);
      h += '<div class="acc' + (bugun ? " open" : "") + '"><button class="acc__head">' +
        '<span class="note-ic">' + (bugun ? "🔥" : "📅") + "</span><span>" + esc(p.gun) + "</span>" +
        '<span class="pill ' + (bugun ? "" : "pill--mute") + '" style="margin-left:auto">' + maddeDurum(dk2, p.maddeler.length) + "</span>" +
        "<span class='chev'>▾</span></button><div class='acc__body'>" +
        '<div class="tiny muted" style="margin-bottom:8px">' + esc(p.baslik) + " · " + esc(p.sure) + "</div>";
      p.maddeler.forEach(function (m, i) { h += checkRow(dk2 + "|" + i, m); });
      h += "</div></div>";
    });
    h += "</section>";

    view.innerHTML = h;
    renderTopbar();
    bindAcc();
    bindChecks();
    bindPdfLinks();
    $$(".chip[data-mod]").forEach(function (c) {
      c.onclick = function () {
        var mod = parseInt(c.getAttribute("data-mod"), 10);
        timerAyarla(mod);
        $$(".chip[data-mod]").forEach(function (x) { x.classList.remove("on"); });
        c.classList.add("on");
      };
    });
    $("#timerBtn").onclick = timerToggle;
    $("#timerReset").onclick = function () { timerDurdur(); timerAyarla(timer.mod); };
    if (timer.calisiyor) timerYaz();
  }

  function dk(sec) { return pad(Math.floor(sec / 60)) + ":" + pad(sec % 60); }

  function timerAyarla(mod) {
    timerDurdur();
    timer.mod = mod;
    timer.sure = mod * 60;
    timer.kalan = timer.sure;
    timerYaz();
  }
  function timerYaz() {
    var v = $("#timerV"), l = $("#timerL"), b = $("#timerBtn");
    if (v) v.textContent = dk(timer.kalan);
    if (l) l.textContent = timer.calisiyor ? "çalışıyor…" : "hazır";
    if (b) b.textContent = timer.calisiyor ? "⏸ Duraklat" : "▶ Başlat";
  }
  function timerToggle() {
    if (timer.calisiyor) { timerDurdur(); timerYaz(); return; }
    timer.calisiyor = true;
    timer.id = setInterval(function () {
      timer.kalan--;
      if (timer.kalan <= 0) {
        timerDurdur();
        timer.kalan = 0;
        timerYaz();
        bip();
        showNotification(timer.mod === 5 ? "Mola bitti ☕" : "Süre doldu ⏱️",
          timer.mod === 5 ? "Hadi 25 dakika daha çalışalım!" : "Harika! Şimdi 5 dakika mola ver.");
        return;
      }
      timerYaz();
    }, 1000);
    timerYaz();
  }
  function timerDurdur() { clearInterval(timer.id); timer.calisiyor = false; }

  function bip() {
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      var c = new C();
      [0, .18, .36].forEach(function (t) {
        var o = c.createOscillator(), g = c.createGain();
        o.frequency.value = 880; o.type = "sine";
        o.connect(g); g.connect(c.destination);
        g.gain.setValueAtTime(.0001, c.currentTime + t);
        g.gain.exponentialRampToValueAtTime(.18, c.currentTime + t + .01);
        g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + t + .16);
        o.start(c.currentTime + t); o.stop(c.currentTime + t + .18);
      });
      if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
    } catch (e) {}
  }

  /* ---------------- PDF ---------------- */
  function renderPdf() {
    var h = '<div class="sect__head"><h2 class="sect__title">Hazırlık PDF\'leri</h2>' +
      '<span class="pill">' + ((K.pdfler || []).length + 1) + " dosya</span></div>" +
      '<div class="banner" style="margin-bottom:12px">Tüm PDF\'ler bu uygulama için özel hazırlandı: ' +
      "özet + mini test + cevap anahtarı. PDF'ler çevrimdışı da açılır.</div>";
    (K.pdfler || []).forEach(function (p) { h += pdfRow(p); });
    h += '<div class="daygroup"><div class="daygroup__head">Resmî belge</div>' + pdfRow(K.mebOrnek) + "</div>";
    h += '<div class="tiny muted" style="margin-top:16px;text-align:center">PDF\'i açıp sağ üstten indirebilir veya yazdırabilirsin.</div>';
    view.innerHTML = h;
    renderTopbar();
    bindPdfLinks();
  }

  /* ---------------- DAHA / AYARLAR ---------------- */
  function renderDaha() {
    var izin = notifDurumu();
    var sonucKeys = Object.keys(S.sonuclar);
    var h = '<div class="sect__head"><h2 class="sect__title">Ayarlar</h2></div>';

    h += '<div class="card"><label class="field"><span>Adın (isteğe bağlı)</span>' +
      '<input id="adInput" type="text" placeholder="örn. Yusuf" maxlength="20" value="' + esc(S.ad) + '"></label>' +
      '<div class="tiny muted" style="margin-top:6px">Ana ekranda selamlamada kullanılır.</div></div>';

    h += '<div class="card" style="margin-top:12px">' +
      '<div class="row row--between"><div><div style="font-weight:800">🔔 Sınav hatırlatıcısı</div>' +
      '<div class="tiny muted">Her ' + S.aralik + ' dakikada geri sayım bildirimi</div></div>' +
      '<button class="toggle' + (S.bildirimOn ? " on" : "") + '" id="tgBildirim" aria-label="Bildirim"></button></div>' +
      '<hr class="hr">' +
      '<div class="tiny muted">Durum: <b>' + (isNative ? "APK (arka planda da çalışır)" : izin === "granted" ? "Tarayıcı izni verildi" : izin === "denied" ? "İzin reddedildi (uygulama içi uyarı)" : "İzin bekliyor") + "</b></div>" +
      '<label class="field"><span>Hatırlatma sıklığı</span><select id="aralikSel">' +
      [5, 10, 15, 20, 30, 60].map(function (v) {
        return '<option value="' + v + '"' + (Number(S.aralik) === v ? " selected" : "") + ">Her " + v + " dakikada bir</option>";
      }).join("") + "</select></label>" +
      '<div class="grid2" style="margin-top:12px">' +
      '<button class="btn btn--soft" id="testBildirim">🔔 Test bildirimi</button>' +
      '<button class="btn btn--line" id="ornekBildirim">👀 Mesajı gör</button></div>' +
      '<div class="tiny muted" style="margin-top:10px">Not: Tarayıcıda bildirimler uygulama açıkken çalışır. ' +
      "APK sürümünde uygulama kapalıyken bile her " + S.aralik + " dakikada bildirim gelir.</div></div>";

    h += '<div class="card" style="margin-top:12px"><div style="font-weight:800;margin-bottom:8px">📊 Sonuçlarım</div>';
    if (!sonucKeys.length) {
      h += '<div class="tiny muted">Henüz test çözmedin. Bir ders seçip mini testi çöz, sonuçların burada birikecek.</div>';
    } else {
      sonucKeys.forEach(function (k) {
        var e = examById(k); var r = S.sonuclar[k];
        h += '<div class="row row--between" style="padding:7px 0;border-bottom:1px dashed var(--line)">' +
          '<div class="row" style="gap:8px"><span>' + (e ? e.emoji : "📝") + "</span>" +
          '<div><div class="small" style="font-weight:700">' + esc(e ? e.ad : k) + "</div>" +
          '<div class="tiny muted">' + esc(r.tarih) + "</div></div></div>" +
          '<span class="pill ' + ((r.dogru / r.toplam) >= .7 ? "pill--ok" : "pill--warn") + '">' + r.dogru + "/" + r.toplam + "</span></div>";
      });
    }
    h += "</div>";

    h += '<div class="card" style="margin-top:12px"><div style="font-weight:800;margin-bottom:8px">📥 APK / uygulama</div>' +
      '<div class="tiny muted">Bu uygulama PWA olarak telefona eklenebilir. APK sürümü GitHub Releases sayfasında yayınlanır.</div>' +
      '<div class="grid2" style="margin-top:10px">' +
      '<button class="btn btn--primary" id="kurBtn">📲 Ana ekrana ekle</button>' +
      '<a class="btn btn--line" href="https://github.com/hamudenes9-debug/Sinavhazirlik/releases" target="_blank" rel="noopener">APK indir</a></div>' +
      '<div class="tiny muted" style="margin-top:10px">Android\'de Chrome menüsü → “Uygulamayı yükle / Ana ekrana ekle”. iPhone\'de Safari → Paylaş → “Ana Ekrana Ekle”.</div></div>';

    h += '<div class="card" style="margin-top:12px"><div style="font-weight:800;margin-bottom:8px">ℹ️ Bilgi</div>' +
      '<div class="tiny muted">' + esc(K.okul || "") + "<br>" + esc(K.donem || "") + "<br>" +
      "Sınav takvimi resmî okul takviminden (PDF) alınmıştır. Güncelleme: " + esc(K.guncelleme || "-") + "</div>" +
      '<div class="row" style="margin-top:10px;gap:8px"><a class="btn btn--line btn--sm grow" href="pdf/00-kamp-programi-ve-calisma-plani.pdf" target="_blank" rel="noopener">Kamp PDF</a>' +
      '<button class="btn btn--danger btn--sm grow" id="resetBtn">Verileri sıfırla</button></div></div>';

    view.innerHTML = h;
    renderTopbar();

    $("#adInput").oninput = function () { S.ad = this.value.trim(); save(); renderTopbar(); };
    $("#tgBildirim").onclick = function () { S.bildirimOn ? bildirimKapat() : bildirimAc(); };
    $("#aralikSel").onchange = function () {
      S.aralik = parseInt(this.value, 10) || 10; save();
      bildirimDongusuBaslat(); nativeZamanla();
      toast("Hatırlatma: her " + S.aralik + " dakikada bir"); render();
    };
    $("#testBildirim").onclick = function () {
      if (!S.bildirimOn) { bildirimAc(); return; }
      donguBildirim();
    };
    $("#ornekBildirim").onclick = function () {
      var m = mesajlar()[0];
      alert("Gönderilecek mesaj:\n\n" + m.title + "\n\n" + m.body);
    };
    $("#kurBtn").onclick = function () {
      if (window.__deferredPrompt) {
        window.__deferredPrompt.prompt();
      } else {
        alert("Tarayıcı menüsünden 'Ana ekrana ekle' seçeneğini kullan.");
      }
    };
    $("#resetBtn").onclick = function () {
      if (confirm("Tüm çalışma işaretleri ve test sonuçları silinecek. Emin misin?")) {
        S = Object.assign({}, defaults);
        save(); toast("Veriler sıfırlandı"); render();
      }
    };
  }

  /* ---------------- PDF açma (native) ---------------- */
  function nativePdfAc(dosya) {
    var P = (Cap && Cap.Plugins) || {};
    var Fs = P.Filesystem, Sh = P.Share;
    var ad = dosya.split("/").pop();
    toast("PDF hazırlanıyor…");
    return fetch(dosya).then(function (r) { return r.arrayBuffer(); }).then(function (buf) {
      var bytes = new Uint8Array(buf), bin = "";
      for (var i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      }
      var b64 = btoa(bin);
      if (!Fs) { window.open(dosya, "_blank"); return; }
      return Fs.writeFile({ path: ad, data: b64, directory: "CACHE", recursive: true }).then(function (res) {
        if (Sh) {
          return Sh.share({ title: ad, files: [res.uri], dialogTitle: "PDF'i aç / paylaş" });
        }
        toast("PDF kaydedildi: " + ad);
      });
    }).catch(function (e) {
      try { window.open(dosya, "_blank"); } catch (x) {}
      toast("PDF açılamadı, web sürümünü kullan.");
    });
  }

  function bindPdfLinks() {
    if (!isNative) return;
    $$("a.pdf").forEach(function (a) {
      a.onclick = function (ev) {
        ev.preventDefault();
        var href = a.getAttribute("href") || "";
        nativePdfAc(href);
      };
    });
  }

  /* ---------------- render ---------------- */
  function render() { route(); }

  /* ---------------- boot ---------------- */
  function boot() {
    if (isNative) document.body.classList.add("native");
    route();
    bildirimDongusuBaslat();
    nativeZamanla();

    /* PWA */
    if (!isNative && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").then(function () {
          navigator.serviceWorker.ready.then(function () {});
        }).catch(function () {});
      });
    }
    window.addEventListener("beforeinstallprompt", function (ev) {
      ev.preventDefault();
      window.__deferredPrompt = ev;
    });

    /* uygulama öne geldiğinde saat/bildirim tazele */
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        if (S.bildirimOn) {
          var son = Number(S.uyari) || 0;
          if (Date.now() - son > Math.max(1, Number(S.aralik) || 10) * 60000) donguBildirim();
        }
        route();
      }
    });

    /* scroll-to-top */
    var st = $("#scrolltop");
    if (st) {
      st.onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
      window.addEventListener("scroll", function () {
        st.classList.toggle("show", window.scrollY > 500);
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
