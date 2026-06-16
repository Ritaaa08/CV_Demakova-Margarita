import './style.css';
import { initI18n } from './i18n.js';

/* ---------- i18n ---------- */
initI18n();

/* ---------- Nav: scrolled state ---------- */
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Active nav link ---------- */
const page = document.body.dataset.page;
if (page) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === page);
  });
}

/* ---------- Mobile menu ---------- */
const burger = document.querySelector('.burger');
const mnav = document.querySelector('.mnav');
if (burger && mnav) {
  const toggle = (open) => {
    nav.classList.toggle('open', open);
    mnav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => toggle(!mnav.classList.contains('open')));
  mnav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
}

/* ---------- Scroll reveal + animated bars ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.val) e.target.style.width = e.target.dataset.val + '%';
    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal, .bar-fill').forEach((el) => {
  if (reduce && el.classList.contains('bar-fill') && el.dataset.val) el.style.width = el.dataset.val + '%';
  io.observe(el);
});

/* ---------- Page-transition (soft fade between pages) ---------- */
if (!reduce) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.host !== location.host) return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 380);
  });
}

/* ---------- Contact form → mailto ---------- */
const cform = document.querySelector('[data-contact-form]');
if (cform) {
  cform.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = cform.name.value.trim();
    const email = cform.email.value.trim();
    const msg = cform.message.value.trim();
    const subject = encodeURIComponent(`Portfolio — message de ${name || 'un visiteur'}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:margarita.demakova@heig-vd.ch?subject=${subject}&body=${body}`;
  });
}

/* ---------- Planet (only where the canvas exists) ---------- */
if (document.getElementById('planet-canvas')) {
  import('./planet.js');
}

/* ---------- Myserdon game (only on the game page) ---------- */
if (document.getElementById('game-root')) {
  import('./game.js');
}
