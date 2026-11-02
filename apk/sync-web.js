/* Web dosyalarını (repo kökü) apk/www içine kopyalar. */
const fs = require("fs");
const path = require("path");

const KOK = path.resolve(__dirname, "..");
const HEDEF = path.resolve(__dirname, "www");

const KOPYALA = [
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  "css",
  "js",
  "icons",
  "pdf",
];

function rm(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function cp(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const ad of fs.readdirSync(src)) cp(path.join(src, ad), path.join(dst, ad));
  } else {
    fs.copyFileSync(src, dst);
  }
}

rm(HEDEF);
fs.mkdirSync(HEDEF, { recursive: true });
let sayi = 0;
for (const ad of KOPYALA) {
  const src = path.join(KOK, ad);
  if (!fs.existsSync(src)) {
    console.warn("atlandı (yok):", ad);
    continue;
  }
  cp(src, path.join(HEDEF, ad));
  sayi++;
}
console.log("www hazır:", sayi, "öğe kopyalandı ->", HEDEF);
