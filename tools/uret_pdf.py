# -*- coding: utf-8 -*-
"""PDF uretici - Sinav Kampi hazirlik dokumanlari."""
import os
import re
import json
import random

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph,
                                Spacer, Table, TableStyle, KeepTogether, PageBreak,
                                CondPageBreak)

from icerik import (DERSLER, SINAVLAR, PLAN, PDFLER, OKUL, SINIF, DONEM)

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DV", os.path.join(FONT_DIR, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DVB", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFontFamily("DV", normal="DV", bold="DVB", italic="DV", boldItalic="DVB")

CIKTI = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                     "pdf")
os.makedirs(CIKTI, exist_ok=True)

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4b5563")
LINE = colors.HexColor("#d1d5db")
SOFT = colors.HexColor("#f3f4f6")


def md(text):
    """**kalin** -> <b>kalin</b>, guvenli escape."""
    text = (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)


ss = getSampleStyleSheet()


def st(name, **kw):
    base = dict(fontName="DV", fontSize=10, leading=14.2, textColor=INK,
                spaceAfter=3)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "h1": st("h1", fontName="DVB", fontSize=21, leading=25, textColor=colors.white),
    "sub": st("sub", fontSize=10.5, leading=14, textColor=colors.HexColor("#e5e7eb")),
    "h2": st("h2", fontName="DVB", fontSize=14, leading=18, spaceBefore=10, spaceAfter=6),
    "h3": st("h3", fontName="DVB", fontSize=11, leading=15, spaceBefore=8, spaceAfter=3),
    "body": st("body"),
    "bullet": st("bullet", leftIndent=11, bulletIndent=2, spaceAfter=3.2),
    "small": st("small", fontSize=8.6, leading=11.8, textColor=MUTED),
    "q": st("q", fontName="DVB", fontSize=10, leading=14, spaceBefore=2),
    "opt": st("opt", fontSize=9.6, leading=13),
    "ans": st("ans", fontSize=9.4, leading=13, leftIndent=10),
    "center": st("center", alignment=TA_CENTER),
}


class Doc(BaseDocTemplate):
    def __init__(self, path, baslik, renk, altbaslik="", **kw):
        self.baslik = baslik
        self.renk = colors.HexColor(renk)
        self.altbaslik = altbaslik
        BaseDocTemplate.__init__(self, path, pagesize=A4,
                                 leftMargin=19 * mm, rightMargin=19 * mm,
                                 topMargin=34 * mm, bottomMargin=17 * mm,
                                 title=baslik, author="Sınav Kampı", **kw)
        frame = Frame(self.leftMargin, self.bottomMargin,
                      self.width, self.height, id="f")
        self.addPageTemplates([PageTemplate(id="p", frames=[frame],
                                            onPage=self._deco)])

    def _deco(self, c, doc):
        w, h = A4
        c.saveState()
        c.setFillColor(self.renk)
        c.rect(0, h - 26 * mm, w, 26 * mm, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("DVB", 15)
        c.drawString(19 * mm, h - 13 * mm, self.baslik)
        c.setFont("DV", 9)
        if self.altbaslik:
            c.drawString(19 * mm, h - 19.5 * mm, self.altbaslik)
        c.setFont("DV", 7.6)
        c.setFillColor(colors.HexColor("#ffffff"))
        c.drawRightString(w - 19 * mm, h - 19.5 * mm, "SINAV KAMPI · 6. SINIF")
        # footer
        c.setFillColor(MUTED)
        c.setFont("DV", 7.6)
        c.drawString(19 * mm, 10 * mm, "Sınav Kampı · 1. Dönem 1. Yazılı Hazırlık")
        c.drawRightString(w - 19 * mm, 10 * mm, "Sayfa %d" % doc.page)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.5)
        c.line(19 * mm, 13 * mm, w - 19 * mm, 13 * mm)
        c.restoreState()


def pill(text, renk):
    t = Table([[Paragraph(text, st("pl", fontName="DVB", fontSize=8.4,
                                   textColor=colors.HexColor(renk), leading=12))]],
              colWidths=[None])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(renk).clone(alpha=0.10)),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor(renk).clone(alpha=0.45)),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def kutu(story, renk="#eef2ff", kenar="#c7d2fe"):
    return story


