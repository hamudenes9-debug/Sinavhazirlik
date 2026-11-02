# 🎯 Sınav Kampı · 6. Sınıf 1. Dönem 1. Yazılı

Şehit Abdullah Tayyip Olçok İmam Hatip Ortaokulu **2026-2027 1. dönem 1. ortak sınav takvimine** göre hazırlanmış,
tek başına çalışan sınav hazırlık uygulaması (web + Android APK).

- **Sınav takvimi:** 2-13 Kasım 2026 arasındaki 12 sınavın tamamı (6. sınıf kolonundan alındı)
- **Geri sayım:** sıradaki sınava gün / saat / dakika / saniye
- **Bildirim:** her 10 dakikada "Yarın … sınavın var" hatırlatması (süre ayarlanabilir)
- **12 ders için konu özeti, kazanım listesi, püf noktaları ve mini test**
- **12 hazırlık PDF'i** (özet + test + cevap anahtarı) + MEB'in resmî matematik örnek sınavı
- **Odak sayacı** (Pomodoro), gün gün çalışma planı, ilerleme takibi, sonuç kaydı

## Telefona kur

### 1) APK (Android)
- Sürümler: **Releases** sayfası → `SinavKampi-6sinif-1donem-1yazili.apk`
- Her push'ta derlenen güncel APK: **Actions → APK Derle → Artifacts → sinav-kampi-apk**

### 2) Web uygulaması (PWA)
- GitHub Pages adresi: `https://hamudenes9-debug.github.io/Sinavhazirlik/`
- Android Chrome: menü → **Uygulamayı yükle / Ana ekrana ekle**
- iPhone Safari: Paylaş → **Ana Ekrana Ekle**

## Klasör yapısı

```
index.html            uygulama girişi (hash router, tek sayfa)
css/style.css         mobil öncelikli tema
js/app.js             tüm uygulama mantığı (router, bildirim, test, sayaç)
js/data.js            içerik verisi (otomatik üretilir)
pdf/                  hazırlık PDF'leri
icons/                PWA ikonları
tools/                PDF + data.js üretici (Python)
apk/                  Capacitor Android kabuğu (notification desteği)
.github/workflows/    APK derleme + Pages yayınlama
```

## Geliştirme

### PDF'leri ve içeriği yeniden üret
```bash
python3 -m venv .venv && ./.venv/bin/pip install reportlab pymupdf pillow
cd tools && ../.venv/bin/python uret_pdf.py       # pdf/*.pdf + js/data.js
```
Ders içerikleri: `tools/dersler_a.py`, `tools/dersler_b.py` · sınav takvimi & plan: `tools/icerik.py`

### APK derle
```bash
cd apk
npm ci
npm run sync          # web dosyalarını apk/www'ye kopyalar + cap sync
cd android && ./gradlew assembleDebug
# çıktı: apk/android/app/build/outputs/apk/debug/app-debug.apk
```

## Bildirimler nasıl çalışır?

| Ortam | Davranış |
|---|---|
| **APK** | `@capacitor/local-notifications` ile **uygulama kapalıyken bile** çalışır. Önümüzdeki 24 saat için her 10 dakikada bir geri sayım + her sınavdan önceki akşam 20:00 ve sınav sabahı 07:30 hatırlatması zamanlanır. |
| **Web/PWA** | Tarayıcı bildirimi (izin verilirse) + uygulama açıkken çalışan döngü; izin yoksa uygulama içi uyarı. |

Bildirim metni otomatik olarak sıradaki sınava göre değişir, örnek:
> 🔔 **Yarın Fen Bilimleri sınavın var** — 3 Kasım 2026 Salı · 2. ders. Bugün 45-60 dakika çalış, PDF özetini oku ve 8 soruluk mini testi çöz.

## Sınav takvimi (6. sınıf)

| Tarih | Saat | Ders |
|---|---|---|
| 3 Kasım 2026 Salı | 2. ders | Fen Bilimleri |
| 4 Kasım 2026 Çarşamba | 3. ders | Arapça |
| 4 Kasım 2026 Çarşamba | 5. ders | Seçmeli İngilizce |
| 5 Kasım 2026 Perşembe | 2. ders | Matematik |
| 5 Kasım 2026 Perşembe | 4. ders | Temel Dini Bilgiler |
| 6 Kasım 2026 Cuma | 2. ders | Sosyal Bilgiler |
| 9 Kasım 2026 Pazartesi | 3. ders | Kur'an-ı Kerim |
| 9 Kasım 2026 Pazartesi | 5. ders | Peygamber Efendimizin Hayatı |
| 10 Kasım 2026 Salı | 4. ders | Türkçe |
| 11 Kasım 2026 Çarşamba | 2. ders | Matematik (2. sınav) |
| 12 Kasım 2026 Perşembe | 2. ders | İngilizce |
| 13 Kasım 2026 Cuma | 2. ders | Din Kültürü ve Ahlak Bilgisi |

> Matematik kazanımları (MAT.6.1.1 – MAT.6.1.6) ve örnek sınavlar MEB'in yayımladığı
> "6. Sınıf Matematik 1. Dönem 1. Yazılı Örnek Senaryolar" PDF'inden alınmıştır.
> Sosyal Bilgiler kazanım tablosu (SB.6.1.1 / 6.1.2 / 6.1.3 / 6.2.1) ekteki resmî tablodan alınmıştır.
