from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

# ============================================
# EDIT TEKS DI SINI SESUAI GAYA KALIAN
# ============================================

OPENING_TITLE = "Selamat Ulang Tahun, Sayang 🎂"
OPENING_TEXT = (
    "Hari ini spesial banget — hari lahirnya orang yang paling berarti buat aku. "
    "Aku bikin sesuatu buat kamu. Bukan cuma ucapan ultah biasa… "
    "tapi ada satu hal yang pengen aku tanyain di akhir. "
    "Baca pelan-pelan ya, sayang."
)

GALLERY_TITLE = "Kenangan Kita 📸"
GALLERY_SUB = "Beberapa momen yang nggak pernah aku lupa"

GALLERY_PHOTOS = [
    {"image": "assets/foto1.jpg", "emoji": "💗", "caption": "Ke bukit Padang"},
    {"image": "assets/foto2.jpg", "emoji": "🌸", "caption": "Pariaman 2"},
    {"image": "assets/foto3.jpg", "emoji": "✨", "caption": "Nonton Supermannn"},
]

LETTER_TITLE = "Surat Buat Kamu 💌"
LETTER_SUB = "Aku tulis ini pakai tangan sendiri. Klik amplopnya ya…"

# File scan tulisan tangan kamu
LETTER_IMAGE = "assets/surat.jpg"

# Fallback teks kalau gambar surat nggak ada
LETTER_TEXT_FALLBACK = (
    "Hai sayang…\n\n"
    "Selamat ulang tahun. Aku nggak tahu harus mulai dari mana, "
    "tapi yang jelas aku bersyukur banget kamu lahir ke dunia ini.\n\n"
    "Aku sadar aku bukan orang yang sempurna. Aku minta maaf untuk semua salahku. "
    "Aku janji bakal berusaha jadi lebih baik.\n\n"
    "Kalau kamu masih mau kasih kesempatan, aku nggak akan sia-siain. "
    "Tapi kalau nggak, aku tetap doain yang terbaik buat kamu. 🤍"
)

QUESTION = "Mau balikan sama aku nggak?"

YES_MESSAGE = (
    "Yeay! 🥳 Makasih udah kasih kesempatan kedua. "
    "Ini kado ultah paling indah buat aku. "
    "Aku janji bakal lebih baik. Aku sayang kamu 💗"
)

NO_MESSAGE_TITLE = "Aku Ngerti…"
NO_MESSAGE = (
    "Makasih udah baca sampai sini. Aku ngerti keputusanmu, dan aku hormati. "
    "Aku nggak akan maksa atau bikin kamu ngerasa bersalah. "
    "Aku tetap sayang kamu, kok. Kalau suatu hari kamu berubah pikiran, "
    "aku masih di sini. Tapi kalau nggak, aku tetap doain yang terbaik buat kamu. "
    "Selamat ulang tahun, sayang. 🤍"
)

NO_TAUNTS = [
    "Yakin nih? 🥺",
    "Beneran nggak? 🥹",
    "Please… 🥺👉👈",
    "Aku udah siapin ini loh… 😢",
    "Terakhir nih, yakin? 💔",
]

# Kartu interaktif 
LOVE_CARDS = [
    {"emoji": "💗", "front": "Alasan #1", "back": "Senyummu bikin hari aku selalu cerah"},
    {"emoji": "🌸", "front": "Alasan #2", "back": "Kamu selalu ada pas aku butuh"},
    {"emoji": "✨", "front": "Alasan #3", "back": "Kamu bikin aku pengen jadi lebih baik"},
    {"emoji": "🤍", "front": "Alasan #4", "back": "Karena kamu, ya kamu. Nggak ada yang lain"},
]


@app.route("/")
def home():
    return render_template(
        "index.html",
        opening_title=OPENING_TITLE,
        opening_text=OPENING_TEXT,
        gallery_title=GALLERY_TITLE,
        gallery_sub=GALLERY_SUB,
        gallery_photos=GALLERY_PHOTOS,
        letter_title=LETTER_TITLE,
        letter_sub=LETTER_SUB,
        letter_image=LETTER_IMAGE,
        letter_text_fallback=LETTER_TEXT_FALLBACK,
        question=QUESTION,
        yes_message=YES_MESSAGE,
        no_message_title=NO_MESSAGE_TITLE,
        no_message=NO_MESSAGE,
        no_taunts=NO_TAUNTS,
        love_cards=LOVE_CARDS,
        tahun=datetime.now().year,
    )
if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1", port=5000)