def info_box(icerik, renk="#4f46e5"):
    t = Table([[icerik]], colWidths=[None])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(renk).clone(alpha=0.08)),
        ("LINEBEFORE", (0, 0), (0, -1), 2.4, colors.HexColor(renk)),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return t


# ---------------------------------------------------------------- ders PDF'i
def ders_pdf(d, dosya, ek_baslik=None, alt_dersler=None):
    renk = d["renk"]
    path = os.path.join(CIKTI, dosya)
    doc = Doc(path, ek_baslik or d["ad"], renk,
              "%s · 1. Dönem 1. Yazılı Hazırlık" % SINIF)
    f = []
    f.append(Paragraph("Özet + Mini Test", S["h2"]))
    f.append(Paragraph(md(d["sinav_notu"]), S["body"]))
    f.append(Spacer(1, 4))
    f.append(pill("Bu PDF'i yazdır, sınavdan önce son 30 dakikada tekrar et.", renk))
    f.append(Spacer(1, 8))

    f.append(Paragraph("Kazanımlar (ne sorulacak?)", S["h2"]))
    rows = [[Paragraph("<b>Kod</b>", S["small"]), Paragraph("<b>Kazanım</b>", S["small"])]]
    for k in d["kazanimlar"]:
        rows.append([Paragraph(k["kod"], S["small"]), Paragraph(md(k["metin"]), S["body"])])
    t = Table(rows, colWidths=[27 * mm, None])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), SOFT),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    f.append(t)

    f.append(Paragraph("Konu Özeti", S["h2"]))
    for i, n in enumerate(d["notlar"]):
        blok = [Paragraph(n["b"], S["h3"])]
        for m in n["m"]:
            blok.append(Paragraph(md(m), S["bullet"], bulletText="•"))
        f.append(KeepTogether(blok) if len(n["m"]) <= 3 else blok[0])
        if len(n["m"]) > 3:
            f.extend(blok[1:])

    ipucu = [Paragraph("Püf Noktaları / Sık Yapılan Hatalar", S["h3"])]
    for x in d["ipuclari"]:
        ipucu.append(Paragraph(md(x), S["bullet"], bulletText="✔"))
    f.append(Spacer(1, 6))
    f.append(info_box(ipucu, renk))
    f.append(Spacer(1, 2))

    # alt dersler (orn. Ingilizce + secmeli)
    if alt_dersler:
        for ad, alt in alt_dersler:
            f.append(Paragraph(ad, S["h2"]))
            for n in alt["notlar"]:
                f.append(Paragraph(n["b"], S["h3"]))
                for m in n["m"]:
                    f.append(Paragraph(md(m), S["bullet"], bulletText="•"))
            for x in alt["ipuclari"]:
                f.append(Paragraph(md(x), S["bullet"], bulletText="✔"))

    # ---- mini test
    sorular = list(d["quiz"])
    if alt_dersler:
        for _, alt in alt_dersler:
            sorular.extend(alt["quiz"])
    f.append(CondPageBreak(70 * mm))
    f.append(Paragraph("Mini Test (%d soru)" % len(sorular), S["h2"]))
    f.append(Paragraph("Her soruyu işaretleyerek çöz, süre tut: soru başına 45 saniye.", S["small"]))
    f.append(Spacer(1, 6))
    for i, q in enumerate(sorular, 1):
        blok = [Paragraph("%d. %s" % (i, md(q["s"])), S["q"])]
        opts = []
        for j, o in enumerate(q["o"]):
            opts.append(Paragraph("<b>%s)</b> %s" % ("ABCD"[j], md(o)), S["opt"]))
        inner = Table([[opts[0], opts[1]], [opts[2], opts[3]]],
                      colWidths=[83 * mm, 83 * mm])
        inner.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 1.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
        ]))
        blok.append(inner)
        blok.append(Spacer(1, 7))
        f.append(KeepTogether(blok))

    f.append(PageBreak())
    f.append(Paragraph("Cevap Anahtarı ve Çözümler", S["h2"]))
    for i, q in enumerate(sorular, 1):
        f.append(KeepTogether([
            Paragraph("%d. Doğru cevap: <b>%s</b>" % (i, "ABCD"[q["d"]]), S["body"]),
            Paragraph(md(q["a"]), S["ans"]),
            Spacer(1, 5),
        ]))
    f.append(Spacer(1, 8))
    f.append(info_box(Paragraph(
        "Not: Bu doküman Sınav Kampı uygulamasıyla birlikte çalışır. "
        "Uygulamadaki mini testler senin yanlışlarını takip eder.", S["small"]), renk))
    doc.build(f)
    print("ok:", dosya)


