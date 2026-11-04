# Sınav Kampı

6. sınıf sınav hazırlık uygulaması. Türkiye saatiyle kişisel sınav takvimi, 12 günlük kamp, görev takibi, 25 dakikalık odak sayacı, 68 soruluk açıklamalı testler, 15 çevrimdışı PDF ve **ödev için okul çıkışı arayan sesli yapay zekâ koçu** içerir.

## Sürüm 1.6.1

- **Kamp Koçu:** günlük çıkış saatine göre arama (Pzt 16:00, diğer günler 15:10 gibi), sesli ödev sorma/kaydetme ve teslimden bir gün önce hatırlatma.
- **Uygulama içi bilgi motoru:** konu özetleri ve soru açıklamalarından anahtarsız yanıt (EBOB, bölünebilme, olasılık, kültür, kıtalar…). Ders dışı sorularda uydurmaz.
- **Çift korumalı ödev kaydı:** soru/sohbet cümlesi model “ödev” dese bile kaydedilmez.
- **Doğal ses:** internetli bulut Türkçe sesi varsayılan, hız 0.7–1.4, ses seçimi ve “Sesi dene”.
- **Groq bağlantısı:** istek APK’da doğrudan Android üzerinden gider (CORS engeli yok); “Bağlantıyı test et” gerçek sonucu gösterir.
- **Akıllı koç:** soruları ödev sanmaz, “Sen kimsin?” gibi sorulara cevap verir, ödevleri niyetine göre kaydeder.
- **Ses seçimi:** Google Türkçe ses motoru, en iyi ses, hız ayarı ve “Sesi dene”.
- Sesli brifing, mikrofonla/yazarak sohbet, “ödevimi yaptım” işaretleme.
- Groq bağlantısı: anahtar cihazda veya `GROQ_API_KEY` depo sırrıyla gömülü. Ayrıntılar: [AI-KOC.md](AI-KOC.md).
- Proje: **sinavkam**
- Google, GitHub ve e-posta/şifre ile giriş.
- Uygulama içinde Firebase bağlantı ayarı yok; proje arka planda hazır.
- OrtakokulSinav.PDF kaynaklı 6. sınıf ortak sınav takvimi.
- İsteğe bağlı bulut ilerleme eşitlemesi.
- Takma adlı, isteğe bağlı kamp sıralaması.
- Android paket adı: `Com.company.sinavhazirlik`.
- Hesap, bulut verisi silme ve yerel JSON yedekleme.

**Canlı kullanım için proje sahibinin Email/Password, Firestore ve güvenlik kurallarını etkinleştirmesi gerekir.** Yapay zekâ koçu için Groq anahtarı gerekir; anahtar depoya yazılmaz. Ayrıntılı adımlar: [FIREBASE.md](FIREBASE.md).

## Geliştirme

```sh
npm ci
npm run build
npm start
```

Önizleme portu 3000'dir. Yapay zekâ koçunu yerelde denemek için: `GROQ_API_KEY=gsk_... npm start`. Web kaynakları `web/`, Firebase istemci kodu `src/cloud.js`, Android kodu `app/` içindedir. `app/src/main/assets/www/` derleme çıktısıdır; kaynak değişikliklerinden sonra `npm run build` çalıştırın.

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
