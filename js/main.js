

/* ---- Custom Cursor ---- */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = (mx - 5) + 'px';
  cursor.style.top  = (my - 5) + 'px';
});

(function ringLoop() {
  rx += (mx - rx - 17) * 0.14;
  ry += (my - ry - 17) * 0.14;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(ringLoop);
})();

document.querySelectorAll('a, button, .badge, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.4)';
    cursorRing.style.transform = 'scale(1.5)';
    cursorRing.style.borderColor = 'rgba(237,233,224,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
    cursorRing.style.borderColor = 'rgba(237,233,224,0.35)';
  });
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
const navOverlay = document.getElementById('navOverlay');

if (hamburger && navLinks) {
  const toggleNav = (open) => {
    const isOpen = open !== undefined ? open : !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    navLinks.classList.toggle('open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggleNav());

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleNav(false));
  });

  // Close on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleNav(false));
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleNav(false);
  });
}

/* ---- Particle Canvas ---- */
const canvas = document.getElementById('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Dot {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.32;
      this.vy = (Math.random() - 0.5) * 0.32;
      this.r  = Math.random() * 1.2 + 0.4;
      this.a  = Math.random() * 0.5 + 0.12;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,186,178,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) dots.push(new Dot());

  function animCanvas() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < dots.length; i++) {
      dots[i].update();
      dots[i].draw();
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 105) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(190,186,178,${0.055 * (1 - d / 105)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animCanvas);
  }
  animCanvas();
}

/* ---- Typed Effect (hero only) ---- */
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = [
    'Software Developer.',
    'Full-Stack Engineer.',
    'Systems Student.',
    'API Integration Dev.',
    '3D Graphics Enthusiast.'
  ];
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const cur = roles[ri];
    if (!deleting) {
      typedEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = cur.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(type, 300); return;
      }
    }
    setTimeout(type, deleting ? 40 : 70);
  }
  type();
}

/* ---- Scroll Reveal ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
  revealObs.observe(el);
});

/* ---- Contact form ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Mensaje enviado ✓';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje →';
      btn.style.opacity = '1';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});