# ---------------------------------------------------------------- kamp PDF'i
def kamp_pdf():
    path = os.path.join(CIKTI, "00-kamp-programi-ve-calisma-plani.pdf")
    doc = Doc(path, "SINAV KAMPI · 1. Dönem 1. Yazılı", "#4f46e5",
              "Çalışma programı · 12 sınav · 2-13 Kasım 2026")
    f = []
    f.append(Paragraph("Hoş geldin. 12 sınav, 12 gün.", S["h2"]))
    f.append(Paragraph(
        "Bu program %s 6. sınıf 1. dönem 1. ortak sınav takvimine göre hazırlandı. "
        "Toplam <b>12 sınav</b> var; ilki <b>3 Kasım Salı (Fen Bilimleri)</b>, sonuncusu "
        "<b>13 Kasım Cuma (Din Kültürü ve Ahlak Bilgisi)</b>. Her gün 45-100 dakika "
        "yeterli — önemli olan her gün çalışmak." % OKUL, S["body"]))
    f.append(Spacer(1, 6))
    f.append(info_box([Paragraph("<b>3 altın kural</b>", S["body"]),
                       Paragraph("1) Bildirimi aç: her 10 dakikada geri sayım çalsın.", S["body"]),
                       Paragraph("2) Çalışırken telefonu uçak moduna al, sadece bu PDF'i kullan.", S["body"]),
                       Paragraph("3) Yanlış yaptığın soruları ayrı bir deftere yaz; sınavdan önce sadece o defteri oku.", S["body"])]))

    f.append(Paragraph("Sınav Takvimi (6. Sınıf)", S["h2"]))
    rows = [[Paragraph("<b>Tarih</b>", S["small"]), Paragraph("<b>Saat</b>", S["small"]),
             Paragraph("<b>Ders</b>", S["small"])]]
    for s in SINAVLAR:
        d = DERSLER[s["ders"]]
        rows.append([Paragraph(s["gun"], S["body"]), Paragraph(s["saat"], S["body"]),
                     Paragraph("<b>%s</b>" % d["ad"], S["body"])])
    t = Table(rows, colWidths=[48 * mm, 20 * mm, None], repeatRows=1)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"),
             ("BACKGROUND", (0, 0), (-1, 0), SOFT),
             ("GRID", (0, 0), (-1, -1), 0.4, LINE),
             ("LEFTPADDING", (0, 0), (-1, -1), 5),
             ("TOPPADDING", (0, 0), (-1, -1), 3.4),
             ("BOTTOMPADDING", (0, 0), (-1, -1), 3.4)]
    for i, s in enumerate(SINAVLAR, 1):
        c = colors.HexColor(DERSLER[s["ders"]]["renk"]).clone(alpha=0.10)
        style.append(("BACKGROUND", (0, i), (-1, i), c))
    t.setStyle(TableStyle(style))
    f.append(t)

    f.append(PageBreak())
    f.append(Paragraph("Gün Gün Çalışma Planı", S["h2"]))
    for p in PLAN:
        blok = [Paragraph("%s · %s" % (p["gun"], p["baslik"]), S["h3"]),
                Paragraph("Süre: <b>%s</b>" % p["sure"], S["small"])]
        for m in p["maddeler"]:
            blok.append(Paragraph(md(m), S["bullet"], bulletText="□"))
        f.append(KeepTogether(blok))
        f.append(Spacer(1, 4))

    f.append(PageBreak())
    f.append(Paragraph("Sınav Kampı Kuralları", S["h2"]))
    kurallar = [
        "**Bildirim:** Uygulamada 'Bildirimi aç' düğmesine bas. Her 10 dakikada bir geri sayım bildirimi gelir: 'Yarın Fen Bilimleri sınavın var'.",
        "**Pomodoro:** 25 dakika çalış, 5 dakika mola. Uygulamadaki odak sayacını kullan.",
        "**Aktif tekrar:** Özeti okuduktan sonra kitabı kapat, kendi cümlelerinle anlat.",
        "**Soru çözmeden bitirme:** Her konu sonunda mini testi çöz. Yanlışını ancak çözümü anlayınca geç.",
        "**Uyku:** Sınavdan önceki gece en az 7 saat uyu. Gece çalışması ezberi bozar.",
        "**Sınav sabahı:** 10 dakika 'Son 30 Dakika Kartları' PDF'ine bak, yeni konu açma.",
        "**Sınav anında:** Önce kolay soruları çöz, işlem basamaklarını yaz, süreyi böl (40 dk → 8 dk kontrol).",
    ]
    for k in kurallar:
        f.append(Paragraph(md(k), S["bullet"], bulletText="•"))

    f.append(Spacer(1, 8))
    f.append(Paragraph("Motivasyon", S["h2"]))
    f.append(info_box([Paragraph(
        "“Küçük bir adım, her gün atıldığında büyük bir fark yaratır.” "
        "12 sınavın hepsi bittiğinde bu sayfaya geri dön ve kendinle gurur duy. "
        "Başarılar! 🎯", S["body"])], "#059669"))
    doc.build(f)
    print("ok: 00-kamp-programi-ve-calisma-plani.pdf")


