# Kamp Koçu — ödev listesi ve okul çıkışı araması

Sürüm **1.3.0** ile uygulamaya ödev takibi ve **yapay zekâ koçunun öğrenciyi araması** eklendi.

## Ne yapıyor?

- **Ödev listesi:** ders, başlık ve teslim tarihiyle ödev eklenir. Liste yalnızca cihazda saklanır.
- **Okul çıkışı araması:** hafta içi seçilen saatte (varsayılan **16:30**) “Kamp Koçu seni arıyor” bildirimi gelir. Bildirime dokununca uygulama içinde **sesli arama ekranı** açılır.
- **Sesli brifing:** koç ödev sayısını, ilk ödevi ve yaklaşan sınavı Türkçe sesli söyler.
- **Sesli sohbet:** mikrofonla veya yazarak cevap verilir. Koç cevabı sesli okur.
- **Ödev işaretleme:** “Matematik ödevini yaptım” denince o ödev tamamlandı olarak işaretlenir.
- **Yardım:** “Fen ödevinde takıldım” denince konu hatırlatılır ve küçük bir ipucu verilir.
- **Çevrimdışı:** internet veya anahtar olmadan da ödev/sınav bilgileri sesli söylenir; ayrıntılı yardım için Groq anahtarı gerekir.

> **Önemli:** Bu “arama” gerçek telefon araması değildir. Koç uygulama içinde sesli arama ekranı açar; telefon faturası, numara paylaşımı veya arama izni gerekmez.

## Groq (yapay zekâ) bağlantısı

Anahtar depoya **hiçbir zaman yazılmaz**; üç yolla çalışır:

1. **Uygulama içinde bir kez girmek (en kolay):** Ödev & AI koç → “Yapay zekâ anahtarı” alanına `gsk_...` anahtarını yaz, **Kaydet**. Anahtar yalnızca o cihazın `localStorage` kaydında tutulur ve istekler doğrudan Groq’a gider.
2. **GitHub deposu sırrı olarak derlemek:** Depo → Settings → Secrets and variables → Actions → `GROQ_API_KEY` ekle (isteğe bağlı `GROQ_PROXY_URL`, `GROQ_MODEL`). APK derlenirken anahtar `ai-config.js` içine gömülür. Depo herkese açık olduğu için **APK içine gömülen anahtar paylaşılabilir**; bu yolu yalnızca senin cihazında kurulum yapılacaksa kullan ve anahtarı arada bir yenile.
3. **Proxy:** `GROQ_PROXY_URL` verilirse anahtar cihaza hiç inmez; istekler kendi sunucundan Groq’a iletilir. Sunucu `{messages:[...]}` alıp `{reply:"..."}` veya OpenAI biçiminde yanıt döndürmelidir.

Yerel önizleme: `GROQ_API_KEY=gsk_... npm start` komutu anahtarı yalnızca çalışan sunucuya verir.

### Anahtarını paylaştıysan

Sohbette/ekran görüntüsünde paylaşılan bir anahtar artık gizli sayılmaz. Groq konsolundan anahtarı **silip yenisini oluştur** ve yenisini yalnızca uygulamaya gir.

## Android izinleri

| İzin | Neden |
| --- | --- |
| `POST_NOTIFICATIONS` | Arama bildirimi |
| `SCHEDULE_EXACT_ALARM` | Saati dakikası dakikasına planlamak (izin yoksa yaklaşık zamanlanır) |
| `RECORD_AUDIO` | Mikrofonla cevap vermek (izin verilmezse yazıyla devam edilir) |
| `INTERNET` | Groq yanıtı; yoksa çevrimdışı brifing |

Mikrofon ve konuşma tanıma cihazda yoksa koç yazılı sohbete geçer. Türkçe ses (TTS) yoksa metin yine görünür.

## Telefon kısıtları

- Uygulama **pilin optimizasyonundan** çıkarılmazsa bazı üreticiler (Xiaomi, Samsung, Huawei) alarmı geciktirebilir. Ayarlar sayfasındaki “pil” düğmesinden izin ver.
- “Tam alarm” izni verilmezse arama birkaç dakika gecikebilir; bildirim yine gelir.
- İnternet yoksa koç yalnızca cihazdaki ödev/sınav bilgilerini söyler.

## Gizlilik

- Ödev listesi, arama saati ve anahtar cihazda kalır; Firebase’e eşitlenmez.
- Anahtar varsa **ödev başlıkları ve o anki konuşma** Groq’a gönderilir. Anahtar yoksa internet isteği yapılmaz.
- Anahtar silinebilir: aynı ekranda **Sil** düğmesi.

## Testler

```bash
npm test                 # çekirdek + koç mantığı (25 test)
npm run test:browser     # masaüstü/mobil, arama ekranı, ödev ekleme
```

Tarayıcı testi Groq çağrısını engelleyerek çevrimdışı yanıt yolunu da doğrular.
