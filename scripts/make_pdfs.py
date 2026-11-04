"""Create original, offline study notes and answer-key PDFs. Run with the local venv."""
from pathlib import Path
import json, re, html
import arabic_reshaper
from bidi.algorithm import get_display
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'web'/'pdfs'; OUT.mkdir(parents=True,exist_ok=True)
for name,file in [('Sans','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
W,H=A4; M=44; CW=W-2*M
INK=HexColor('#294334'); MUTED=HexColor('#72816A'); ORANGE=HexColor('#DF693F'); LIGHT=HexColor('#F0F4E8')
body=ParagraphStyle('body',fontName='Sans',fontSize=10,leading=16,textColor=INK,spaceAfter=8)
small=ParagraphStyle('small',parent=body,fontSize=8,leading=12,textColor=MUTED)
head=ParagraphStyle('head',parent=body,fontName='Bold',fontSize=13,leading=19,spaceAfter=10)

def shape_arabic(text):
    return re.sub(r'[\u0600-\u06FF][\u0600-\u06FF\s،؟]*[\u0600-\u06FF]|[\u0600-\u06FF]', lambda m: get_display(arabic_reshaper.reshape(m.group(0))), text)

def Q(q,options,answer,explanation): return {'q':q,'options':options,'answer':answer,'explanation':explanation}
notes={}; quizzes={}
def add(key,title,sections,questions,verified=False):
    notes[key]={'title':title,'sections':sections,'verified':verified}
    quizzes[key]=questions

add('matematik','Çarpanlardan ondalıklara', [
('01 · Çarpanlar ve katlar','Bir doğal sayıyı kalansız bölen sayılara çarpan (bölen) denir. 36’nın çarpanları: 1, 2, 3, 4, 6, 9, 12, 18, 36. Eşleri kontrol et: 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6. Bir sayının katları ise o sayının 1, 2, 3, … ile çarpılmasıyla bulunur. 7’nin 50 ile 80 arasındaki katları: 56, 63, 70, 77. Çarpanlar sonludur; pozitif katlar sonsuza kadar gider.'),
('02 · Bölünebilme ve asal sayılar','2 ile bölünme: Birler basamağı çift olmalı. 3 ile bölünme: Rakamları toplamı 3’ün katı olmalı. 4 ile bölünme: Son iki rakamın oluşturduğu sayı 4’ün katı olmalı. 5 ile bölünme: Birler basamağı 0 veya 5. 6 ile bölünme: Hem 2 hem 3 ile bölünmeli. 9 ile bölünme: Rakamlar toplamı 9’un katı. 10 ile bölünme: Birler basamağı 0. Asal sayının tam iki farklı pozitif böleni vardır: 1 ve kendisi. 2, 3, 5, 7, 11, … asaldır; 1 asal değildir. 84 = 2 × 2 × 3 × 7.'),
('03 · EBOB ve EKOK mantığı','Eşit ve en büyük gruplar kurulacaksa ortak bölenlerin en büyüğü (EBOB) düşünülür. 36 kırmızı ve 48 beyaz boncuk, renkler karışmadan eşit büyüklükte gruplara ayrılırsa bir grupta en çok 12 boncuk olur. Toplam grup sayısı: 36 ÷ 12 + 48 ÷ 12 = 7. Düzenli aralıklarla tekrarlanan olayların yeniden birlikte gerçekleşmesi için ortak katların en küçüğü (EKOK) düşünülür. 6 ve 8 saniyede bir yanan ışıklar 24. ve 48. saniyede yeniden birlikte yanar. Başlangıç anını “yeniden” sayısına katma.'),
('04 · Deneysel olasılık','Deneysel olasılık = İstenen olayın gözlenme sayısı / Toplam deneme sayısı. 50 denemede 22 mavi bilye çekildiyse mavi çekme olasılığı 22/50 = 11/25 = 44/100 = %44’tür. Bu, gelecekteki her çekilişin kesin sonucu değildir. Ece 25 atışta 17, Can 20 atışta 14 başarılıysa başarı yüzdeleri %68 ve %70’tir; bu denemelerde Can daha başarılıdır. Sonucu karşılaştırırken yalnızca başarılı atış sayısına değil, toplam atış sayısına da bak.'),
('05 · Ondalık gösterim ve yuvarlama','4,307 = 4 + 3/10 + 0/100 + 7/1000. 3’ün basamak değeri 0,3; 7’nin basamak değeri 0,007’dir. Ondalık sayıları karşılaştırmak için önce tam kısımlara, sonra sırasıyla onda, yüzde ve binde birlerine bak: 2,045 < 2,050 < 2,055 < 2,500. 12,48’i onda birlere yuvarlamak için yüzde birlerindeki 8’e bakılır: sonuç 12,5. Kesri ondalığa çevirirken payı paydaya böl: 5/4 = 1,25; 2/3 = 0,666…; 5/6 = 0,8333…. Tekrarlanan rakamların üzerine devir çizgisi çizilir.')], [
Q('36 sayısının kaç farklı pozitif çarpanı vardır?', ['6','8','9','12'],2,'Çarpanlar: 1, 2, 3, 4, 6, 9, 12, 18, 36. Toplam 9 tanedir.'),
Q('4▲2 sayısı 3 ile bölünebiliyorsa ▲ yerine kaç farklı rakam yazılabilir?', ['1','2','3','4'],3,'4 + ▲ + 2 = 6 + ▲ toplamı 3’ün katı olmalı. ▲ = 0, 3, 6, 9 olabilir.'),
Q('84 sayısının asal çarpanlarına ayrılmış biçimi hangisidir?', ['2 × 2 × 3 × 7','2 × 3 × 3 × 7','2 × 2 × 21','4 × 21'],0,'84 → 42 → 21 → 7 → 1. Asal çarpanlar 2, 2, 3 ve 7’dir.'),
Q('36 kırmızı ve 48 beyaz boncuk, renkleri karıştırmadan en büyük eşit gruplara ayrılıyor. Kaç grup oluşur?', ['5','7','12','84'],1,'EBOB(36,48)=12. Kırmızılardan 3, beyazlardan 4 grup oluşur: 3+4=7.'),
Q('6 ve 8 saniyede bir yanan ışıklar birlikte yandıktan sonra ilk 60 saniyede kaç kez yeniden birlikte yanar?', ['1','2','3','4'],1,'EKOK(6,8)=24. 60 saniyeden önceki ortak katlar 24 ve 48’dir.'),
Q('50 çekilişte 22 kez mavi bilye çekiliyor. Mavi çekmenin deneysel olasılığı yüzde kaçtır?', ['%22','%28','%44','%50'],2,'22/50 = 44/100 = %44.'),
Q('4,307 sayısındaki 3 rakamının basamak değeri kaçtır?', ['3','0,3','0,03','0,003'],1,'3, onda birler basamağındadır. Basamak değeri 3/10 = 0,3’tür.'),
Q('2,05; 2,5; 2,055; 2,045 sayılarından en küçüğü hangisidir?', ['2,05','2,5','2,055','2,045'],3,'Sayıları 2,050; 2,500; 2,055; 2,045 olarak düşün. En küçük 2,045’tir.'),
Q('12,48 sayısının onda birler basamağına yuvarlanmış hâli nedir?', ['12,4','12,5','12,48','13'],1,'Yüzde birler basamağındaki 8, 5 veya daha büyük olduğu için onda birler artar: 12,5.'),
Q('5 litre ayran 4 bardağa eşit paylaştırılırsa bir bardağa kaç litre düşer?', ['0,8','1,2','1,25','1,5'],2,'5 ÷ 4 = 5/4 = 1,25 litre.'),
Q('Aşağıdakilerden hangisi asaldır?', ['21','39','41','1'],2,'41’in pozitif bölenleri yalnızca 1 ve 41’dir. 21=3×7, 39=3×13; 1 asal değildir.'),
Q('4 ile 6’nın 40’tan küçük pozitif ortak katları hangileridir?', ['12, 24, 36','4, 6, 12','24, 48','2, 4, 6'],0,'EKOK(4,6)=12. 40’tan küçük katları 12, 24 ve 36’dır.')],True)
notes['matematik']['sections'][2]=(notes['matematik']['sections'][2][0],notes['matematik']['sections'][2][1])
add('sosyal','Birlikte yaşamak · Evimiz Dünya',[
('01 · Zaman içinde değişen gruplar ve roller','Her birey aynı anda farklı gruplara üyedir: aile, sınıf, arkadaş grubu, spor takımı. Rol, bir grupta üstlenilen görev ve beklenen davranıştır. Öğrenci olmak, kardeş olmak ve takım kaptanı olmak farklı rollerdir. Yaş değişimi, okul değişimi ve yeni sorumluluklar zamanla rollerimizi değiştirebilir. Her rolün hakları kadar sorumlulukları da vardır.'),
('02 · Kültürümüz, millî değerler ve birlik','Kültür; bir toplumun gelenekleri, yemekleri, müzikleri, sanatları ve ortak yaşama biçimidir. Yardımlaşma, misafirperverlik, bayrama ziyaret ve imece kültürel davranışlara örnektir. Saygı, sorumluluk, adalet ve dayanışma toplumsal birliği güçlendirir. Farklılıklara saygı duymak ortak değerlerden vazgeçmek değildir; birlikte yaşamayı kolaylaştırır.'),
('03 · Toplumsal sorunlara çözüm üret','Sorunu tanımla → kimlerin etkilendiğini belirle → nedenlerini araştır → uygulanabilir çözüm öner → görevleri paylaş. Sokak hayvanlarının susuz kalması için uygun noktalara düzenli bakım yapılacak su kapları koymak; çevre kirliliği için atıkları ayrıştırmak ve bilgilendirme yapmak örnektir. Çözüm önerirken güvenlik, erişilebilirlik, kaynak ve sürdürülebilirlik düşün. Yetişkin veya ilgili kurum desteği gerekebilir.'),
('04 · Ülkemiz, kıtalar ve okyanuslar','Türkiye’nin büyük bölümü Asya, küçük bir bölümü Avrupa’dadır. Bu yüzden ülkemiz iki kıtada toprağı bulunan bir devlettir. Türkiye’nin üç tarafı denizlerle çevrilidir: kuzeyde Karadeniz, batıda Ege, güneyde Akdeniz; içerde Marmara Denizi bulunur. Yaygın yedi kıta modelinde kıtalar: Asya, Avrupa, Afrika, Kuzey Amerika, Güney Amerika, Antarktika ve Avustralya’dır. Beş okyanus: Büyük (Pasifik), Atlas (Atlantik), Hint, Kuzey Buz (Arktik) ve Güney okyanusu. Kıta bir kara parçası, okyanus çok büyük bir tuzlu su kütlesidir.')],[
Q('Bir öğrencinin sınıftaki öğrenci, evdeki kardeş olması neyi gösterir?', ['Tek bir gruba üye olduğunu','Farklı gruplarda farklı rolleri olduğunu','Rollerin hiç değişmediğini','Sorumluluklarının olmadığını'],1,'Birey, üyesi olduğu farklı gruplarda farklı rollere sahip olabilir.'),
Q('Aşağıdakilerden hangisi toplumsal birliği güçlendirir?', ['Farklılıklara saygı','Yardımlaşmadan kaçınma','Ortak alanları kirletme','Kimseyi dinlememe'],0,'Saygı ve dayanışma, farklı insanların birlikte yaşamasını kolaylaştırır.'),
Q('Mahalledeki sokak hayvanlarının su sorunu için en sürdürülebilir öneri hangisidir?', ['Bir kez su döküp gitmek','Kapları rastgele bırakmak','Güvenli noktalarda düzenli bakım için görev paylaşmak','Sorunu görmezden gelmek'],2,'Düzenli bakım ve görev paylaşımı çözümün devam etmesini sağlar.'),
Q('Aşağıdakilerden hangisi kültürel birlikteliğe örnektir?', ['Bayramlarda büyükleri ziyaret etmek','Her gün aynı saatte uyumak','Yağmur yağması','Bir dağın yükselmesi'],0,'Bayram ziyareti toplumun ortak kültürel davranışlarındandır.'),
Q('Türkiye hangi iki kıtada toprağa sahiptir?', ['Asya–Avrupa','Afrika–Avrupa','Asya–Afrika','Avrupa–Amerika'],0,'Ülkemizin büyük bölümü Asya’da, küçük bir bölümü Avrupa’dadır.'),
Q('Hangisi kıta değil, okyanustur?', ['Afrika','Atlas','Asya','Antarktika'],1,'Atlas (Atlantik) bir okyanustur. Diğerleri kıtadır.')],True)
add('fen','Vücudumuz ve hareket',[
('01 · Destek ve hareket sistemi','İskelet; vücudun şeklini korur, bazı iç organları korur ve kaslarla birlikte hareketi sağlar. Kafatası beyni, kaburgalar kalp ve akciğerleri korumaya yardımcı olur. Kemikler eklemlerde birleşir. Kaslar kasılıp gevşeyerek kemiklerin hareket etmesine yardımcı olur. Dik durmak, dengeli beslenmek ve uygun egzersiz destek-hareket sağlığı için önemlidir.'),
('02 · Kuvvet ve bileşke kuvvet','Kuvvet bir cismi hızlandırabilir, yavaşlatabilir, yönünü veya şeklini değiştirebilir. Birimi newtondur (N), kuvvetölçerle ölçülür. Aynı doğrultuda ve aynı yöndeki kuvvetlerin büyüklükleri toplanır. Zıt yöndekilerin farkı alınır; bileşke kuvvet büyük olanın yönündedir. Eşit büyüklükte zıt yönlü kuvvetlerde bileşke kuvvet sıfırdır; hareket eden cisim bu durumda hızını ve yönünü koruyabilir.'),
('03 · Sindirim sistemi','Sindirim ağızda başlar. Dişler besinleri mekanik olarak parçalar; tükürükteki enzimler nişastanın kimyasal sindirimine katkı sağlar. Yutak, yemek borusu, mide, ince bağırsak ve kalın bağırsak sindirim kanalındaki organlardır. Karaciğerin ürettiği safra, safra kesesinde depolanır ve yağların küçük damlacıklara ayrılmasına yardımcı olur; safra enzim içermez. Pankreas öz suyundaki enzimler ince bağırsağa gelir. Besinlerin emilimi çoğunlukla ince bağırsakta olur. Kalın bağırsakta suyun emilimi gerçekleşir.')],[
Q('Aşağıdakilerden hangisi iskeletin görevlerindendir?', ['Ses üretmek','Bazı iç organları korumak','Kan hücrelerini sindirmek','Nefes almak'],1,'Kaburgalar ve kafatası gibi kemik yapılar bazı iç organları korur.'),
Q('Sağa 8 N, sola 3 N kuvvet uygulanıyor. Bileşke kuvvet nedir?', ['Sola 11 N','Sağa 5 N','Sağa 11 N','Sola 5 N'],1,'Zıt yönlerde fark alınır: 8−3=5 N, yön sağdır.'),
Q('Besinlerin emilimi en çok nerede gerçekleşir?', ['Mide','Yemek borusu','İnce bağırsak','Kalın bağırsak'],2,'İnce bağırsak, besinlerin kana geçmesinin başlıca yeridir.'),
Q('Safra hakkında hangisi doğrudur?', ['Karaciğerde üretilir, safra kesesinde depolanır.','Midede üretilir.','Enzimlerle nişastayı sindirir.','Yemek borusunda üretilir.'],0,'Safra karaciğerde üretilir; yağların küçük damlacıklara ayrılmasına yardımcı olur.'),
Q('Sıfır bileşke kuvvet etkisindeki hareketli bir cisim için hangisi söylenebilir?', ['Kesinlikle durur.','Sabit hızla aynı yönde hareketini sürdürebilir.','Kesinlikle hızlanır.','Kütlesi sıfır olur.'],1,'Net kuvvet sıfırsa hızdaki değişim sıfırdır; cisim zaten hareketliyse hareketini sürdürebilir.')])
add('turkce','Anlamın peşinde',[
('01 · Paragrafta ana fikir ve konu','Konu, metnin üzerinde durduğu şeydir; “Bu parçada ne anlatılıyor?” sorusuna cevap verir. Ana fikir ise yazarın vermek istediği temel mesajdır; “Ne öğrenmemi istiyor?” sorusuna yaklaşır. Başlık, metnin tamamını karşılayan kısa ifadedir. Yalnızca ilk cümleye değil, parçanın bütününe bak. Metinde olmayan bir bilgiyi kendi düşüncenle tamamlama.'),
('02 · Sözcükte anlam','Gerçek anlam, sözcüğün temel anlamı ve yaygın kullanımıdır. Mecaz anlam, sözcüğün gerçek anlamından uzaklaşmasıdır: “sıcak bir karşılama”. Terim anlam, belirli bir alanın özel sözcüğüdür: üçgenin “açısı”, tiyatronun “perdesi”. Eş anlamlı sözcükler bağlama göre aynı anlamı taşır; her bağlamda birbirinin yerine geçmeyebilir. Zıt anlam, karşıt kavramları ifade eder.'),
('03 · Yazım ve noktalama','Özel adlar büyük harfle başlar: Türkiye, Ankara, Ahmet. Dil ve millet adları da büyük harfle başlar: Türkçe, Türk. Kitap ve dergi adları özel ad olarak büyük harfle yazılır. Soru eki mı/mi ayrı yazılır: “Geldin mi?” Bağlaç olan de/da ayrı: “Sen de gel.” Hâl eki olan -de/-da bitişik: “okulda”. Tam sayılarda sıfır okunmaz: 4,307 → dört tam yüzde sıfır değil; “dört tam binde yedi”.')],[
Q('“Düzenli okumak kelime hazinemizi geliştirir ve düşüncelerimizi daha iyi表达memize yardımcı olur.” Ana fikir nedir?', ['Okumak yalnızca eğlencedir.','Düzenli okuma dil ve düşünce gelişimini destekler.','Her kitap aynı bilgiyi verir.','Okumak zaman kaybıdır.'],1,'Cümle, düzenli okumanın iki yönden faydasını vurgular.'),
Q('“Sıcak bir karşılama” ifadesindeki “sıcak” hangi anlamdadır?', ['Mecaz','Terim','Yalnızca fiziksel yüksek ısı','Zıt'],0,'Burada sıcaklık, içten ve samimi davranışı anlatır.'),
Q('Hangi cümlede “de” yanlış yazılmıştır?', ['Sen de bizimle gel.','Kitap çantamda kaldı.','Masa da çok temiz.','Bizde yağmur başladı.'],2,'“Masa da çok temiz” cümlesinde de bağlaçtır ve ayrı yazılmalıdır.'),
Q('Bir metnin başlığı seçilirken en çok neye dikkat edilir?', ['En uzun cümle olmasına','Metnin bütününü yansıtmasına','Sadece ilk sözcüğe','İçinde sayı bulunmasına'],1,'Başlık metnin genel içeriğini kısa ve uygun biçimde yansıtmalıdır.'),
Q('Hangisinde soru eki doğru yazılmıştır?', ['Bugün geldinmi?','Bugün geldin mi?','Bugüngeldin mi?','Bugün geldinmi orada?'],1,'Soru eki mı/mi her zaman ayrı yazılır.')])
notes['turkce']['sections'][2]=(notes['turkce']['sections'][2][0],notes['turkce']['sections'][2][1].split(' Tam sayılarda')[0])
quizzes['turkce'][0]=Q('“Düzenli okumak kelime hazinemizi geliştirir ve düşüncelerimizi daha iyi ifade etmemize yardımcı olur.” Ana fikir nedir?',notes['turkce']['sections'][0][1] and ['Okumak yalnızca eğlencedir.','Düzenli okuma dil ve düşünce gelişimini destekler.','Her kitap aynı bilgiyi verir.','Okumak zaman kaybıdır.'],1,'Cümle düzenli okumanın dil ve düşünce gelişimine katkısını vurgular.')
add('ingilizce','Hello! My daily life',[
('01 · Greetings and feelings','Hello = Merhaba. Good morning = Günaydın. Good evening = İyi akşamlar. How are you? = Nasılsın? I am happy / tired / excited / worried = Mutluyum / yorgunum / heyecanlıyım / endişeliyim. Nice to meet you = Tanıştığımıza memnun oldum. Bir duygu sorulduğunda “I feel …” veya “I am …” kullanabilirsin.'),
('02 · Daily routines','I get up at seven o’clock. = Saat yedide kalkarım. I have breakfast. = Kahvaltı yaparım. I go to school. = Okula giderim. I do my homework. = Ödevimi yaparım. I go to bed. = Yatarım. Saat için “at”, gün için “on”, ay için “in” kullanılır: at 8 o’clock, on Monday, in November. Geniş zamanda I/you/we/they ile fiil yalın; he/she/it ile çoğunlukla -s eki kullanılır.'),
('03 · Questions and short answers','Do you like reading? → Yes, I do. / No, I don’t. Does she play tennis? → Yes, she does. / No, she doesn’t. What time do you get up? → I get up at seven. How do you feel today? → I feel happy. Olumsuzda I don’t like …; She doesn’t like … kullanılır. Does veya doesn’t ile ana fiile tekrar -s ekleme.')],[
Q('“How are you?” sorusuna uygun cevap hangisidir?', ['I am twelve.','I am fine, thanks.','I am at school.','It is Monday.'],1,'How are you? hâl hatır sorar; I am fine, thanks uygun cevaptır.'),
Q('She ___ to school every day.', ['go','going','goes','gone'],2,'Geniş zamanda she öznesiyle go fiili goes olur.'),
Q('“I have breakfast” ne demektir?', ['Kahvaltı yaparım.','Okula giderim.','Uyurum.','Kitap okurum.'],0,'Have breakfast kahvaltı yapmak demektir.'),
Q('Do you like music? → Yes, I ___.', ['does','am','do','did'],2,'Do ile sorulan geniş zaman sorusunun kısa olumlu cevabı Yes, I do.’dur.'),
Q('Hangi eşleşme doğrudur?', ['in Monday','at Monday','on Monday','on 8 o’clock'],2,'Günlerle on kullanılır: on Monday.')])
add('secingilizce','Let’s talk!',[
('01 · Everyday expressions','Please = Lütfen. Thank you = Teşekkür ederim. You’re welcome = Bir şey değil. Excuse me = Affedersiniz. Can you help me? = Bana yardım eder misin? Can I borrow your pencil? = Kalebini ödünç alabilir miyim? Sorulara uygun ve nazik cevaplar ver: Of course. / Sure. / I’m sorry, I can’t.'),
('02 · Likes and abilities','I like drawing. = Çizim yapmayı severim. I don’t like running. = Koşmayı sevmem. I can swim. = Yüzebilirim. I can’t play the piano. = Piyano çalamam. Can ve can’t sonrası fiil yalın kullanılır. She can sing; She cans sing denmez. What can you do? = Ne yapabilirsin?'),
('03 · Mini conversations','A: What’s your favourite lesson? B: My favourite lesson is English. A: Why? B: Because it is fun. A: What do you do after school? B: I play with my friends. Kısa diyalogda önce sorunun ne istediğini belirle: favourite (en sevilen), why (neden), when (ne zaman). Cevabının soruyla aynı konuda olmasına dikkat et.')],[
Q('Can you help me?', ['Sure, of course.','I am November.','Yes, I am a pencil.','It is red.'],0,'Yardım isteğine nazik bir kabul cevabı Sure, of course.’tur.'),
Q('I can ___ English.', ['speaks','speaking','speak','spoke'],2,'Can sonrasında fiilin yalın hâli gelir.'),
Q('“My favourite lesson is science.” cümlesinde favourite ne demektir?', ['En zor','En sevilen','En uzun','En eski'],1,'Favourite, en sevilen anlamına gelir.'),
Q('Birinden kalem ödünç almak için hangisi uygundur?', ['Can I borrow your pencil?','What colour is the sky?','I am hungry.','Good night.'],0,'Borrow ödünç almak demektir; can I ile nazik izin istenir.'),
Q('Thank you! → ___', ['You’re welcome.','I am eleven.','It is Monday.','I can’t swim.'],0,'Teşekküre verilen uygun karşılık You’re welcome’dır.')])
add('arapca','Tanışma, renkler ve sayılar',[
('01 · Tanışma ifadeleri','Bu çalışma notu genel kelime tekrarındadır. مَرْحَبًا (merhaban): Merhaba. اِسْمِي (ismî): Benim adım. مَا اسْمُكَ؟ (me smuke): Erkeğe “Adın ne?” مَا اسْمُكِ؟ (me smuki): Kadına “Adın ne?”. كَيْفَ حَالُكَ؟ (keyfe hâluk): Erkeğe “Nasılsın?”. بِخَيْرٍ (bihayr): İyiyim. شُكْرًا (şükran): Teşekkürler. Arapçada hitap edilen kişinin cinsiyetine göre ifade değişebilir.'),
('02 · Renkler','أَحْمَر (ahmer): Kırmızı. أَزْرَق (ezrak): Mavi. أَخْضَر (ahdar): Yeşil. أَصْفَر (asfer): Sarı. أَبْيَض (ebyad): Beyaz. أَسْوَد (esved): Siyah. Kelimeyi Türkçe anlamı ve bir nesneyle birlikte tekrar et: mavi kalem, yeşil defter. Bu not temel eril biçimleri verir; sıfat tamlamasındaki uyumu ders kitabından kontrol et.'),
('03 · Sayılar ve çalışma yöntemi','Sıfırdan ona sayılar: صِفْر (0), وَاحِد (1), اِثْنَان (2), ثَلَاثَة (3), أَرْبَعَة (4), خَمْسَة (5), سِتَّة (6), سَبْعَة (7), ثَمَانِيَة (8), تِسْعَة (9), عَشَرَة (10). Sayıları sesli oku, ardından bakmadan yaz. Kelimeyi yalnızca tanıma değil anlamını hatırlama yönünden de test et. Sınavda işlenen ünite ve sayılar farklı olabilir.')],[
Q('“Merhaba” karşılığı hangisidir?', ['شُكْرًا','مَرْحَبًا','أَحْمَر','وَاحِد'],1,'مَرْحَبًا (merhaban), merhaba demektir.'),
Q('أَزْرَق hangi renktir?', ['Kırmızı','Sarı','Mavi','Yeşil'],2,'أَزْرَق (ezrak) mavi demektir.'),
Q('خَمْسَة hangi sayıdır?', ['3','5','8','10'],1,'خَمْسَة (hamse) beş demektir.'),
Q('“İsmî” ne demektir?', ['Benim adım','Nasılsın?','Teşekkürler','Beyaz'],0,'İsmî benim adım anlamına gelir.'),
Q('شُكْرًا ne anlama gelir?', ['Teşekkürler','Merhaba','Kırmızı','İki'],0,'Şükran teşekkür etmek için kullanılan bir ifadedir.')])
add('din','İnanç, ibadet ve güzel ahlak',[
('01 · İnanç ve hayat','İnanç, insanın tutum ve davranışlarına yön verebilir. Allah’a inanmak, sorumluluk bilinciyle davranmaya ve iyiliği seçmeye katkı sağlar. İnançla ilgili temel kavramları ders kitabındaki tanımlarıyla tekrar et. Farklı inançlara sahip insanlara saygılı davranmak birlikte yaşamanın gereğidir; kimseyi inanç veya ibadet konusunda zorlamamak önemlidir.'),
('02 · İbadet ve sorumluluk','İbadet, Allah’ın rızasını amaçlayan davranışlardır. Namaz, oruç, zekât ve hac İslam’ın temel ibadetlerindendir. İbadetlerde yaş, sağlık ve imkân gibi koşullar olabilir; ayrıntıları öğretmeninin ders notlarından kontrol et. Dua, insanın Allah ile iletişimidir. İbadeti öğrenirken yalnızca şekli değil, dürüstlük ve yardımseverlik gibi günlük hayata yansıyan yönlerini de düşün.'),
('03 · Güzel ahlak','Doğruluk, emaneti korumak, sözünde durmak, yardımseverlik ve adalet güzel davranışlardır. Bir arkadaşının sırrını izinsiz paylaşmamak güveni korur. Başkasının eşyasını izinsiz almamak emanete saygıdır. Hata yaptığında sorumluluk almak ve özür dilemek iyi bir davranıştır. Sorularda yalnızca bilgi değil, günlük hayat örneklerinde doğru tutumu seçmen de istenebilir.')],[
Q('Başkasına güvenle bırakılan ve korunması gereken eşyaya ne ad verilir?', ['Emanet','İsraf','Önyargı','Dedikodu'],0,'Emanet, korunması ve sahibine verilmesi gereken şeydir.'),
Q('Hangisi güzel ahlaka uygun bir davranıştır?', ['Sözünde durmak','Alay etmek','İzinsiz eşya almak','Yalan söylemek'],0,'Sözünde durmak güvenilirliğin göstergesidir.'),
Q('İbadet konusunda doğru yaklaşım hangisidir?', ['İnsanları zorlamak','Saygılı olmak ve öğrenmek','Alay etmek','Kimseyi dinlememek'],1,'İnanç ve ibadete saygı esastır; öğrenirken güvenilir kaynaklara başvurulur.'),
Q('Hata yaptığında en uygun davranış hangisidir?', ['Suçu başkasına atmak','Sorumluluk alıp özür dilemek','Hatayı saklamak için yalan söylemek','Kimseyle konuşmamak'],1,'Hatanın sorumluluğunu almak ve gerektiğinde özür dilemek güzel ahlaktandır.'),
Q('Hangisi İslam’ın temel ibadetlerindendir?', ['Oruç','Uyumak','Oyun oynamak','Alışveriş yapmak'],0,'Oruç, İslam’ın temel ibadetlerinden biridir.')])
add('tdb','Temel dini bilgiler',[
('01 · İnanç esasları','İslam’ın inanç esasları altı tenedir: Allah’a, meleklere, kitaplara, peygamberlere, ahiret gününe ve kaza ile kadere inanmak. Allah birdir, eşi ve benzeri yoktur. Melekler nurdan yaratılmış, gözle görülmeyen varlıklardır; Cebrail vahiy getirmekle görevlidir. İlahi kitaplar Tevrat, Zebur, İncil ve Kur’an-ı Kerim’dir; Kur’an son ilahi kitaptır ve değişmeden günümüze ulaşmıştır. Peygamberler Allah’ın seçtiği, insanlara doğru yolu gösteren elçilerdir; son peygamber Hz. Muhammed’dir. Ahiret, ölümden sonra başlayan sonsuz hayattır. Kader, Allah’ın her şeyi bilmesi ve takdir etmesi; kaza ise takdir edilenin zamanı gelince gerçekleşmesidir. İnanç, kişinin söz ve davranışlarına yön verir.'),
('02 · İslam’ın şartları','İslam’ın beş şartı vardır: kelime-i şehadet getirmek, namaz kılmak, oruç tutmak, zekât vermek ve gücü yetenler için hacca gitmek. Kelime-i şehadet, “Allah’tan başka ilah yoktur; Hz. Muhammed O’nun kulu ve elçisidir” anlamına gelir ve İslam’a girişin ilk adımıdır. Kelime-i tevhid ise “Lâ ilâhe illallah” ifadesidir. Bu beş şart, ibadetlerin ana çerçevesini oluşturur; her ibadetin kendine özgü şartları ve vakti vardır.'),
('03 · Abdest ve namaz','Namaz kılmadan önce abdest alınır. Abdest; elleri yıkamak, ağza ve burna su vermek, yüzü yıkamak, kolları dirseklere kadar yıkamak, başı mesh etmek ve ayakları topuklarla birlikte yıkamakla alınır. Su bulunmadığında veya kullanılamadığında teyemmüm yapılır. Müslümanlara günde beş vakit namaz farzdır: sabah, öğle, ikindi, akşam ve yatsı. Cuma günü öğle vakti cuma namazı kılınır. Namazın hazırlıkları arasında abdest almak, temiz yerde durmak, kıbleye yönelmek ve niyet etmek vardır. Camide mihrap imamın durduğu, minber hutbe okunan, şadırvan abdest alınan, minare ezan okunan yerdir.'),
('04 · Oruç ve Ramazan','Ramazan orucu, tan yerinin ağarmasından (imsak) güneşin batmasına (iftar) kadar yemek, içmek ve orucu bozan davranışlardan uzak durmakla tutulur. Sahur, imsaktan önce yenen yemektir. Ramazan ayında teravih namazı kılınır, Kur’an okunur ve sadaka verilir. Kadir Gecesi Ramazan içinde aranır ve bin aydan hayırlı sayılır. Ramazan Bayramı’nda fitre (zekât-ı fıtır) verilir; bayram namazı kılınır. Hastalık veya yolculuk gibi mazereti olanlar tutamadığı günleri daha sonra kaza eder; oruç tutmaya gücü yetmeyenler fidye verir.'),
('05 · Zekât, sadaka ve hac','Zekât, koşulları taşıyan Müslümanların malının belirli bir bölümünü ihtiyaç sahiplerine vermesidir. Nisap, zekât vermek için gereken en az mal miktarıdır; nakit ve ticaret malında genellikle kırkta bir, yani yüzde 2,5 oranında verilir. Zekât; fakirler, yoksullar, borçlular ve yolda kalmışlar gibi ihtiyaç sahiplerine verilir; anne, baba ve çocuklara verilmez. Sadaka ise zorunlu olmayan, miktarı serbest yardımdır; bir gülümseme bile sadaka sayılır. Hac, imkânı olan Müslümanların ömründe bir kez Kâbe’yi ziyaret etmesidir. Hacda ihrama girmek, tavaf etmek, Arafat’ta vakfe yapmak ve sa’y etmek gibi görevler vardır. Umre ise hac zamanı dışında yapılan ziyarettir.'),
('06 · Ahlak ve günlük hayat','Güzel ahlak; doğru sözlü olmak, emaneti korumak, adaletli davranmak, insanlara saygı göstermek, komşuyu gözetmek ve israftan kaçınmaktır. Anne babaya iyilik etmek, büyüklere saygı göstermek, selamlaşmak ve küçüklere sevgiyle davranmak dinin öğütlediği davranışlardır. Temizlik imanın bir parçası sayılır; beden, elbise ve çevre temizliği önemlidir. Bir olay sorusunda önce hangi değerle ilgili olduğunu düşün: yardımlaşma mı, emanet mi, adalet mi, doğruluk mu? Ayrıntılarda öğretmeninin işlediği ders kitabını esas al.')],[
Q('İslam’ın inanç esasları toplam kaç tanedir?', ['Üç','Dört','Beş','Altı'],3,'İnanç esasları: Allah’a, meleklere, kitaplara, peygamberlere, ahirete, kaza ve kadere inanmak.'),
Q('Aşağıdakilerden hangisi ilahi kitaplardan biri değildir?', ['Tevrat','Zebur','İncil','Mesnevi'],3,'İlahi kitaplar Tevrat, Zebur, İncil ve Kur’an’dır; Mesnevi bir edebiyat eseridir.'),
Q('Cebrail meleğinin görevi nedir?', ['Vahiy getirmek','Yağmur yağdırmak','Ezan okumak','Namaz kıldırmak'],0,'Cebrail, peygamberlere vahiy getirmekle görevlidir.'),
Q('Abdestte başın mesh edilmesi hangi sırada yer alır?', ['Yüz yıkandıktan sonra, ayaklardan önce','Ellerden önce','Ayaklardan sonra','En sonda'],0,'Sıra: eller, ağız-burun, yüz, kollar, başın mesh edilmesi, ayaklar.'),
Q('Günde kaç vakit namaz farzdır?', ['Üç','Dört','Beş','Altı'],2,'Sabah, öğle, ikindi, akşam ve yatsı olmak üzere beş vakittir.'),
Q('Ramazanda imsaktan önce yenen yemeğe ne ad verilir?', ['İftar','Sahur','Fitre','Teravih'],1,'İmsaktan önce yenen yemektir; oruca hazırlık olarak yenir.'),
Q('Oruç hangi vakitte açılır?', ['İmsakta','Güneş doğunca','Güneş battığında','Gece yarısında'],2,'Oruç güneş batınca, yani akşam ezanıyla açılır; buna iftar denir.'),
Q('Zekât oranı nakit ve ticaret malında genellikle kaçtır?', ['Yüzde 1','Kırkta bir (yüzde 2,5)','Yüzde 10','Yüzde 20'],1,'Nisap miktarı mala sahip olanlar kırkta bir, yani yüzde 2,5 oranında zekât verir.'),
Q('Hacda Arafat’ta yapılan bekleme ve ibadete ne ad verilir?', ['Tavaf','Sa’y','Vakfe','İhram'],2,'Arafat’ta yapılan bu bekleme ve ibadete vakfe denir.'),
Q('Komşusunun emanet olarak bıraktığı eşyayı korumak hangi değerle ilgilidir?', ['İsraf','Emanet','Kibir','Tembellik'],1,'Emaneti korumak güvenilirliğin ve güzel ahlakın gereğidir.')])
add('kuran','Okuma ve tekrar rehberi',[
('01 · Harfleri fark et','Bu rehber sınav kapsamı değildir; kişisel tekrar yöntemidir. Benzer görünen harfleri noktalarına ve şekillerine göre ayır. ب، ت، ث aynı temel forma farklı noktalara sahiptir. ج، ح، خ bir grupta; د، ذ ve ر، ز benzer şekillerde karşılaştırılabilir. Harfi tanırken adını ve okunuşunu birlikte tekrar et. Öğretmeninin kullandığı yönteme uy.'),
('02 · Harekeler ve uzatmalar','Üstün (fetha), esre (kesra) ve ötre (damme) kısa sesleri gösterir. Med harfleri belirli koşullarda sesi uzatır. Şedde harfin iki kez okunmasını gerektirir; sükûn üzerinde hareke bulunmadığını belirtir. Bu kuralların uygulamalarını yalnızca ezber tariften değil, ders kitabındaki örneklerden ve öğretmeninin okuyuşundan çalış.'),
('03 · Güvenli ve düzenli pratik','Önce kısa bir bölümü öğretmeninle dinle. Aynı bölümü yavaşça oku; takıldığın harfi işaretle. Sonra bir kez daha oku ve ilk okuyuşunla karşılaştır. İşlenen sureleri ve sayfa aralıklarını takvimine yaz. Yanlış bildiğini fark etmek başarısızlık değil, ne çalışacağını gösteren bir nottur. Uygulamadaki test genel okuma bilgisini ölçer; yüzünden okuma değerlendirmesi değildir.')],[
Q('Şedde neyi ifade eder?', ['Harfin okunmadığını','Harfin iki kez okunduğunu','Her zaman sesi uzatmayı','Nokta sayısını'],1,'Şedde, üzerinde bulunduğu harfin iki kez okunmasıyla ilgili bir işarettir.'),
Q('Sükûn neyi gösterir?', ['Harfin üzerinde hareke bulunmadığını','Harfin tekrarlandığını','Sayfanın bittiğini','Bir kelimenin anlamını'],0,'Sükûn, harekesizliği gösterir.'),
Q('ب، ت، ث harflerini ayırmada en çok neye bakılır?', ['Sayfa numarasına','Nokta sayı ve yerlerine','Kitabın rengine','Satır uzunluğuna'],1,'Bu harflerin temel formu benzer; noktaları ayırt edicidir.'),
Q('Okumada takıldığın harfle karşılaştığında en yararlı yöntem hangisidir?', ['Hiç tekrar etmemek','İşaretleyip öğretmeninle çalışmak','Sayfayı yırtmak','Rastgele okumaya devam etmek'],1,'Zorlandığın yeri belirlemek ve doğru modelle çalışmak ilerlemeyi destekler.'),
Q('Bu uygulamadaki Kur’an testi neyi değerlendirmez?', ['Şedde bilgisini','Sükûn bilgisini','Yüzünden okuma ve tecvid seslendirmesini','Çalışma yöntemini'],2,'Yazılı seçenekli test sesini dinlemez; okuma değerlendirmesi öğretmenle yapılır.')])
add('siyer','Güven ve güzel ahlak',[
('01 · Çocukluk ve gençlik','Hz. Muhammed’in çocukluk ve gençlik yıllarını anlatan olayları kronolojik olarak çalış. Doğumu, ailesi ve yetiştiği çevreyle ilgili temel bilgileri ders kitabındaki doğrultuda tekrar et. Olayı yalnızca adı ile ezberleme; hangi davranışın öne çıktığını da yaz: yardımseverlik, sabır, sorumluluk veya güvenilirlik.'),
('02 · El-Emin ve güvenilirlik','Hz. Muhammed, güvenilirliği nedeniyle “el-Emin” olarak tanınmıştır. Emaneti korumak, doğru sözlü olmak ve verilen görevi özenle yapmak güven kazandırır. Kâbe’nin onarımı sırasında Hacerülesved’in yerine konulması konusunda yaşanan anlaşmazlığın çözümünde insanların görüşlerini dikkate alan bir yaklaşım sergilemiştir. Olayın ayrıntılarını işlediğiniz kaynaktan tekrar et.'),
('03 · Aile ve toplum hayatı','Aile bireylerine karşı saygı, sevgi ve yardım günlük hayatın önemli parçalarıdır. Komşuları gözetmek, ihtiyaç sahiplerine destek olmak ve insanların hakkına dikkat etmek örnek davranışlardır. Siyer bilgisini günlük hayat sorularıyla ilişkilendir: “Bir emanet sana verilseydi nasıl davranırdın?” Tarihsel bilgi sorularında kişi, yer, olay ve zaman bağlantısını birlikte düşün.')],[
Q('“El-Emin” ne anlama gelir?', ['Güvenilir','Çok hızlı','Çok uzun','Yalnız'],0,'El-Emin, güvenilir olan anlamına gelir.'),
Q('Bir arkadaşın sana emanet ettiği kitabı ne yapmalısın?', ['İzinsiz başkasına satmalısın','Koruyup zamanında geri vermelisin','Sayfalarını koparmalısın','Saklayıp unutmalısın'],1,'Emaneti korumak ve geri vermek güvenilirliğin gereğidir.'),
Q('Siyer olaylarını çalışırken hangi yöntem daha yararlıdır?', ['Sadece rastgele tarih ezberlemek','Olayı, kişileri ve verdiği mesajı birlikte düşünmek','Hiç not almamak','Bütün olayları aynı sanmak'],1,'Olay–kişi–zaman–mesaj bağlantısı anlamayı kolaylaştırır.'),
Q('Toplum hayatında güveni artıran davranış hangisidir?', ['Sözünde durmak','Dedikodu yapmak','Emanete özensiz davranmak','Haksızlık etmek'],0,'Sözünde durmak insanlar arasında güven oluşturur.'),
Q('Hacerülesved olayında öne çıkan yaklaşım hangisidir?', ['Anlaşmazlığı büyütmek','Kimseyi dinlememek','İnsanların kabul edebileceği çözüm üretmek','Yardımdan kaçınmak'],2,'Anlaşmazlığı ortak bir çözümle gidermeye yönelik yaklaşım öne çıkar.')])
add('robotik','Algoritma atölyesi',[
('01 · Algoritma nedir?','Algoritma, bir problemi çözmek veya bir işi yapmak için sıralanmış adımlardır. Diş fırçalamayı veya sandviç hazırlamayı adım adım tarif etmeyi düşün. Adımlar açık, anlaşılır ve doğru sırada olmalıdır. Akış şemasında genellikle elips başlangıç/bitişi, dikdörtgen işlemi, eşkenar dörtgen kararı ve oklar akış yönünü gösterir.'),
('02 · Döngüler','Döngü, tekrar eden işlemleri daha kısa ifade etmeyi sağlar. “4 kez-repeat: 10 adım git, sağa dön” karesel bir yol oluşturabilir. Döngüde hangi komutların tekrarlanacağını ve kaç kez çalışacağını belirle. Döngü kullanmak, komutların her seferinde yeniden yazılmasını azaltır; fakat tekrar sayısını yanlış seçmek hedefe ulaşmayı engelleyebilir.'),
('03 · Koşullar ve hata ayıklama','Koşul, bir durum doğruysa farklı işlem yapılmasını sağlar: “Eğer engel varsa dur, değilse ilerle.” Değişken, değer saklamak için kullanılır: puan = 0; doğru cevapta puanı 1 artır. Hata ayıklama (debugging), programı küçük parçalar hâlinde inceleyip beklenmeyen adımı bulmaktır. Kullandığın blok uygulamasındaki gerçek komut adlarını ders notlarınla eşleştir.')],[
Q('Bir işi yapmak için sıralanan açık adımlara ne denir?', ['Algoritma','Ekran','Dosya','Klasör'],0,'Algoritma, hedefe ulaşmak için sıralanan adımlardır.'),
Q('“5 kez ileri git” ifadesinde hangi yapı vardır?', ['Koşul','Döngü','Rastgelelik','Giriş hatası'],1,'Aynı işlemin beş kez tekrarlanması döngüdür.'),
Q('“Eğer yağmur varsa şemsiye al” hangi yapıya örnektir?', ['Koşul','Sonsuz döngü','Değişken silme','Çıktı aygıtı'],0,'Eylem, yağmur olma koşuluna bağlanmıştır.'),
Q('Akış şemasında karar genellikle hangi şekille gösterilir?', ['Dikdörtgen','Elips','Eşkenar dörtgen','Daire olmayan yıldız'],2,'Eşkenar dörtgen, karar/koşul adımı için yaygın kullanılır.'),
Q('Program beklediğin gibi çalışmıyorsa ilk yararlı adım nedir?', ['Hepsini silmek','Adımları sırayla kontrol etmek','Hiç test etmemek','Ekranı kapatıp unutmak'],1,'Hata ayıklamada adımları sırayla incelemek sorunun yerini bulmaya yardım eder.')])

# Correct wording and make the mock exam a standalone resource.
resources=[]
subjects=json.loads(re.search(r'window.KAMP_DATA = (\{.*\});', (ROOT/'web'/'data.js').read_text(),re.S).group(1).replace("'",'"')) if False else None
subject_info={
'matematik':('Matematik','#EAF0F9'),'sosyal':('Sosyal Bilgiler','#FFF0E2'),'fen':('Fen Bilimleri','#EDF3E7'),'turkce':('Türkçe','#F9E9E9'),'ingilizce':('İngilizce','#F0ECF9'),'secingilizce':('Seçmeli İngilizce','#F0ECF9'),'arapca':('Arapça','#EDF3E7'),'din':('Din Kültürü','#E8F3EE'),'tdb':('Temel Dini Bilgiler','#E8F3EE'),'kuran':('Kur’an-ı Kerim','#E8F3EE'),'siyer':('Peygamberimizin Hayatı','#FFF0E2'),'robotik':('Robotik Kodlama','#EAF0F9')}
for key,note in notes.items():
    resources.append({'id':key+'-not','subject':key,'title':subject_info[key][0]+' · Konu özeti','subtitle':note['title'],'type':'Konu özeti','verified':note['verified'],'file':key+'-not.pdf'})
resources.insert(1,{'id':'matematik-deneme','subject':'matematik','title':'Matematik · Hazırlık denemesi','subtitle':'12 soru + ayrıntılı cevap anahtarı','type':'Deneme','verified':True,'file':'matematik-deneme.pdf'})
resources.insert(3,{'id':'sosyal-deneme','subject':'sosyal','title':'Sosyal Bilgiler · Mini deneme','subtitle':'6 soru + ayrıntılı cevap anahtarı','type':'Deneme','verified':True,'file':'sosyal-deneme.pdf'})

class PDF:
    def __init__(self,path,title):
        self.c=canvas.Canvas(str(path),pagesize=A4);self.c.setTitle(title);self.c.setAuthor('Sınav Kampı · Özgün çalışma notları');self.y=H-130;self.page=1
        self.c.setFillColor(LIGHT);self.c.rect(0,H-99,W,99,fill=1,stroke=0)
        self.c.setFillColor(ORANGE);self.c.setFont('Bold',11);self.c.drawString(M,H-37,'SINAV KAMPI  /  6. SINIF')
        self.c.setFillColor(INK);self.c.setFont('Bold',21);self.c.drawString(M,H-72,title[:54])
    def ensure(self,h):
        if self.y-h<60: self.footer();self.c.showPage();self.page+=1;self.y=H-60
    def footer(self):
        self.c.setStrokeColor(HexColor('#E3E8DC'));self.c.line(M,43,W-M,43)
        self.c.setFillColor(MUTED);self.c.setFont('Sans',7);self.c.drawString(M,29,'Sınav Kampı · Kişisel hazırlık · Okulunun konu dağılımını esas al.');self.c.drawRightString(W-M,29,str(self.page))
    def para(self,text,style=body):
        p=Paragraph(shape_arabic(text),style);_,h=p.wrap(CW,2000);self.ensure(h+4);p.drawOn(self.c,M,self.y-h);self.y-=h+6
    def section(self,title,text):
        self.ensure(85);self.para(escape(title),head);self.para(escape(text))
    def box(self,text):
        p=Paragraph(shape_arabic(escape(text)),small);_,h=p.wrap(CW-24,2000);self.ensure(h+20)
        self.c.setFillColor(LIGHT);self.c.roundRect(M,self.y-h-16,CW,h+16,7,fill=1,stroke=0);p.drawOn(self.c,M+12,self.y-h-8);self.y-=h+30
    def save(self):self.footer();self.c.save()

scope_true='KAPSAM: Paylaştığın 6. sınıf 1. dönem 1. yazılı konu dağılımına göre hazırlanmış özgün çalışma notu. Resmî MEB sınavı veya resmî cevap anahtarı değildir.'
scope_false='KAPSAM NOTU: Bu dersin sınav konu dağılımı paylaşılmadı. Bu belge genel 6. sınıf tekrarıdır; okulunun işlediği konuları garanti etmez. Önce öğretmeninin dağılımıyla karşılaştır.'
for key,note in notes.items():
    pdf=PDF(OUT/(key+'-not.pdf'),subject_info[key][0]+' · Konu özeti')
    pdf.box(scope_true if note['verified'] else scope_false)
    for title,text in note['sections']:pdf.section(title,text)
    pdf.section('Kendine sor · Aktif hatırlama','Bu konuyu bir arkadaşına nasıl anlatırsın? Kitaba bakmadan iki örnek verebilir misin? En çok hangi adımda zorlanıyorsun? Yanlışlarını bir sonraki çalışmada tekrar çözmeyi unutma.')
    pdf.box('ÇALIŞMA RUTİNİ: 15–25 dakika konu tekrarı → 5 dakika mola → 10 dakika soru → yanlışları işaretle. Anlamadığın yeri öğretmenine sor. 10 dakikalık bildirim, çalışmaya dönmen için bir hatırlatmadır; her bildirimde yeni sınava başlama.')
    pdf.save()

for key,id in [('matematik','matematik-deneme'),('sosyal','sosyal-deneme')]:
    pdf=PDF(OUT/(id+'.pdf'),subject_info[key][0]+' · Deneme')
    pdf.box('Özgün hazırlık denemesidir; resmî sınav değildir. Önce cevaplara bakmadan çöz. Matematik için 30, Sosyal için 15 dakika önerilir. Bu uygulama denemesi resmî sınav süresi değildir. Cevaplar ve açıklamalar son bölümde.')
    for i,q in enumerate(quizzes[key],1):
        pdf.section(f'Soru {i}',q['q'])
        pdf.para('<br/>'.join(f'{chr(65+j)}) {escape(opt)}' for j,opt in enumerate(q['options'])))
    pdf.c.showPage();pdf.page+=1;pdf.y=H-60
    pdf.para('Cevap anahtarı ve çözümler',head)
    for i,q in enumerate(quizzes[key],1):
        pdf.section(f'{i}. soru · Doğru cevap: {chr(65+q["answer"])}',q['explanation'])
    pdf.save()

# A4 personal schedule.
pdf=PDF(OUT/'sinav-takvimi.pdf','Sınav takvimim · Kasım 2026')
pdf.box('Kaynak: OrtakokulSinav.PDF — okul geneli ortak yazılı sınav takvimi. 6. sınıf için geçerli ortak sınavlar gösterilir. Tek sınav olan günlerde 2. ders saati esas alınmıştır; sınav süresi 40 dakikadır.')
rows=[('3 Kasım Salı','2. ders','Fen Bilimleri'),('6 Kasım Cuma','2. ders','Sosyal Bilgiler'),('10 Kasım Salı','2. ders (okul planlamasına göre 4. ders olabilir)','Türkçe'),('11 Kasım Çarşamba','2. ders','Matematik — ülke geneli ortak yazılı'),('12 Kasım Perşembe','2. ders','İngilizce'),('13 Kasım Cuma','2. ders','Din Kültürü ve Ahlak Bilgisi')]
for date,period,lesson in rows:pdf.section(date+' · '+period,lesson)
pdf.box('Not: 6. sınıf Matematik sınavı, ülke geneli ortak yazılı kapsamında 11 Kasım 2026 Çarşamba günü yapılır. 10 Kasım sınavları okul müdürlüğünün planlamasına göre 4. ders saatinde uygulanabilir. İhtiyaç hâlinde farklı ders saati kullanılabilir; güncel okul duyurusunu esas al.')
pdf.save()
resources.append({'id':'sinav-takvimi','subject':'takvim','title':'Kişisel sınav takvimim','subtitle':'3–13 Kasım 2026 · 6. sınıf ortak sınavlar','type':'Takvim','verified':True,'file':'sinav-takvimi.pdf'})
(ROOT/'web'/'content.js').write_text('window.KAMP_CONTENT = '+json.dumps({'resources':resources,'notes':notes,'quizzes':quizzes},ensure_ascii=False)+';\n')
print(f'Created {len(resources)} PDFs and {sum(map(len,quizzes.values()))} quiz questions.')