# ------------------------------------------------- matematik cozumlu ornekler
ORNEK_SINAVLAR = [
    {"ad": "Örnek Sınav 1", "puanlar": [10, 10, 15, 15, 15, 15, 10, 10], "sorular": [
        ("36 sayısının bütün çarpanlarını yaz. Bu çarpanlardan hangileri 4'ün katıdır?",
         ["36'nın çarpanları: 1, 2, 3, 4, 6, 9, 12, 18, 36. (5 puan)",
          "4'ün katı olanlar: 4, 12, 36. (5 puan)",
          "İpucu: çarpanları 1×36, 2×18, 3×12, 4×9, 6×6 şeklinde çiftler hâlinde yazarsan hiçbirini kaçırmazsın."]),
        ("Üç basamaklı 4▲2 sayısı 3 ile tam bölünebiliyor. ▲ yerine yazılabilecek rakamlar?",
         ["3 ile bölünebilme: rakamlar toplamı 3'ün katı olmalı. (3 puan)",
          "4 + ▲ + 2 = 6 + ▲ → 6'nın üzerine eklenen ▲ 3'ün katı olmalı. (4 puan)",
          "▲ = 0, 3, 6, 9. (3 puan)"]),
        ("84 sayısını asal çarpanlarına ayır ve çarpım şeklinde yaz.",
         ["84 ÷ 2 = 42, 42 ÷ 2 = 21, 21 ÷ 3 = 7, 7 ÷ 7 = 1. (8 puan)",
          "84 = 2 × 2 × 3 × 7 = 2² × 3 × 7. (7 puan)"]),
        ("36 kırmızı, 48 beyaz boncuk; renkler karışmayacak, artmayacak, her grupta eşit ve en çok boncuk olacak. Bir gruptaki boncuk sayısı ve grup sayısı?",
         ["Bu bir EBOB problemidir. EBOB(36, 48) = 12. (7 puan)",
          "Bir grupta 12 boncuk. (4 puan)",
          "36 ÷ 12 + 48 ÷ 12 = 3 + 4 = 7 grup. (4 puan)"]),
        ("Kırmızı ışık 6 saniyede, mavi ışık 8 saniyede bir yanıyor. İlk 1 dakikada kaç kez birlikte yanarlar?",
         ["EKOK(6, 8) = 24 → her 24 saniyede birlikte yanar. (8 puan)",
          "60 saniye içinde 24 ve 48 → 2 kez. (7 puan)",
          "Dikkat: 'yeniden' dediği için başlangıçtaki birlikte yanma sayılmaz."]),
        ("50 denemede mavi bilye 22 kez çekildi. Mavi çekmenin deneysel olasılığı (kesir ve yüzde)?",
         ["Deneysel olasılık = 22/50. (5 puan)",
          "22/50 = 11/25. (5 puan)",
          "44/100 = %44. (5 puan)"]),
        ("4,307 sayısındaki 3 rakamının basamak değeri? Sayıyı paydası 10, 100, 1000 olan kesirlerin toplamı şeklinde yaz.",
         ["3 onda birler basamağında → basamak değeri 0,3 = 3/10. (5 puan)",
          "4,307 = 4 + 3/10 + 0/100 + 7/1000. (5 puan)"]),
        ("7/8 ve 5/6 kesirlerinin ondalık gösterimini bölerek bul. Hangisi devirlidir?",
         ["7 ÷ 8 = 0,875 (4 puan)",
          "5 ÷ 6 = 0,8333... = 0,83 (devirli) (3 puan)",
          "Devirli olan 5/6'dır. (3 puan)"]),
    ]},
    {"ad": "Örnek Sınav 2", "puanlar": [15, 10, 10, 15, 10, 15, 10, 15], "sorular": [
        ("24 kurabiye, her pakette eşit ve 1'den fazla, en az 2 paket. Bir pakette kaç kurabiye olabilir? Kaç farklı paketleme?",
         ["24'ün çarpanları: 1, 2, 3, 4, 6, 8, 12, 24. (6 puan)",
          "1'den fazla ve en az 2 paket → paket başına 2, 3, 4, 6, 8, 12. (5 puan)",
          "6 farklı paketleme. (4 puan)"]),
        ("73▲ sayısı 10 ile tam bölünüyor. ▲ kaç? Sayı 3 ile bölünür mü?",
         ["10 ile bölünme: birler basamağı 0 → ▲ = 0. (4 puan)",
          "730: 7 + 3 + 0 = 10, 10 3'ün katı değil → 3 ile bölünmez. (6 puan)"]),
        ("1, 2, 9, 17, 21, 29, 39, 41 içinden asal olanlar; 1 neden asal değil?",
         ["Asal olanlar: 2, 17, 29, 41. (6 puan)",
          "1'in yalnızca bir böleni (kendisi) vardır; asal sayının iki farklı böleni olmalıdır. (4 puan)"]),
        ("6 ve 8 saniyede yanan ışıklar: ilk 1 dakikada kaç kez birlikte?",
         ["EKOK(6,8) = 24 (6 puan)", "24 ve 48 → 2 kez (9 puan)"]),
        ("12 ile 18'in ortak bölenleri; 4 ile 6'nın 40'tan küçük ortak katları?",
         ["Ortak bölenler: 1, 2, 3, 6 (5 puan)",
          "Ortak katlar: 12, 24, 36 (5 puan)"]),
        ("Ece 17/25, Can 14/20 başarılı. Deneysel olasılıkları yüzde olarak bul; kim daha başarılı?",
         ["Ece: 17/25 = 68/100 = %68 (5 puan)",
          "Can: 14/20 = 70/100 = %70 (5 puan)",
          "Can daha başarılı (5 puan)"]),
        ("Bir atlet 100 m'yi 12,48 saniyede koştu. Onda birler basamağına yuvarla; 8'in basamak değeri?",
         ["12,48 → onda birler basamağına yuvarlama: 12,5 (sağdaki 8 ≥ 5). (5 puan)",
          "8 yüzde birler basamağında → 0,08 = 8/100. (5 puan)"]),
        ("5 litre ayran 4 bardağa, 2 kg peynir 3 kişiye eşit. Kesir ve ondalık gösterim?",
         ["Ayran: 5/4 = 1,25 L (10 puan)", "Peynir: 2/3 = 0,666... ≈ 0,67 kg (5 puan)"]),
    ]},
    {"ad": "Örnek Sınav 3", "puanlar": [15, 15, 15, 15, 10, 10, 10, 10], "sorular": [
        ("7'nin 50-80 arası katları; hangileri 2'nin de katı?",
         ["7'nin katları: 56, 63, 70, 77 (10 puan)", "2'nin de katı olanlar: 56 ve 70 (5 puan)"]),
        ("2▲4 öğrenci 6'şar gruplara ayrılıyor, artmıyor. ▲ kaç olabilir?",
         ["6 ile bölünme: hem 2 hem 3 ile bölünmeli. Birler basamağı 4 (çift) → 2 şartı tamam. (5 puan)",
          "2 + ▲ + 4 = 6 + ▲ → ▲ 3'ün katı olmalı. (5 puan)",
          "▲ = 0, 3, 6, 9. (5 puan)"]),
        ("90'ın asal çarpanları; en büyük ve en küçük asal çarpanın toplamı?",
         ["90 = 2 × 3 × 3 × 5 (5 puan)", "Asal çarpanlar: 2, 3, 5 (5 puan)", "En küçük 2, en büyük 5 → 7 (5 puan)"]),
        ("36 kırmızı ve 48 beyaz boncuk: bir grupta en çok kaç boncuk, kaç grup?",
         ["EBOB(36,48) = 12 (5 puan)", "Bir grupta 12 boncuk (5 puan)", "36 ÷ 12 + 48 ÷ 12 = 7 grup (5 puan)"]),
        ("12 ile 18'in ortak bölenleri; 4 ile 6'nın 40'tan küçük ortak katları?",
         ["1, 2, 3, 6 (5 puan)", "12, 24, 36 (5 puan)"]),
        ("Madenî para 40 kez atıldı, 18 tura. Tura ve yazı olasılıkları (en sade kesir)?",
         ["Tura: 18/40 = 9/20 (5 puan)", "Yazı: 22/40 = 11/20 (5 puan)"]),
        ("2,05 ; 2,5 ; 2,055 ; 2,045 sırala; nasıl karşılaştırdın?",
         ["Basamakları eşitle: 2,050 ; 2,500 ; 2,055 ; 2,045 (5 puan)",
          "2,045 < 2,05 < 2,055 < 2,5 (5 puan)"]),
        ("0,363636... sayısını devir çizgisiyle yaz; 1,27 sayısının açınımını yaz.",
         ["0,3636... = 0,36 (36 üzerinde çizgi) (5 puan)", "1,27 = 1 + 2/10 + 7/100 = 1,2777... değil dikkat: 1,27 ondalık açınımı 1 + 0,2 + 0,07 (5 puan)"]),
    ]},
]


