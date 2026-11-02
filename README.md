# Sınav Kampı

6. sınıf sınav hazırlık uygulaması. Türkiye saatiyle kişisel sınav takvimi, 12 günlük kamp, görev takibi, 25 dakikalık odak sayacı, 68 soruluk açıklamalı testler ve 15 çevrimdışı PDF içerir.

## Firebase sürümü 1.1.0

- Proje: **sinavkam**
- E-posta/şifre ile Firebase Authentication.
- İsteğe bağlı bulut ilerleme eşitlemesi.
- Takma adlı, isteğe bağlı kamp sıralaması.
- Android paket adı: `Com.company.sinavhazirlik`.
- Hesap, bulut verisi silme ve yerel JSON yedekleme.

**Canlı kullanım için proje sahibinin Email/Password, Firestore ve güvenlik kurallarını etkinleştirmesi gerekir.** Ayrıntılı adımlar: [FIREBASE.md](FIREBASE.md).

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
