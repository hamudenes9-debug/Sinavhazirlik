# Sınav Kampı — sinavkam Firebase kurulumu (proje sahibi için)

## Bağlanan proje

- Project ID: `sinavkam`
- Project number / sender ID: `547780044422`
- Auth domain: `sinavkam.firebaseapp.com`
- Android paket adı: `Com.company.sinavhazirlik` (büyük/küçük harf dahil Firebase kaydıyla aynı)
- Android registration: `firebase/android-registration.json`
- Uygulama istemci yapılandırması: `src/firebase-config.js`

Bu sürüm, Android WebView içinde **Firebase Web SDK** kullanır. Bu nedenle Auth ve Firestore için ayrı bir Web App ID zorunlu değildir. İleride Analytics, Remote Config veya App Check eklenirse Firebase Console'da bir **Web uygulaması** da kaydedip Web App ID'yi Bulut ekranındaki isteğe bağlı alana girin. Android App ID'yi Web App ID alanına yazmayın.

`apiKey` bir istemci tanımlayıcısıdır; yönetici şifresi değildir. Buna rağmen erişim güvenliği kurallarla sağlanmalıdır. Admin SDK JSON dosyası, servis hesabı özel anahtarı veya Firebase şifresi uygulamaya konmaz. Bu projede Admin SDK kullanılmaz.

Ödev koçu ve sesli arama için ayrıca bkz. [AI-KOC.md](AI-KOC.md).

## Uygulama içinde Firebase ayarı yok

Kullanıcıya proje ID, API key veya bağlantı formu gösterilmez. `src/firebase-config.js` içindeki sinavkam yapılandırması pakete gömülür. Aşağıdaki ayarlar yalnızca proje sahibinin Firebase Console’da yapacağı kurulumdur.

## Proje sahibinin yapacağı ayarlar

Kodun bağlanması, hesabınızdaki Firebase servislerini kendiliğinden etkinleştirmez veya kuralları yayımlamaz. Bu çalışma ortamında Firebase hesabınıza yönetici oturumu yoktur.

