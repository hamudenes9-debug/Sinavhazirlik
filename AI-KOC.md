# Kamp Koçu — ödev listesi ve okul çıkışı araması

Sürüm **1.8.1** ile koç tamamen **cihazın içinde** çalışır: **143 maddelik 6. sınıf bilgi bankası**, **261 kayıtlık arama dizini**, gerçek hesap yapan matematik modülü ve **test soran** bir koç. Yazma kaldırıldı, arama **yalnızca sesle** yürüyor ve koç seni ararken **zil sesi** çalıyor. Groq/API anahtarı tamamen kaldırıldı; hiçbir veri sunucuya gitmiyor.

## Akıllı davranış

Koç söyleneni önce **anlar**, sonra kaydeder:

| Söylediğin | Koç ne yapar |
| --- | --- |
| “Sen kimsin?” | Kendini tanıtır, ödev kaydetmez |
| “Merhaba” / “Teşekkürler” | Karşılık verir, ödev sormaya devam eder |
| “Yarın hangi sınav var?” | Takvimden yanıtlar |
| “Matematik ödevinde takıldım” | Konuyu hatırlatıp ipucu verir |
| “Fen özeti, Türkçe kitap okuma” | İki ödev olarak kaydeder |
| “Bugün ödev yok” | Kaydetmez, sınav tekrarı önerir |
| “EBOB nasıl bulunur?” | Uygulamadaki konu özeti ve soru açıklamasından örnekli yanıt verir |
| “Bana bir şaka yap” | Kısa bir şaka yapar, sonra derse döner |
| “Bana soru sor” | Test sorusu sorar, cevabı değerlendirir, doğru cevabı açıklar |
| “Bugün ne çalışayım?” | Sınav tarihi ve bekleyen ödevlere göre üç adımlı plan verir |
| “Nasılsın / kaç yaşındasın?” | Doğal sohbet cevabı verir |
| “3 km kaç m?” / “apple ne demek?” | 3000 m / “elma” |
| “Anlamadım” | Son cevabı iki cümlede tekrar eder |
| “Bugün hava nasıl?” | Ders dışı soruya uydurma cevap vermez, nazikçe konuyu ödeve getirir |

Sohbet cümleleri **üç ayrı katmanda** süzülür: (1) niyet katmanı, (2) ayrıştırılan başlıkların doğrulanması, (3) depolama katmanı (`addHomework`). “Sen kimsin?” gibi bir cümle hiçbir koşulda listeye eklenmez. Engellenen cümlede ekranda “Bu bir sohbet sorusu; ödev olarak kaydetmedim.” bilgisi çıkar.

Anlama ve cevap üretme tamamen **cihazdaki motor** tarafından yapılır; internet veya anahtar gerekmez.

## Ne yapıyor?

- **Ödev listesi:** ders, başlık ve teslim tarihiyle ödev elle de eklenebilir. Liste yalnızca cihazda saklanır.
- **Günlük çıkış saatleri:** her gün için ayrı saat girilir (örnek: Pazartesi **16:00**, diğer günler **15:10**). Boş bırakılan gün aranmaz.
- **Okul çıkışı araması:** o günün çıkış saatinde “Kamp Koçu seni arıyor” bildirimi gelir; dokununca uygulama içi sesli arama açılır ve koç **“bugün hangi ödevleri verdiler?”** diye sorar.
- **Ödev kaydı:** söylediklerin (“matematik çalışma kağıdı, fen özeti ve türkçe kitap okuma”) dersleriyle birlikte ayrı ödevler olarak kaydedilir. Teslim tarihi varsayılan olarak sonraki okul günüdür; listeden değiştirilebilir.
- **Teslimden bir gün önce:** o gün 18:00’de “(İsim)! Yarın … ödevin var, unutma” diye arar.
- **İsimle hitap:** “Koç sana nasıl hitap etsin?” alanına yazdığın isimle konuşur.
- **Sesli brifing:** koç ödev sayısını, ilk ödevi ve yaklaşan sınavı Türkçe sesli söyler.
- **Sesli sohbet:** mikrofonla veya yazarak cevap verilir. Koç cevabı sesli okur.
- **Ödev işaretleme:** “Matematik ödevini yaptım” denince o ödev tamamlandı olarak işaretlenir.
- **Yardım:** “Fen ödevinde takıldım” denince konu hatırlatılır ve küçük bir ipucu verilir.
- **Çevrimdışı bilgi motoru:** konu özetleri, 68 sorunun açıklaması ve **143 maddelik bilgi bankası** tek bir aranabilir dizinde toplanır (**261 kayıt**). “EBOB nasıl bulunur”, “hücre nedir”, “present simple”, “kültür nedir”, “çemberin çevresi” gibi sorulara anahtar olmadan cevap verir. Türkçe ekler kök eşleştirmesiyle çözülür; ders dışı sorularda tahmin yürütmez.
- **Hesap makinesi:** “12 × 8 kaç eder”, “144 / 12”, “80’in %25’i”, “2 üssü 5” gibi işlemleri gerçekten hesaplar ve sonucu söyler.
- **Test modu:** “bana soru sor” dediğinde uygulamadaki 68 sorudan birini seçer, seçenekleri sesli okur, cevabını değerlendirir ve doğrusunu açıklar. “Bir tane daha sorayım mı?” sorusuna “evet” dersen devam eder.
- **Plan:** “bugün ne çalışayım” dediğinde yaklaşan sınavı ve bekleyen ödevleri sıraya koyar.

