/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('button, .envelope, .love-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ============================================
   FLOATING HEARTS
   ============================================ */
const heartsContainer = document.getElementById('floatingHearts');
const heartEmojis = ['💗', '💖', '💕', '💞', '💓', '🤍', '💘'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
  heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}

for (let i = 0; i < 15; i++) {
  setTimeout(spawnHeart, i * 400);
}
setInterval(spawnHeart, 1500);

/* ============================================
   SHOOTING STARS
   ============================================ */
const shootingStarsContainer = document.getElementById('shootingStars');

function spawnShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.left = Math.random() * 80 + 20 + '%';
  star.style.top = Math.random() * 50 + '%';
  const duration = (Math.random() * 2 + 2);
  star.style.animationDuration = duration + 's';
  star.style.animationFillMode = 'forwards';
  shootingStarsContainer.appendChild(star);
  setTimeout(() => star.remove(), duration * 1000 + 500);
}

setTimeout(spawnShootingStar, 2000);
setInterval(() => {
  spawnShootingStar();
  if (Math.random() > 0.5) {
    setTimeout(spawnShootingStar, 500);
  }
}, 3500);

/* ============================================
   STAGE NAVIGATION
   ============================================ */
const stageOpening = document.getElementById('stageOpening');
const stageGallery = document.getElementById('stageGallery');
const stageLetter = document.getElementById('stageLetter');
const stageQuestion = document.getElementById('stageQuestion');
const stageYes = document.getElementById('stageYes');
const stageNo = document.getElementById('stageNo');

function showStage(stage) {
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
  stage.classList.add('active');
  stage.scrollTop = 0;
}

/* ============================================
   TYPEWRITER OPENING
   ============================================ */
const typeEl = document.getElementById('typewriter');
const typeText = typeEl.dataset.text || "";
let typeIdx = 0;

function typeWriter() {
  if (typeIdx < typeText.length) {
    typeEl.textContent += typeText.charAt(typeIdx);
    typeIdx++;
    setTimeout(typeWriter, 35);
  }
}
setTimeout(typeWriter, 600);

/* ============================================
   TOMBOL NAVIGASI (Lanjut & Kembali)
   ============================================ */
document.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.goto;
    const target = document.getElementById(targetId);
    if (!target) return;
    showStage(target);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f7a1b5', '#b8a4e3', '#ffd6e0'],
        scalar: 0.8
      });
    }
  });
});

/* ============================================
   AMPLOP SURAT
   ============================================ */
const envelope = document.getElementById('envelope');
const letterFallback = document.getElementById('letterFallback');
const letterImage = document.getElementById('letterImage');
const letterNextBtn = document.getElementById('letterNextBtn');
const letterText = window.LETTER_TEXT || "";
let envelopeOpened = false;

// Kalau gambar surat nggak ada, tampilkan fallback teks
letterImage.addEventListener('error', () => {
  letterFallback.style.display = 'block';
  letterFallback.textContent = letterText;
});

envelope.addEventListener('click', () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  // Kalau gambar nggak load, pakai fallback teks
  if (letterImage.complete && letterImage.naturalWidth === 0) {
    letterFallback.style.display = 'block';
    letterFallback.textContent = letterText;
  }

  envelope.classList.add('opened');

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#f7a1b5', '#b8a4e3', '#ffd6e0'],
      scalar: 0.9
    });
  }

  setTimeout(() => {
    letterNextBtn.classList.remove('hidden');
    letterNextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});

/* ============================================
   NO BUTTON LOGIC
   ============================================ */
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const tauntMsg = document.getElementById('tauntMsg');
const taunts = window.NO_TAUNTS || [
  "Yakin nih? 🥺",
  "Beneran nggak? 🥹",
  "Please… 🥺👉👈",
  "Terakhir nih, yakin? 💔",
];

let noClickCount = 0;
let noStage = 0;

const noTexts = ["No 💔", "No 🥺", "Yakin? 🥹", "Please… 🥺👉👈", "Jangan… 💔"];

function handleNoClick(e) {
  e.preventDefault();
  e.stopPropagation();

  noClickCount++;

  const taunt = taunts[Math.min(noClickCount - 1, taunts.length - 1)];
  tauntMsg.textContent = taunt;

  const noText = noTexts[Math.min(noClickCount, noTexts.length - 1)];
  noBtn.textContent = noText;

  if (noStage === 0) {
    noBtn.classList.add('tiny');
    noStage = 1;
  } else if (noStage === 1) {
    noBtn.classList.remove('tiny');
    noBtn.classList.add('tinier', 'floating');
    moveNoButtonRandom();
    noStage = 2;
  } else if (noStage === 2) {
    moveNoButtonRandom();
    noStage = 3;
  } else if (noStage === 3) {
    noBtn.classList.add('gone');
    noStage = 4;
    tauntMsg.textContent = "Yah, tombolnya udah nggak ada… tinggal pilih Yes kan? 😏💗";
    yesBtn.classList.add('pulse');
  } else if (noStage === 4) {
    showStage(stageNo);
    return;
  }

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 15,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#f7a1b5', '#b8a4e3', '#ffd6e0'],
      scalar: 0.6
    });
  }
}

function moveNoButtonRandom() {
  const padding = 100;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  const randomX = Math.max(padding, Math.random() * maxX);
  const randomY = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
  noBtn.style.right = 'auto';
  noBtn.style.bottom = 'auto';
}

noBtn.addEventListener('click', handleNoClick);

noBtn.addEventListener('mouseenter', () => {
  if (noStage >= 2 && noStage < 4) {
    moveNoButtonRandom();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'n' && noStage >= 4) {
    showStage(stageNo);
  }
});

/* ============================================
   YES BUTTON
   ============================================ */
yesBtn.addEventListener('click', () => {
  showStage(stageYes);

  if (typeof confetti === 'function') {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ['#f7a1b5', '#b8a4e3', '#ffd6e0', '#e3d5ff', '#ffb3c6'];

    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
        colors: colors,
        scalar: 1.2
      });
    }, 300);
  }

  const yesMessageEl = document.getElementById('yesMessage');
  const yesText = yesMessageEl.dataset.text || "Yeay! 🥳";
  yesMessageEl.textContent = '';
  let yesIdx = 0;

  function typeYes() {
    if (yesIdx < yesText.length) {
      yesMessageEl.textContent += yesText.charAt(yesIdx);
      yesIdx++;
      setTimeout(typeYes, 40);
    }
  }
  setTimeout(typeYes, 800);
});

/* ============================================
   MUSIC TOGGLE
   ============================================ */
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

musicBtn.addEventListener('click', () => {
  if (!musicStarted) {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      musicBtn.textContent = '🚫';
      setTimeout(() => { musicBtn.textContent = '🎵'; }, 1500);
    });
    musicBtn.classList.add('playing');
    musicBtn.textContent = '🔊';
    musicStarted = true;
  } else if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.classList.add('playing');
    musicBtn.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🔇';
  }
});