def mat_cozum_pdf():
    d = DERSLER["matematik"]
    path = os.path.join(CIKTI, "03-matematik-cozumlu-ornek-sinavlar.pdf")
    doc = Doc(path, "MATEMATİK · Çözümlü Örnek Sınavlar", d["renk"],
              "MEB senaryosuna uygun 3 örnek sınav · adım adım çözüm")
    f = []
    f.append(Paragraph(
        "Bu PDF, MEB'in 6. sınıf 1. dönem 1. yazılı için yayımladığı 3 örnek sınavın "
        "sorularını ve çözümlerini içerir. Her sınav 8 soru ve 100 puandır. "
        "Önce soruları <b>süre tutarak</b> çöz, sonra çözümleri oku.", S["body"]))
    f.append(Spacer(1, 6))
    f.append(info_box(Paragraph(
        "Kural: işlem gerektiren sorularda basamakları yazmayan öğrenci tam puan almaz. "
        "Her sorunun puan dağılımını çözümde göreceksin — sınavda hangi adımın kaç puan "
        "olduğunu bilmek strateji kazandırır.", S["small"]), d["renk"]))
    for i, o in enumerate(ORNEK_SINAVLAR):
        f.append(PageBreak() if i else Spacer(1, 10))
        f.append(Paragraph("%s · Sorular ve Çözümler" % o["ad"], S["h2"]))
        f.append(Paragraph("Puan dağılımı: " + " · ".join(
            "%d. soru %d" % (j + 1, p) for j, p in enumerate(o["puanlar"])), S["small"]))
        f.append(Spacer(1, 5))
        for j, (soru, cozum) in enumerate(o["sorular"], 1):
            blok = [Paragraph("%d. %s <font color='#6b7280'>(%d puan)</font>"
                              % (j, md(soru), o["puanlar"][j - 1]), S["q"])]
            for c in cozum:
                blok.append(Paragraph(md(c), S["ans"], bulletText="→"))
            blok.append(Spacer(1, 6))
            f.append(KeepTogether(blok))
    doc.build(f)
    print("ok: 03-matematik-cozumlu-ornek-sinavlar.pdf")


