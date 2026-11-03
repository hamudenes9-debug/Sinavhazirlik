/* Takvim: OrtakokulSinav.PDF — okul geneli / ülke geneli ortak yazılılar.
 * 6. sınıf için geçerli ortak sınavlar. Tek sınav olan günlerde 2. ders saati esas alınır;
 * 10 Kasım için okul planlamasına göre 4. ders saati notu ayrıca gösterilir. */
window.KAMP_DATA = {
 subjects: {
  fen: {name:'Fen Bilimleri', short:'Fen', color:'green', icon:'flask', verified:false, topics:['Destek ve hareket sistemi','Kuvvet ve hareket','Sindirim sistemi'], note:'Genel tekrar notudur. Okulunun konu dağılımı henüz paylaşılmadı.'},
  matematik: {name:'Matematik', short:'Mat', color:'blue', icon:'calculator', verified:true, topics:['Çarpanlar ve katlar','Bölünebilme ve asal sayılar','Olasılık','Ondalık gösterim'], note:'Paylaştığın MEB konu dağılımı ve örnek sınavlara göre hazırlandı.'},
  sosyal: {name:'Sosyal Bilgiler', short:'Sos', color:'orange', icon:'globe', verified:true, topics:['Gruplar ve roller','Kültür ve millî değerler','Toplumsal sorunlar','Kıtalar ve okyanuslar'], note:'Paylaştığın Senaryo 4 konu dağılımına göre: 1 + 2 + 2 + 1 soru.'},
  turkce: {name:'Türkçe', short:'Tür', color:'rose', icon:'book', verified:false, topics:['Paragrafta anlam','Sözcükte anlam','Yazım ve noktalama'], note:'Genel tekrar notudur. Okulunun konu dağılımı henüz paylaşılmadı.'},
  ingilizce: {name:'İngilizce', short:'İng', color:'purple', icon:'chat', verified:false, topics:['Greetings and feelings','Daily routines','Present simple'], note:'Genel tekrar notudur. Üniteleri öğretmeninin dağılımıyla karşılaştır.'},
  secingilizce: {name:'Seçmeli İngilizce', short:'S.İng', color:'purple', icon:'chat', verified:false, topics:['Everyday expressions','Vocabulary','Short dialogues'], note:'Genel konuşma ve kelime tekrarıdır; seçmeli ders konu dağılımı paylaşılmadı.'},
  arapca: {name:'Arapça', short:'Ara', color:'green', icon:'language', verified:false, topics:['التعارف — tanışma','الألوان — renkler','الأرقام — sayılar'], note:'Genel kelime tekrarıdır; kesin sınav kapsamı değildir.'},
  din: {name:'Din Kültürü ve Ahlak Bilgisi', short:'Din', color:'teal', icon:'moon', verified:false, topics:['İnanç ve ibadet','Güzel ahlak','Din ve hayat'], note:'Genel tekrar notudur. Okulunun konu dağılımı henüz paylaşılmadı.'},
  tdb: {name:'Temel Dini Bilgiler', short:'TDB', color:'teal', icon:'moon', verified:false, topics:['İnanç esasları','İbadetler','Günlük hayatta güzel davranışlar'], note:'Genel tekrar notudur; ders kitabının işlenen bölümlerini esas al.'},
  kuran: {name:'Kur’an-ı Kerim', short:'Kur’an', color:'teal', icon:'book', verified:false, topics:['Harflerin okunuşu','Bağlama ve okuma','Kısa surelerin tekrarı'], note:'Genel çalışma planıdır. İşlenen sure ve sayfa aralığını öğretmeninden doğrula.'},
  siyer: {name:'Peygamber Efendimizin Hayatı', short:'Peyg.', color:'orange', icon:'sun', verified:false, topics:['Çocukluk ve gençlik','Güvenilirlik','Aile ve toplum hayatı'], note:'Genel siyer tekrarıdır; sınav kapsamındaki olayları ders notlarınla eşleştir.'},
  robotik: {name:'Robotik Kodlama', short:'Rob', color:'blue', icon:'code', verified:false, topics:['Algoritmalar','Sıralı adımlar','Döngüler ve koşullar'], note:'Genel algoritma tekrarıdır. Kullanılan program veya robot kitini kapsamına göre çalış.'}
 },
 exams: [
  {id:'fen-0311',subject:'fen',date:'2026-11-03',period:2,common:true},
  {id:'sosyal-0611',subject:'sosyal',date:'2026-11-06',period:2,common:true},
  {id:'turkce-1011',subject:'turkce',date:'2026-11-10',period:2,common:true,periodNote:'Okul planlamasına göre 4. ders saatinde de uygulanabilir.'},
  {id:'matematik-1111',subject:'matematik',date:'2026-11-11',period:2,common:true,note:'6. sınıf matematik sınavı ülke geneli ortak yazılı kapsamında 11 Kasım 2026 Çarşamba günü yapılır.'},
  {id:'ingilizce-1211',subject:'ingilizce',date:'2026-11-12',period:2,common:true},
  {id:'din-1311',subject:'din',date:'2026-11-13',period:2,common:true}
 ]
};
