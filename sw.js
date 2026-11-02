/* Sınav Kampı · Service Worker */
var CACHE = "kamp-v1-2026-11-02";
var SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/data.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* PDF ve data: önce ağ, sonra önbellek (güncel kalsın) */
  if (url.pathname.endsWith(".pdf") || url.pathname.endsWith("data.js")) {
    e.respondWith(
      fetch(req).then(function (res) {
        var cp = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
        return res;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  /* diğer her şey: önce önbellek */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var cp = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, cp); });
        }
        return res;
      }).catch(function () {
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ("focus" in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow("./index.html");
    })
  );
});

self.addEventListener("message", function (e) {
  var d = e.data || {};
  if (d.type === "notify") {
    self.registration.showNotification(d.title || "Sınav Kampı", {
      body: d.body || "",
      icon: "icons/icon-192.png",
      badge: "icons/icon-192.png",
      vibrate: [120, 60, 120],
      tag: "kamp-" + Date.now()
    });
  }
});
