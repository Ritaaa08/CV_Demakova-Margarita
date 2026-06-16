// ===== CURSEUR PERSONNALISÉ =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });

// Agrandir le curseur sur les éléments interactifs
document.querySelectorAll('a, button, .cert-card, .contact-card, .tag, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorGlow.style.width  = '40px';
    cursorGlow.style.height = '40px';
  });
  el.addEventListener('mouseleave', () => {
    cursorGlow.style.width  = '18px';
    cursorGlow.style.height = '18px';
  });
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = pct + '%';
}, { passive: true });

// ===== NAVBAR =====
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }

  // Lien actif selon la section visible
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
      });
    }
  });
}, { passive: true });

// ===== HAMBURGER =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== EFFET TYPING =====
const typingEl = document.getElementById('typingText');
const fullText = 'MARGARITA';
let charIndex  = 0;

const cursor = document.createElement('span');
cursor.className = 'typing-cursor';
typingEl.appendChild(cursor);

function typeNextChar() {
  if (charIndex < fullText.length) {
    typingEl.insertBefore(document.createTextNode(fullText[charIndex]), cursor);
    charIndex++;
    setTimeout(typeNextChar, 110);
  }
}

setTimeout(typeNextChar, 900);

// ===== CANVAS PARTICULES =====
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let mouse    = { x: null, y: null };

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();

const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(canvas.parentElement);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}, { passive: true });

class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x  = Math.random() * canvas.width;
    this.y  = initial ? Math.random() * canvas.height : -10;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.r  = Math.random() * 1.8 + 0.4;
    this.a  = Math.random() * 0.45 + 0.08;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Répulsion douce autour de la souris
    if (mouse.x !== null) {
      const dx   = this.x - mouse.x;
      const dy   = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const force = (110 - dist) / 110;
        this.x += dx * force * 0.025;
        this.y += dy * force * 0.025;
      }
    }

    // Rebond sur les bords
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(182, 109, 255, ${this.a})`;
    ctx.fill();
  }
}

const PARTICLE_COUNT = 90;
const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Liaisons entre particules proches
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.14;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(182, 109, 255, ${alpha})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== REVEAL AU SCROLL (Intersection Observer) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== BARRES DE LANGUES =====
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => {
        fill.style.width = fill.dataset.width + '%';
      }, 250);
      langObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.lang-fill').forEach(el => langObserver.observe(el));

// ===== ONGLETS TIMELINE =====
const tabBtns             = document.querySelectorAll('.tab-btn');
const timelineFormation   = document.getElementById('timelineFormation');
const timelineExperience  = document.getElementById('timelineExperience');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const isFormation = btn.dataset.tab === 'formation';
    timelineFormation.classList.toggle('hidden', !isFormation);
    timelineExperience.classList.toggle('hidden',  isFormation);

    // Déclencher les animations pour les éléments nouvellement visibles
    const target = isFormation ? timelineFormation : timelineExperience;
    target.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObserver.observe(el);
    });
  });
});

// ===== TILT 3D SUR LA PHOTO =====
const photoContainer = document.getElementById('photoContainer');
const photoFrame     = photoContainer ? photoContainer.querySelector('.photo-frame') : null;

if (photoFrame) {
  photoContainer.addEventListener('mousemove', (e) => {
    const rect = photoContainer.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;
    photoFrame.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });

  photoContainer.addEventListener('mouseleave', () => {
    photoFrame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}

// ===== LIGHTBOX CERTIFICATS =====
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== COPIER L'EMAIL =====
function copyEmail() {
  navigator.clipboard.writeText('margarita.demakova@heig-vd.ch').then(() => {
    showToast('Copié dans le presse-papiers !');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = 'margarita.demakova@heig-vd.ch';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copié !');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// Exposer les fonctions utilisées dans le HTML
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
window.copyEmail     = copyEmail;