# ---------------------------------------------------------------- genel test
def genel_pdf():
    rnd = random.Random(6116)
    havuz = []
    for did, d in DERSLER.items():
        for q in d["quiz"]:
            havuz.append((d["ad"], q))
    rnd.shuffle(havuz)
    secili = havuz[:40]
    path = os.path.join(CIKTI, "10-genel-tekrar-40-soru.pdf")
    doc = Doc(path, "GENEL TEKRAR · 40 SORU", "#0f172a",
              "Tüm derslerden karışık deneme · cevap anahtarı dahil")
    f = [Paragraph("40 soruluk genel tekrar denemesi", S["h2"]),
         Paragraph("Süre: 40 dakika. Her doğru 2,5 puan. Yanlışlarını not al ve "
                   "ilgili dersin özet PDF'ine dön.", S["body"]), Spacer(1, 6)]
    for i, (ad, q) in enumerate(secili, 1):
        blok = [Paragraph("%d. <font color='#6b7280' size='8'>[%s]</font> %s"
                          % (i, ad, md(q["s"])), S["q"])]
        opts = [Paragraph("<b>%s)</b> %s" % ("ABCD"[j], md(o)), S["opt"])
                for j, o in enumerate(q["o"])]
        inner = Table([[opts[0], opts[1]], [opts[2], opts[3]]],
                      colWidths=[83 * mm, 83 * mm])
        inner.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                   ("LEFTPADDING", (0, 0), (-1, -1), 8),
                                   ("TOPPADDING", (0, 0), (-1, -1), 1.2),
                                   ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2)]))
        blok.append(inner)
        blok.append(Spacer(1, 6))
        f.append(KeepTogether(blok))
    f.append(PageBreak())
    f.append(Paragraph("Cevap Anahtarı", S["h2"]))
    rows, row = [], []
    for i, (ad, q) in enumerate(secili, 1):
        row.append(Paragraph("<b>%d.</b> %s" % (i, "ABCD"[q["d"]]), S["body"]))
        if len(row) == 5:
            rows.append(row)
            row = []
    if row:
        rows.append(row + [Paragraph("", S["body"])] * (5 - len(row)))
    t = Table(rows, colWidths=[None] * 5)
    t.setStyle(TableStyle([("GRID", (0, 0), (-1, -1), 0.4, LINE),
                           ("TOPPADDING", (0, 0), (-1, -1), 3),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
    f.append(t)
    f.append(Spacer(1, 10))
    f.append(Paragraph("Kısa Çözümler", S["h2"]))
    for i, (ad, q) in enumerate(secili, 1):
        f.append(Paragraph("%d. <b>%s</b> — %s" % (i, "ABCD"[q["d"]], md(q["a"])), S["ans"]))
    doc.build(f)
    print("ok: 10-genel-tekrar-40-soru.pdf")


# ---------------------------------------------------------------- kartlar
def kartlar_pdf():
    path = os.path.join(CIKTI, "11-son-30-dakika-tekrar-kartlari.pdf")
    doc = Doc(path, "SON 30 DAKİKA · TEKRAR KARTLARI", "#b91c1c",
              "Sınavdan hemen önce bakılacak kısa notlar")
    f = [Paragraph("Sınav sabahı sadece bu sayfalara bak. Yeni konu açma!", S["body"]),
         Spacer(1, 8)]
    for did in ["fen", "matematik", "sosyal", "turkce", "arapca",
                "secmeli-ingilizce", "kuran", "peygamber", "temel-dini",
                "ingilizce", "din"]:
        d = DERSLER[did]
        items = []
        for x in d["ipuclari"]:
            items.append(Paragraph(md(x), S["bullet"], bulletText="•"))
        for n in d["notlar"][:2]:
            items.append(Paragraph("<b>%s:</b> %s" % (n["b"], md(n["m"][0])),
                                   S["bullet"], bulletText="•"))
        f.append(KeepTogether([Paragraph(d["ad"], S["h3"])] + items))
        f.append(Spacer(1, 6))
    f.append(PageBreak())
    f.append(Paragraph("Sınav anında 5 kural", S["h2"]))
    for x in ["Ad-soyad ve sınıf alanlarını ilk 1 dakikada doldur.",
              "Tüm soruları bir kez oku, kolay olanlardan başla.",
              "İşlem basamaklarını yaz; sonucu kutu içine al.",
              "Sürenin son 8 dakikasını kontrole ayır (virgül, birim, işaret).",
              "Boş bırakma: emin değilsen en mantıklı seçeneği işaretle."]:
        f.append(Paragraph(x, S["bullet"], bulletText="□"))
    doc.build(f)
    print("ok: 11-son-30-dakika-tekrar-kartlari.pdf")


# ---------------------------------------------------------------- data.js
def data_js():
    dersler = []
    for s in SINAVLAR:
        d = DERSLER[s["ders"]]
        pdfler = []
        for pid in {
            "fen": ["01-fen"], "arapca": ["06-arapca"],
            "secmeli-ingilizce": ["07-ing"], "matematik": ["02-mat", "03-mat-cozum"],
            "matematik-2": ["02-mat", "03-mat-cozum"],
            "temel-dini": ["08-din"], "sosyal": ["05-sos"], "kuran": ["09-kuran"],
            "peygamber": ["08-din"], "turkce": ["04-tur"], "ingilizce": ["07-ing"],
            "din": ["08-din"],
        }[s["id"]]:
            pdfler.append(next(p for p in PDFLER if p["id"] == pid))
        dersler.append({
            "id": s["id"],
            "dersId": d["id"],
            "ad": d["ad"],
            "kisa": d["kisa"],
            "emoji": d["emoji"],
            "renk": d["renk"],
            "tarih": s["tarih"],
            "gun": s["gun"],
            "saat": s["saat"],
            "sinavNotu": d["sinav_notu"],
            "kazanimlar": d["kazanimlar"],
            "notlar": d["notlar"],
            "ipuclari": d["ipuclari"],
            "quiz": d["quiz"],
            "pdfler": pdfler,
        })
    veri = {
        "okul": OKUL, "sinif": SINIF, "donem": DONEM,
        "guncelleme": "2026-11-02",
        "sinavlar": dersler,
        "plan": PLAN,
        "pdfler": PDFLER,
        "mebOrnek": {"dosya": "6-sinif-matematik-meb-ornek-sinav.pdf",
                     "ad": "MEB 6. Sınıf Matematik Örnek Sınav (resmî PDF)",
                     "emoji": "📄"},
    }
    yol = os.path.join(os.path.dirname(CIKTI), "js", "data.js")
    with open(yol, "w", encoding="utf-8") as fh:
        fh.write("/* Otomatik üretildi: tools/uret_pdf.py */\n")
        fh.write("window.KAMP = ")
        json.dump(veri, fh, ensure_ascii=False, indent=1)
        fh.write(";\n")
    print("ok: js/data.js", len(dersler), "sinav")


if __name__ == "__main__":
    for pid, dosya, ad in [
        ("fen", "01-fen-bilimleri-ozet-test.pdf", None),
        ("matematik", "02-matematik-ozet-test.pdf", None),
        ("turkce", "04-turkce-ozet-test.pdf", None),
        ("sosyal", "05-sosyal-bilgiler-ozet-test.pdf", None),
        ("arapca", "06-arapca-ozet-test.pdf", None),
    ]:
        ders_pdf(DERSLER[pid], dosya, ad)
    ders_pdf(DERSLER["ingilizce"], "07-ingilizce-ve-secmeli-ozet-test.pdf",
             "İNGİLİZCE + SEÇMELİ İNGİLİZCE",
             [("Seçmeli İngilizce · Ek Tekrar", DERSLER["secmeli-ingilizce"])])
    ders_pdf(DERSLER["din"], "08-din-kulturu-ve-siyer-ozet-test.pdf",
             "DİN KÜLTÜRÜ + SİYER + TEMEL DİNİ BİLGİLER",
             [("Peygamber Efendimizin Hayatı (Siyer)", DERSLER["peygamber"]),
              ("Temel Dini Bilgiler · Ek Tekrar", DERSLER["temel-dini"])])
    ders_pdf(DERSLER["kuran"], "09-kuran-i-kerim-ozet-test.pdf", None)
    kamp_pdf()
    mat_cozum_pdf()
    genel_pdf()
    kartlar_pdf()
    data_js()
