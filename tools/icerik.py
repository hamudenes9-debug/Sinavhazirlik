# -*- coding: utf-8 -*-
"""Sinav Kampi - icerik verisi (sinav takvimi, planlama, PDF tanimlari)."""

from dersler_a import FEN, MATEMATIK, TURKCE, SOSYAL
from dersler_b import (INGILIZCE, SECMELI, DIN, TEMEL_DINI, KURAN, PEYGAMBER,
                       ARAPCA, ROBOTIK)

DERSLER = {d["id"]: d for d in [FEN, MATEMATIK, TURKCE, SOSYAL, INGILIZCE,
                                SECMELI, DIN, TEMEL_DINI, KURAN, PEYGAMBER,
                                ARAPCA, ROBOTIK]}

OKUL = "Şehit Abdullah Tayyip Olçok İmam Hatip Ortaokulu"
SINIF = "6. Sınıf"
DONEM = "2026-2027 Eğitim Öğretim Yılı · 1. Dönem 1. Ortak Sınavlar"

# 6. sinif satirlari (PDF takviminden cikarilmistir)
SINAVLAR = [
    {"id": "fen", "tarih": "2026-11-03", "gun": "3 Kasım 2026 Salı", "saat": "2. ders", "saat_sirasi": 2, "ders": "fen"},
    {"id": "arapca", "tarih": "2026-11-04", "gun": "4 Kasım 2026 Çarşamba", "saat": "3. ders", "saat_sirasi": 3, "ders": "arapca"},
    {"id": "secmeli-ingilizce", "tarih": "2026-11-04", "gun": "4 Kasım 2026 Çarşamba", "saat": "5. ders", "saat_sirasi": 5, "ders": "secmeli-ingilizce"},
    {"id": "matematik", "tarih": "2026-11-05", "gun": "5 Kasım 2026 Perşembe", "saat": "2. ders", "saat_sirasi": 2, "ders": "matematik"},
    {"id": "temel-dini", "tarih": "2026-11-05", "gun": "5 Kasım 2026 Perşembe", "saat": "4. ders", "saat_sirasi": 4, "ders": "temel-dini"},
    {"id": "sosyal", "tarih": "2026-11-06", "gun": "6 Kasım 2026 Cuma", "saat": "2. ders", "saat_sirasi": 2, "ders": "sosyal"},
    {"id": "kuran", "tarih": "2026-11-09", "gun": "9 Kasım 2026 Pazartesi", "saat": "3. ders", "saat_sirasi": 3, "ders": "kuran"},
    {"id": "peygamber", "tarih": "2026-11-09", "gun": "9 Kasım 2026 Pazartesi", "saat": "5. ders", "saat_sirasi": 5, "ders": "peygamber"},
    {"id": "turkce", "tarih": "2026-11-10", "gun": "10 Kasım 2026 Salı", "saat": "4. ders", "saat_sirasi": 4, "ders": "turkce"},
    {"id": "matematik-2", "tarih": "2026-11-11", "gun": "11 Kasım 2026 Çarşamba", "saat": "2. ders", "saat_sirasi": 2, "ders": "matematik"},
    {"id": "ingilizce", "tarih": "2026-11-12", "gun": "12 Kasım 2026 Perşembe", "saat": "2. ders", "saat_sirasi": 2, "ders": "ingilizce"},
    {"id": "din", "tarih": "2026-11-13", "gun": "13 Kasım 2026 Cuma", "saat": "2. ders", "saat_sirasi": 2, "ders": "din"},
]