> **Önemli:** Bu “arama” gerçek telefon araması değildir. Koç uygulama içinde sesli arama ekranı açar; telefon faturası, numara paylaşımı veya arama izni gerekmez.

## Cihaz içi beyin (Groq kaldırıldı)

Koç artık **hiçbir dış servise bağlanmıyor**. `1.8.0` ile Groq istemcisi, API anahtarı alanı, proxy ve ilgili izinler tamamen kaldırıldı. Avantajları:

- Anahtar, internet veya hesap gerekmez; uçak modunda da ders sorusuna cevap verir.
- Ses ve metin cihazdan çıkmaz; gizlilik en üst düzeyde.
- Yanıt gecikmesi yok; cevaplar anında gelir.

Nasıl “zeki” oluyor?

1. **Bilgi bankası:** 143 kısa, doğru tanım (matematik, fen, Türkçe, sosyal, İngilizce, din).
2. **Konu özetleri + 68 soru açıklaması:** toplam 261 kayıtlık arama dizini.
3. **Türkçe kök eşleştirme:** ekler (EBOB/EBOB’u, hücre/hücrenin) aynı köke indirgenir; nadir kelimeler zorunlu, genel kelimeler ağırlıklı sayılır.
4. **Hesap makinesi:** dört işlem, yüzde ve üs gerçekten hesaplanır.
5. **Birim çevirici:** “3 km kaç m”, “1 saat kaç dakika”, “500 g kaç kg” gibi soruları hesaplar.
6. **Mini sözlük:** 61 İngilizce kelime; “apple ne demek”, “kitap ingilizce ne demek” gibi soruları iki yönde yanıtlar.
7. **Bağlam:** ödevler, teslim tarihleri ve sınav takvimi her cevaba katılır; “anlamadım” dersen son cevabı kısaca tekrar eder.

Ders dışı bir soruya uydurma cevap vermez: eşleşme yoksa “bunu notlarımdan çıkaramadım” der ve konuyu sorar.

## Sesli arama: yazma yok, zil var

- Arama ekranında **yazma alanı yoktur**; koç yalnızca mikrofonla dinler ve sesli cevap verir.
- Koç seni aradığında (çıkış araması ve teslim hatırlatması) önce **zil sesi** çalar (`voice/ring.wav`, uygulamayla gelir), ardından konuşmaya başlar.
- Yazılı döküm yine ekranda görünür; sesi kapatsan bile konuşulanları okuyabilirsin.

## Ses hızı ve kalitesi

- Uygulama **Google Konuşma Hizmetleri** motorunu (kuruluysa) kullanır; cihazın en iyi Türkçe sesi seçilir.
- Koçun sabit cümleleri **10 doğal Türkçe kayıttan** çalınır; cihazın robotik sesi bu cümlelerde duyulmaz.
- “Koçun sesi” kartından ses, **doğal ses paketi**, **internetli doğal ses** ve **0.8–1.35×** hız seçilir, “Sesi dene” ile dinlenir.
- Daha iyi ses için telefonda **Ayarlar → Dil ve giriş → Metin okuma** bölümünden Google Konuşma Hizmetleri’ni ve Türkçe ses paketini güncelle.

## Android izinleri

| İzin | Neden |
| --- | --- |
| `POST_NOTIFICATIONS` | Arama bildirimi |
| `SCHEDULE_EXACT_ALARM` | Günlük çıkış saatini dakikası dakikasına planlamak |
| `RECORD_AUDIO` | Mikrofonla cevap vermek (arama sesle yürür) |
| `INTERNET` | Firebase hesabı ve bulut eşitleme (koç internet olmadan da çalışır) |

Mikrofon ve konuşma tanıma cihazda yoksa koç yine konuşur ve yazılı dökümü gösterir; cevap girişi için mikrofon gerekir. Türkçe ses (TTS) yoksa metin yine görünür.

## Telefon kısıtları

- Uygulama **pilin optimizasyonundan** çıkarılmazsa bazı üreticiler (Xiaomi, Samsung, Huawei) alarmı geciktirebilir. Ayarlar sayfasındaki “pil” düğmesinden izin ver.
- “Tam alarm” izni verilmezse arama birkaç dakika gecikebilir; bildirim yine gelir.
- Her gün en fazla 12 alarm planlanır; uygulamayı açtığında ve tekrar aradığında plan kendini yeniler.
- Teslim hatırlatması yalnızca 18:00’den önce uygulama açıldığında planlanır.
- İnternet olmadan da koç tüm ders sorularını yanıtlar; yalnızca bulut eşitleme ve giriş çalışmaz.

## Gizlilik

- Ödev listesi, arama saati ve ses tercihleri cihazda kalır; Firebase’e eşitlenmez.
- Koç **hiçbir dış servise istek atmaz**: ne metin ne ses cihazdan çıkar. Tek istisna, isteğe bağlı bulut eşitleme ve giriş.
- Uygulamayı kaldırmak cihazdaki ödev listesini de siler; Ayarlar → **Yedeği indir** ile JSON yedek alabilirsin.

## Testler

```bash
npm test                 # çekirdek + koç mantığı (42 test)
npm run test:browser     # masaüstü/mobil, sesli arama, test sorusu, ödev ekleme
```

Tarayıcı testi yazma alanının kaldırıldığını, zil sesinin yüklendiğini, “Sen kimsin?” sorusunun ödev olarak kaydedilmediğini ve “bana soru sor” test akışını doğrular.
