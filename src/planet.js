/* ============================================================
   Planet — skills universe (three.js)
   Purple planet (black bg keyed out) with skill logos (white bg
   keyed out) orbiting on a soft lavender ring. Spins on scroll
   + gentle idle float. No baked-in copy (lives in the HTML).
   ============================================================ */
import * as THREE from 'three';

const BASE = import.meta.env.BASE_URL || './';
const asset = (p) => BASE + p;

const LOGOS = ['planet/1.png', 'planet/2.png', 'planet/3.png', 'planet/4.png', 'planet/5.png', 'planet/6.png'];

const canvas = document.getElementById('planet-canvas');
const stage = canvas.parentElement;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
const CAM_Z = 8.4;
camera.position.set(0, 0, CAM_Z);

scene.add(new THREE.AmbientLight(0xffffff, 1.0));

const floatGroup = new THREE.Group();
scene.add(floatGroup);
const system = new THREE.Group(); // tilted orbit system
system.rotation.x = -0.92;
system.rotation.z = 0.14;
floatGroup.add(system);

const TILT_Z = 0.14;
const ORBIT_R = 2.2;
const LOGO_SIZE = 0.78;
const RING_IN = 1.95, RING_OUT = 2.45;

let ring, planet;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clock = new THREE.Clock();

let scrollTarget = window.scrollY, scrollCurrent = scrollTarget;
addEventListener('scroll', () => { scrollTarget = window.scrollY; }, { passive: true });

Promise.all([
  loadTex(asset('planet/planet.png'), null), // PNG already detoured (transparent bg)
  ...LOGOS.map((u) => loadTex(asset(u), 'white')),
]).then((res) => {
  build(res[0], res.slice(1));
  resize();
  animate();
}).catch((err) => console.error('Planet load error', err));

function build(planetTex, logoTexs) {
  // Planet
  const pAspect = (planetTex.image && planetTex.image.width / planetTex.image.height) || 0.78;
  const pH = 3.7, pW = pH * pAspect;
  planet = new THREE.Mesh(
    new THREE.PlaneGeometry(pW, pH),
    new THREE.MeshBasicMaterial({ map: planetTex, transparent: true })
  );
  planet.renderOrder = -10;
  floatGroup.add(planet);

  // Orbit ring (soft lavender)
  ring = new THREE.Mesh(
    new THREE.RingGeometry(RING_IN, RING_OUT, 220, 1),
    new THREE.MeshBasicMaterial({ map: makeRingTexture(), side: THREE.DoubleSide, transparent: true, depthWrite: false, opacity: 0.9 })
  );
  ring.renderOrder = 1;
  system.add(ring);

  // Logos on the orbit
  logoTexs.forEach((tex, i) => {
    if (!tex) return;
    const a = (i / logoTexs.length) * Math.PI * 2;
    const aspect = (tex.image && tex.image.width / tex.image.height) || 1;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    // normalise so the largest side == LOGO_SIZE
    const h = aspect >= 1 ? LOGO_SIZE / aspect : LOGO_SIZE;
    const w = aspect >= 1 ? LOGO_SIZE : LOGO_SIZE * aspect;
    sp.scale.set(w, h, 1);
    sp.position.set(Math.cos(a) * ORBIT_R, Math.sin(a) * ORBIT_R, 0);
    sp.renderOrder = 2;
    ring.add(sp);
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (!ring) return;
  const t = clock.getElapsedTime();
  scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;
  const base = reduce ? 0 : t * 0.12;            // gentle idle spin
  ring.rotation.z = base + scrollCurrent * 0.0022; // + scroll-driven spin
  if (!reduce) {
    floatGroup.position.y = Math.sin(t * 0.8) * 0.08;
    system.rotation.z = TILT_Z + Math.sin(t * 0.5) * 0.012;
  }
  renderer.render(scene, camera);
}

function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  const aspect = w / h;
  camera.aspect = aspect;
  camera.position.z = aspect < 1 ? CAM_Z * (1 / aspect) * 1.04 : CAM_Z * 1.04;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);

/* --- texture loaders --- */
function loadTex(url, key) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cv = document.createElement('canvas');
      cv.width = img.width; cv.height = img.height;
      const cx = cv.getContext('2d');
      cx.drawImage(img, 0, 0);
      try {
        const im = cx.getImageData(0, 0, cv.width, cv.height), d = im.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          if (key === 'white') {
            if (r > 236 && g > 236 && b > 236) d[i + 3] = 0;
          } else if (key === 'black') {
            const m = Math.max(r, g, b);
            if (m < 30) d[i + 3] = 0;                 // pure black → transparent
            else if (m < 70) d[i + 3] = Math.round(((m - 30) / 40) * 255); // soft feather
          }
        }
        cx.putImageData(im, 0, 0);
      } catch (e) { /* tainted canvas — skip keying */ }
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      resolve(tex);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function makeRingTexture() {
  const S = 1024, c = document.createElement('canvas');
  c.width = S; c.height = S;
  const x = c.getContext('2d');
  const cx = S / 2, cy = S / 2;
  const pr = (rW) => rW * S / (2 * RING_OUT);
  // soft lavender band
  const grad = x.createRadialGradient(cx, cy, pr(RING_IN), cx, cy, pr(RING_OUT));
  grad.addColorStop(0, 'rgba(205,190,242,0)');
  grad.addColorStop(0.5, 'rgba(205,190,242,0.55)');
  grad.addColorStop(1, 'rgba(242,169,196,0)');
  x.fillStyle = grad;
  x.beginPath(); x.arc(cx, cy, pr(RING_OUT), 0, 6.2832); x.fill();
  // faint sparkle dots
  for (let i = 0; i < 1400; i++) {
    const ang = Math.random() * 6.2832;
    const rr = pr(RING_IN) + Math.random() * (pr(RING_OUT) - pr(RING_IN));
    const px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
    x.fillStyle = `rgba(255,255,255,${(0.05 + Math.random() * 0.25).toFixed(2)})`;
    x.fillRect(px, py, 1.6, 1.6);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return tex;
}

/* --- twinkling CSS starfield in the section background --- */
(function stars() {
  const host = document.querySelector('.planet-sec__stars');
  if (!host) return;
  const N = window.innerWidth < 760 ? 36 : 64;
  for (let i = 0; i < N; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 2.4 + 1;
    Object.assign(s.style, {
      position: 'absolute',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      width: size + 'px', height: size + 'px',
      borderRadius: '50%',
      background: Math.random() > 0.5 ? '#ffffff' : '#cdbef2',
      opacity: String(0.3 + Math.random() * 0.5),
    });
    host.appendChild(s);
    if (!reduce) {
      s.animate(
        [{ opacity: 0.15 }, { opacity: 0.85 }, { opacity: 0.15 }],
        { duration: 2200 + Math.random() * 2600, delay: Math.random() * 3000, iterations: Infinity }
      );
    }
  }
})();
