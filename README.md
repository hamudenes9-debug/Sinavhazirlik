# Sınav Kampı

6. sınıf sınav hazırlık uygulaması. Türkiye saatiyle kişisel sınav takvimi, 12 günlük kamp, görev takibi, 25 dakikalık odak sayacı, 68 soruluk açıklamalı testler, 15 çevrimdışı PDF ve **ödev için okul çıkışı arayan sesli yapay zekâ koçu** içerir.

## Sürüm 1.11.0

- **Kamp Koçu:** günlük çıkış saatine göre arama (Pzt 16:00, diğer günler 15:10 gibi), sesli ödev sorma/kaydetme ve teslimden bir gün önce hatırlatma.
- **Uygulama içi bilgi motoru:** konu özetleri ve soru açıklamalarından anahtarsız yanıt (EBOB, bölünebilme, olasılık, kültür, kıtalar…). Ders dışı sorularda uydurmaz.
- **Çift korumalı ödev kaydı:** soru/sohbet cümlesi model “ödev” dese bile kaydedilmez.
- **Doğal ses paketi:** koçun sabit cümleleri uygulamayla gelen 10 doğal Türkçe kayıtla okunur (cihaz sesi gerekmez); hız 0.7–1.4, ses seçimi ve “Sesi dene”.
- **Çevrimiçi beyin (OpenRouter):** cihazdaki motor yetmediğinde soruyu isteğe bağlı olarak OpenRouter’a gönderir; anahtar depoya yazılmaz, Ayarlar’dan “Panodan yapıştır” ile cihaza kaydedilir. Çevrimiçi beyin kapatılırsa hiçbir veri cihazdan çıkmaz.
- **Sınav takvimi yükle:** Ayarlar’dan PDF seç; koç tarihleri ve dersleri okuyup takvime ekler.
- **154 maddelik bilgi bankası + hesap makinesi + birim/sözlük:** “EBOB nasıl bulunur”, “hücre nedir”, “12 × 8 kaç eder”, “80’in %25’i”, “3 km kaç m”, “apple ne demek” gibi sorular anahtarsız yanıtlanır.
- **Test modu:** “bana soru sor” deyince 68 sorudan birini sorar, cevabını değerlendirir.
- **Sesli arama:** yazma yok; koç seni ararken zil sesi çalar.
- **Akıllı koç:** soruları ödev sanmaz, “Sen kimsin?” gibi sorulara cevap verir, ödevleri niyetine göre kaydeder.
- **Ses seçimi:** Google Türkçe ses motoru, en iyi ses, hız ayarı ve “Sesi dene”.
- Sesli brifing, mikrofonla/yazarak sohbet, “ödevimi yaptım” işaretleme.
- Proje: **sinavkam**
- Google, GitHub ve e-posta/şifre ile giriş.
- Uygulama içinde Firebase bağlantı ayarı yok; proje arka planda hazır.
- OrtakokulSinav.PDF kaynaklı 6. sınıf ortak sınav takvimi.
- İsteğe bağlı bulut ilerleme eşitlemesi.
- Takma adlı, isteğe bağlı kamp sıralaması.
- Android paket adı: `Com.company.sinavhazirlik`.
- Hesap, bulut verisi silme ve yerel JSON yedekleme.

APK’lar `keystore/sinav-kampi.p12` ile **sabit imzayla** üretilir; böylece yeni sürüm eskisinin üzerine kurulabilir. Depo herkese açık olduğu için bu anahtar gizli değildir; mağaza dağıtımı için kendi anahtarını kullan.

**Canlı kullanım için proje sahibinin Email/Password, Firestore ve güvenlik kurallarını etkinleştirmesi gerekir.** Koç tamamen cihazda çalışır, API anahtarı gerekmez. Ayrıntılı adımlar: [FIREBASE.md](FIREBASE.md).

## Geliştirme

```sh
npm ci
npm run build
npm start
```

Önizleme portu 3000'dir. Web kaynakları `web/`, Firebase istemci kodu `src/cloud.js`, Android kodu `app/` içindedir. `app/src/main/assets/www/` derleme çıktısıdır; kaynak değişikliklerinden sonra `npm run build` çalıştırın.

PDF içerikleri `scripts/make_pdfs.py` ile üretilir. Matematik ve Sosyal paylaşılan konu dağılımlarına dayanır; diğerleri genel tekrardır. Uygulama MEB veya okulun resmî uygulaması değildir.

## Test ve APK

```sh
npm test
npm run test:browser
npm run test:rules   # Java 21 gerekir
npm run test:cloud   # Java 21 ve Chromium gerekir
npm run android     # Java 17 ve Android SDK gerekir
```

GitHub Actions: `.github/workflows/android.yml`. Başarılı derlemenin `Sinav-Kampi-APK` artefaktında `Sinav-Kampi.apk` bulunur. Bu kişisel kullanım için debug imzalı APK'dır; Play Store yayın paketi değildir.

Bildirimler için Android izinleri ve pil ayarları gerekir. 10 dakika hedeflenir; işletim sistemi geciktirebilir. Zorla durdurma sonrası uygulamayı yeniden açın. Firebase eşitlemesi uygulama açıkken çalışır; sınav bildirimleri yerel Android servisinden gelir.