# Gunluk calisma plani (bugun 2 Kasim 2026 Pazartesi)
PLAN = [
    {"tarih": "2026-11-02", "gun": "2 Kasım Pazartesi", "baslik": "Kamp başlıyor: Fen Bilimleri",
     "sure": "75 dk", "maddeler": [
        "Fen özet PDF'ini oku (Güneş sistemi + tutulmalar + destek-hareket) — 25 dk",
        "8 soruluk mini testi çöz, yanlışlarını not al — 15 dk",
        "Gezegen sıralaması ve tutulma farklarını yüksek sesle tekrar et — 10 dk",
        "Uygulamadaki Fen tekrar kartlarını çöz — 10 dk",
        "Çantanı hazırla: kalem, silgi, cetvel. 22:30'da uyu — 5 dk"]},
    {"tarih": "2026-11-03", "gun": "3 Kasım Salı", "baslik": "Fen sınavı + Arapça & Seç. İngilizce",
     "sure": "60 dk", "maddeler": [
        "Sabah 10 dk: tutulmalar ve gezegen sırası hızlı tekrar",
        "Sınavdan sonra Arapça harf-hareke tekrarı — 20 dk",
        "Arapça selamlaşma/tanışma kalıplarını yaz — 10 dk",
        "Seçmeli İngilizce kelime listesi + Simple Present — 20 dk",
        "Uyumadan önce yarınki Matematik için çarpan-bölen tekrarı — 10 dk"]},
    {"tarih": "2026-11-04", "gun": "4 Kasım Çarşamba", "baslik": "Arapça/İng. sınavı + Matematik günü",
     "sure": "90 dk", "maddeler": [
        "Matematik özet PDF'i: çarpan, bölünebilme, asal çarpan — 30 dk",
        "EBOB-EKOK problem tipini 5 örnekle çöz — 20 dk",
        "Ondalık gösterim + yuvarlama + sıralama tekrarı — 15 dk",
        "MEB örnek sınav 1'i süre tutarak çöz (40 dk) — zaman varsa",
        "Yarın Temel Dini Bilgiler için iman-İslam şartları — 10 dk"]},
    {"tarih": "2026-11-05", "gun": "5 Kasım Perşembe", "baslik": "Matematik + Temel Dini Bilgiler sınavı",
     "sure": "60 dk", "maddeler": [
        "Sabah 10 dk: bölünebilme kuralları kartları",
        "Sınavda işlem basamaklarını mutlaka yaz",
        "Akşam: Sosyal Bilgiler özeti (gruplar, roller, kültürel bağlar) — 25 dk",
        "Sosyal mini test + konum bilgileri (enlem-boylam) — 25 dk"]},
    {"tarih": "2026-11-06", "gun": "6 Kasım Cuma", "baslik": "Sosyal Bilgiler sınavı + hafta sonu planı",
     "sure": "45 dk", "maddeler": [
        "Sosyal sınavından sonra 30 dk dinlen",
        "Kur'an-ı Kerim: sure bilgileri ve kısa surelerin anlamı — 25 dk",
        "Siyer: 571-610-622 tarihleri ve ilk Müslümanlar — 20 dk",
        "Hafta sonu için Türkçe konu listesini gözden geçir"]},
    {"tarih": "2026-11-07", "gun": "7 Kasım Cumartesi", "baslik": "Türkçe maratonu (1. tur)",
     "sure": "100 dk", "maddeler": [
        "Türkçe özet PDF'i: sözcükte/cümlede anlam — 35 dk",
        "Ad, sıfat, zamir konu tekrarı + örnekler — 25 dk",
        "Deyim ve atasözü çalışması — 15 dk",
        "Mini testi çöz ve yanlış analizi yap — 20 dk",
        "25 dk mola + yürüyüş"]},
    {"tarih": "2026-11-08", "gun": "8 Kasım Pazar", "baslik": "Türkçe + Kuran/Siyer dönüşümlü",
     "sure": "90 dk", "maddeler": [
        "Türkçe: paragrafta anlam ve ana fikir soruları — 30 dk",
        "Kur'an-ı Kerim sure-ayet sayıları tekrar — 20 dk",
        "Siyer ahlak özellikleri ve örnek olaylar — 15 dk",
        "Genel tekrar 40 soruluk deneme PDF'inden Türkçe bölümü — 25 dk"]},
    {"tarih": "2026-11-09", "gun": "9 Kasım Pazartesi", "baslik": "Kuran + Siyer sınavı, akşam Türkçe",
     "sure": "60 dk", "maddeler": [
        "Sabah: kısa surelerin anlamı ve tecvid kuralları hızlı bakış",
        "Akşam: Türkçe yazım-noktalama son tekrar — 20 dk",
        "Türkçe mini test yanlışlarını yeniden çöz — 20 dk",
        "Yarın için erken uyu (sınav 4. ders)"]},
    {"tarih": "2026-11-10", "gun": "10 Kasım Salı", "baslik": "Türkçe sınavı + Matematik 2. tur",
     "sure": "70 dk", "maddeler": [
        "Akşam: Matematik 2. sınavı için MEB örnek sınav 2 ve 3'ü çöz — 40 dk",
        "Olasılık (deneysel) ve devirli ondalık tekrarı — 15 dk",
        "Yanlış yaptığın soruların çözümünü tekrar oku — 15 dk"]},
    {"tarih": "2026-11-11", "gun": "11 Kasım Çarşamba", "baslik": "Matematik sınavı + İngilizce",
     "sure": "50 dk", "maddeler": [
        "Akşam: İngilizce günlük rutinler (Simple Present, -s eki) — 20 dk",
        "Yiyecek-içecek kelimeleri + would like kalıbı — 15 dk",
        "Kısa reading paragrafı çöz — 15 dk"]},
    {"tarih": "2026-11-12", "gun": "12 Kasım Perşembe", "baslik": "İngilizce sınavı + Din Kültürü",
     "sure": "45 dk", "maddeler": [
        "Akşam: ilahi kitaplar - peygamber eşleştirmesi — 15 dk",
        "Namazın şartları ve rükünleri ayrımı — 15 dk",
        "Din Kültürü mini testi çöz — 15 dk"]},
    {"tarih": "2026-11-13", "gun": "13 Kasım Cuma", "baslik": "Son sınav: Din Kültürü — kamp tamam! 🎉",
     "sure": "20 dk", "maddeler": [
        "Sabah 10 dk: kitap-peygamber eşleştirmesi hızlı tekrar",
        "Sınavdan sonra kendini ödüllendir 🎉",
        "Bir sonraki dönem için yanlış defterini sakla"]},
]