1. [Authentication sağlayıcıları](https://console.firebase.google.com/project/sinavkam/authentication/providers): **Email/Password**, **Google** ve **GitHub** sağlayıcılarını etkinleştirin. GitHub için GitHub OAuth App oluşturun; Authorization callback URL olarak `https://sinavkam.firebaseapp.com/__/auth/handler` girin, Client ID/Client Secret değerlerini Firebase GitHub sağlayıcısına kaydedin. Google için destek e-postası seçin.
2. [Firestore](https://console.firebase.google.com/project/sinavkam/firestore): veritabanı yoksa **Create database** ile oluşturun. Üretim modunu seçin. Konum seçimi kalıcıdır; mevcut veritabanınız varsa onu kullanın. Uygulama `(default)` veritabanını kullanır.
3. [Firestore Rules](https://console.firebase.google.com/project/sinavkam/firestore/rules): bu depodaki `firestore.rules` içeriğinin tamamını editöre yapıştırıp **Publish** edin. Test modu süresi dolunca erişim kapanır; herkese açık kurallar kullanmayın.

CLI ile eşdeğer kurulum:

```sh
npm ci
npx firebase login
npx firebase use sinavkam
npm run deploy:rules
```

`firebase login` kendi tarayıcınızda oturum açar. OAuth kodlarını veya şifrenizi sohbet'e göndermeyin. `.firebaserc` zaten `sinavkam` projesini seçer. Hesabınızın bu projede kural yayımlama yetkisi olmalıdır.

## Web önizleme alanı

Google/GitHub girişinde kullandığınız web alan adı ve APK içindeki `appassets.androidplatform.net` yetkili alanlarda olmalıdır. E-posta/şifre girişinde çoğunlukla ek alan ayarı gerekmez. Firebase `auth/unauthorized-domain` verirse Authentication → Settings → Authorized domains bölümünde uygulamayı açtığınız gerçek alan adını ekleyin. `localhost` geliştirme için genellikle zaten izinlidir. Android WebView sabit `appassets.androidplatform.net` yerel alanını kullanır; gerektiğinde onu da ekleyin. Bu bir uzak sunucu değil, sadece uygulama içindeki yerel dosyaların güvenli origin'idir.

API anahtarına kısıtlama eklediyseniz WebView/Web SDK isteklerini de kapsadığından emin olun. Yalnızca Android paket adı/SHA-1 kısıtlı bir anahtar Web SDK çağrılarını reddedebilir. Böyle bir durumda Console'da Web uygulaması oluşturup onun istemci yapılandırmasını kullanın. Kısıtlamayı kaldırmadan önce kuralları yayımlayın; App Check production için önerilir fakat bu sürümde zorunlu tutulmamıştır.

## Kullanım

1. Uygulamada **Bulut & skorlar** ekranına girin. Proje bilgileri önceden yüklüdür.
2. Hesap oluşturun veya giriş yapın. Şifre en az 8 karakter olmalıdır.
3. **Bulut eşitlemeyi aç** düğmesine basın. Giriş yapmak tek başına veri yüklemez.
4. Görevler, seçili dersler, kişisel sınavlar ve test sonuçları eşitlenir. Bildirim izinleri, sessiz saatler ve odak sayacı cihaza özeldir.
5. Skor tablosuna katılmak ayrıca takma ad ister. Katılım bulut eşitlemeyi de açar. E-posta, cevaplar veya kişisel takvim skor tablosuna eklenmez.
6. **Listeden ayrıl** yalnızca herkese açık skor kaydını siler. **Hesabımı ve bulut verimi sil** şifreyle yeniden doğrulama yaparak hesabı, özel bulut kaydını ve skor kaydını siler. Cihazdaki yerel kayıt kalır; onu ayrıca yedekleyebilir/silebilirsiniz.

## Veri modeli ve güvenlik

- `users/{uid}`: `progress` (JSON), `revision`, `updatedAt`. Sadece hesap sahibi okuyup yazabilir; koleksiyon listelenemez.
- `leaderboard/{uid}`: `nickname`, `points`, `completed`, `correct`, `updatedAt`. Yalnızca giriş yapmış kullanıcılar okuyabilir; sadece sahibi yazabilir.
- Diğer tüm yollar kapalıdır.
- Kurallar alan türlerini, boyutları, puan formülünü, sunucu zamanını ve özel kaydın artan sürümünü denetler.
- Puan: tamamlanan görev × 5 + her dersin en iyi doğru sayısı × 10. Tekrarlanan aynı sonuç puanı artırmaz.
- **Önemli:** puanlar istemcide hesaplanan çalışma puanlarıdır. Kurallar biçimi ve sahipliği denetler; kullanıcının kendi cihazındaki veriyi değiştirerek puan şişirmesini kriptografik olarak önlemez. Bu liste resmî sınav sonucu veya ödüllü/anti-cheat korumalı turnuva için uygun değildir. Böyle bir kullanım için sunucu tarafı doğrulama gerekir.

## Çevrimdışı ve çoklu cihaz

- Çalışma verileri önce localStorage'a yazılır; internet yokken uygulamada kalır.
- Firestore transaction ile uzak kayıt birleştirilir. Görevlerde zaman damgası, kişisel sınav silmelerinde tombstone, testlerde deneme kimliği kullanılır.
- Aynı görev iki cihazda değiştiyse daha yeni zaman damgası kazanır. Eski cihazın yeniden bağlanması yeni sınavı geri getiremez.
- Eşitleme uygulama açıkken ve oturum etkinse yapılır. Sayfa tamamen kapalıyken arka plan eşitlemesi vaat edilmez.
- Firebase erişimi çevrimdışı sınav çalışmayı engellemez. PDF'ler ve testler uygulama paketindedir.
- İlk eşitlemede cihazdaki mevcut ilerleme hesapla birleşir. Başkasının cihazında oturum açarken bunu dikkate alın; çıkış yapmak yerel kaydı silmez.

## Doğrulama

```sh
npm test
npm run build
npm run test:rules     # Java 21 ve Firebase emulator gerekir
npm run test:cloud     # gerçek SDK'yı yerel Auth/Firestore emulatorına bağlar
npm run test:browser   # sunucu yoksa kendisi başlatır
```

Emulator testleri `demo-sinav-kampi` projesini kullanır; canlı `sinavkam` verisine dokunmaz. GitHub Actions bu testleri ve APK derlemesini çalıştırır; v1.1.0 için kurallar, iki cihazlı bulut senaryosu, çevrimdışı önbellek ve Android derlemesi CI’da geçmiştir. Emulator başarısı canlı proje ayarlarının yayımlandığını kanıtlamaz. Canlı doğrulama için yukarıdaki üç ayardan sonra gerçek bir hesapla giriş ve iki cihazda eşitleme kontrolü yapılmalıdır.

Kurulabilir APK: https://github.com/hamudenes9-debug/Sinavhazirlik/releases/tag/v1.8.0

## Sorun giderme

- `auth/operation-not-allowed`: İlgili sağlayıcı (Email/Password, Google veya GitHub) kapalı.
- `auth/popup-blocked`: Tarayıcı açılır pencereyi engelledi; uygulama yönlendirmeli girişi dener.
- `auth/unauthorized-domain`: Alan adı yetkili değil.
- Google WebView içinde `disallowed_useragent` gösterirse Android WebView OAuth’u kısıtlıyor demektir; e-posta/şifre ile giriş veya web sürümü kullanın.
- `permission-denied`: Kurallar yayımlanmamış veya yanlış veritabanına yayımlanmış.
- `failed-precondition`: Firestore oluşturulmamış.
- `auth/unauthorized-domain`: Web alanı yetkili değil.
- `auth/invalid-api-key` / API key service blocked: İstemci yapılandırmasını ve anahtar kısıtlamalarını kontrol edin.
- `unavailable`: İnternet/Firestore erişimi yok; yerel kayıt korunur.
- Eşitleme düğmesi çalışmıyor: Giriş yapılmış mı ve bulut eşitleme açık mı kontrol edin.

10 dakikalık sınav bildirimleri Firebase üzerinden değil, Android'in yerel hatırlatma servisi üzerinden çalışır. FCM/uzaktan bildirim bu sürüme eklenmemiştir.
