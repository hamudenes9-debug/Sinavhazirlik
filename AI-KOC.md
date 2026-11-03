# Kamp Koçu — ödev listesi ve okul çıkışı araması

Sürüm **1.5.0** ile ödev takibi, **günlük çıkış saatine göre arama**, teslim öncesi hatırlatma ve **çalışan Groq bağlantısı** birlikte gelir.

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
- **Çevrimdışı:** internet veya anahtar olmadan da ödev/sınav bilgileri sesli söylenir; ayrıntılı yardım için Groq anahtarı gerekir.

> **Önemli:** Bu “arama” gerçek telefon araması değildir. Koç uygulama içinde sesli arama ekranı açar; telefon faturası, numara paylaşımı veya arama izni gerekmez.

## Groq (yapay zekâ) bağlantısı

**1.5.0’da bağlantı APK içinde doğrudan Android üzerinden yapılır.** WebView’dan `fetch` CORS engeline takıldığı için istek Java tarafına taşındı; artık “internet yok” hatası yerine gerçek sebep yazılır (geçersiz anahtar, dakika sınırı, zaman aşımı gibi).

> **Anahtar neden gömülü değil?** Depo herkese açık ve GitHub, anahtarı dosyaya yazıp göndermeyi **push protection** ile engelliyor (denendi, reddedildi). Anahtarı iki şekilde bağlayabilirsin: uygulamada bir kez gir (en hızlı) veya `GROQ_API_KEY` deposu sırrı ekleyip APK’yı yeniden derlet.

Ödev & AI koç ekranındaki **Bağlantıyı test et** düğmesi gerçek bir Groq isteği atar ve sonucu yeşil/kırmızı kutuda gösterir.

Anahtar sırası: uygulamada yazılan anahtar → `web/ai-config.js` içindeki varsayılan (boş) → derleme sırasında `GROQ_API_KEY`. Yollar:

1. **Uygulama içinde değiştirmek:** Ödev & AI koç → “Yapay zekâ anahtarı” alanına `gsk_...` yaz, **Kaydet**. Bu anahtar gömülü anahtarın önüne geçer ve yalnızca o cihazda saklanır.
2. **GitHub deposu sırrı olarak derlemek:** Depo → Settings → Secrets and variables → Actions → `GROQ_API_KEY` ekle (isteğe bağlı `GROQ_PROXY_URL`, `GROQ_MODEL`). APK derlenirken anahtar `ai-config.js` içine gömülür. Depo herkese açık olduğu için **APK içine gömülen anahtar paylaşılabilir**; bu yolu yalnızca senin cihazında kurulum yapılacaksa kullan ve anahtarı arada bir yenile.
3. **Proxy:** `GROQ_PROXY_URL` verilirse anahtar cihaza hiç inmez; istekler kendi sunucundan Groq’a iletilir. Sunucu `{messages:[...]}` alıp `{reply:"..."}` veya OpenAI biçiminde yanıt döndürmelidir.

Yerel önizleme: `GROQ_API_KEY=gsk_... npm start` komutu anahtarı yalnızca çalışan sunucuya verir.

### Anahtarını paylaştıysan

Depo herkese açık olduğu için anahtarı dosyaya yazmak GitHub tarafından engellenir. Anahtarı yalnızca uygulamada gir; yeni anahtar oluşturursan eskisini Groq konsolundan sil.

### Ses hızı ve kalitesi

- Android’de cihazın **en iyi çevrimdışı Türkçe sesi** seçilir, konuşma hızı 1.12’ye ayarlanır.
- Ses motoru uygulama açılırken hazırlanır; ilk cümlenin gecikmesi azalır.
- Daha iyi ses için telefonda **Ayarlar → Dil ve giriş → Metin okuma** bölümünden Google Konuşma Hizmetleri’ni ve Türkçe ses paketini güncelle.
- Mikrofonla konuşurken koç cevabı 3 kısa cümleyle sınırlar.

## Android izinleri

| İzin | Neden |
| --- | --- |
| `POST_NOTIFICATIONS` | Arama bildirimi |
| `SCHEDULE_EXACT_ALARM` | Günlük çıkış saatini dakikası dakikasına planlamak |
| `RECORD_AUDIO` | Mikrofonla cevap vermek (izin verilmezse yazıyla devam edilir) |
| `INTERNET` | Groq yanıtı; yoksa çevrimdışı brifing |

Mikrofon ve konuşma tanıma cihazda yoksa koç yazılı sohbete geçer. Türkçe ses (TTS) yoksa metin yine görünür.

## Telefon kısıtları

- Uygulama **pilin optimizasyonundan** çıkarılmazsa bazı üreticiler (Xiaomi, Samsung, Huawei) alarmı geciktirebilir. Ayarlar sayfasındaki “pil” düğmesinden izin ver.
- “Tam alarm” izni verilmezse arama birkaç dakika gecikebilir; bildirim yine gelir.
- Her gün en fazla 12 alarm planlanır; uygulamayı açtığında ve tekrar aradığında plan kendini yeniler.
- Teslim hatırlatması yalnızca 18:00’den önce uygulama açıldığında planlanır.
- İnternet yoksa koç yalnızca cihazdaki ödev/sınav bilgilerini söyler.

## Gizlilik

- Ödev listesi, arama saati ve anahtar cihazda kalır; Firebase’e eşitlenmez.
- Anahtar varsa **ödev başlıkları ve o anki konuşma** Groq’a gönderilir. Anahtar yoksa internet isteği yapılmaz.
- Anahtar silinebilir: aynı ekranda **Sil** düğmesi.

## Testler

```bash
npm test                 # çekirdek + koç mantığı (30 test)
npm run test:browser     # masaüstü/mobil, arama ekranı, ödev ekleme
```

Tarayıcı testi Groq çağrısını engelleyerek çevrimdışı yanıt yolunu da doğrular.