PDFLER = [
    {"id": "00-kamp", "dosya": "00-kamp-programi-ve-calisma-plani.pdf", "ad": "Sınav Kampı Programı ve Çalışma Planı", "emoji": "🗓️", "aciklama": "12 sınav, gün gün çalışma planı, bildirim ve motivasyon kuralları."},
    {"id": "01-fen", "dosya": "01-fen-bilimleri-ozet-test.pdf", "ad": "Fen Bilimleri · Özet + Mini Test", "emoji": "🔬", "aciklama": "Güneş sistemi, tutulmalar, destek-hareket + 8 soru ve cevap anahtarı."},
    {"id": "02-mat", "dosya": "02-matematik-ozet-test.pdf", "ad": "Matematik · Özet + Mini Test", "emoji": "➗", "aciklama": "MAT.6.1.1-6 kazanımları, formüller, tuzaklar + 12 soru."},
    {"id": "03-mat-cozum", "dosya": "03-matematik-cozumlu-ornek-sinavlar.pdf", "ad": "Matematik · 3 Örnek Sınav Çözümlü", "emoji": "🧮", "aciklama": "MEB senaryosundaki 3 örnek sınavın soruları ve adım adım çözümleri."},
    {"id": "04-tur", "dosya": "04-turkce-ozet-test.pdf", "ad": "Türkçe · Özet + Mini Test", "emoji": "📖", "aciklama": "Sözcük/cümle anlam, ad-sıfat-zamir, yazım-noktalama + test."},
    {"id": "05-sos", "dosya": "05-sosyal-bilgiler-ozet-test.pdf", "ad": "Sosyal Bilgiler · Özet + Mini Test", "emoji": "🌍", "aciklama": "SB.6.1.1 / 6.1.2 / 6.1.3 / 6.2.1 kazanımları ve test."},
    {"id": "06-arapca", "dosya": "06-arapca-ozet-test.pdf", "ad": "Arapça · Özet + Mini Test", "emoji": "🔤", "aciklama": "Harfler, harekeler, selamlaşma, kelime listesi."},
    {"id": "07-ing", "dosya": "07-ingilizce-ve-secmeli-ozet-test.pdf", "ad": "İngilizce + Seçmeli İngilizce", "emoji": "🇬🇧", "aciklama": "Life & Yummy Breakfast üniteleri, mini test."},
    {"id": "08-din", "dosya": "08-din-kulturu-ve-siyer-ozet-test.pdf", "ad": "Din Kültürü + Siyer · Özet + Test", "emoji": "🕌", "aciklama": "İlahi kitaplar, peygamberlik, namaz, Mekke dönemi."},
    {"id": "09-kuran", "dosya": "09-kuran-i-kerim-ozet-test.pdf", "ad": "Kur'an-ı Kerim · Özet + Test", "emoji": "📗", "aciklama": "Sure bilgileri, kısa surelerin anlamı, tecvid temelleri."},
    {"id": "10-genel", "dosya": "10-genel-tekrar-40-soru.pdf", "ad": "Genel Tekrar · 40 Soru", "emoji": "🎯", "aciklama": "Tüm derslerden karışık 40 soru + cevap anahtarı."},
    {"id": "11-kartlar", "dosya": "11-son-30-dakika-tekrar-kartlari.pdf", "ad": "Son 30 Dakika Tekrar Kartları", "emoji": "⚡", "aciklama": "Sınavdan önce bakılacak kısa notlar, tuzaklar, ezber listesi."},
]

# Ders bazli PDF eslestirmesi (sinav -> pdf id)
SINAV_PDF = {
    "fen": ["01-fen"],
    "matematik": ["02-mat", "03-mat-cozum", "meb-ornek"],
    "matematik-2": ["02-mat", "03-mat-cozum", "meb-ornek"],
    "turkce": ["04-tur"],
    "sosyal": ["05-sos"],
    "arapca": ["06-arapca"],
    "secmeli-ingilizce": ["07-ing"],
    "ingilizce": ["07-ing"],
    "kuran": ["09-kuran"],
    "peygamber": ["08-din"],
    "din": ["08-din"],
    "temel-dini": ["08-din"],
}

# Genel tekrar PDF'i icin soru havuzu: (ders, soru)
GENEL_SORULAR = []
