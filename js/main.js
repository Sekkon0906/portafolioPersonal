/* =========================================
   PORTFOLIO — Juan Felipe Medina O.
   main.js  v2
   ========================================= */

/* ---- Custom Cursor ---- */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left=(mx-5)+'px'; cursor.style.top=(my-5)+'px'; }
});
(function ringLoop(){
  rx += (mx-rx-17)*.14; ry += (my-ry-17)*.14;
  if (cursorRing) { cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px'; }
  requestAnimationFrame(ringLoop);
})();
document.querySelectorAll('a, button, .badge, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if(cursor) cursor.style.transform='scale(2.4)';
    if(cursorRing){ cursorRing.style.transform='scale(1.5)'; cursorRing.style.borderColor='rgba(237,233,224,.6)'; }
  });
  el.addEventListener('mouseleave', () => {
    if(cursor) cursor.style.transform='scale(1)';
    if(cursorRing){ cursorRing.style.transform='scale(1)'; cursorRing.style.borderColor='rgba(237,233,224,.35)'; }
  });
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  const openMenu  = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  };
  const toggleMenu = () => hamburger.classList.contains('open') ? closeMenu() : openMenu();

  hamburger.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Cerrar al hacer click fuera del panel */
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ---- Particle Canvas ---- */
const canvas = document.getElementById('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Dot {
    constructor(){ this.init(); }
    init(){ this.x=Math.random()*W; this.y=Math.random()*H; this.vx=(Math.random()-.5)*.32; this.vy=(Math.random()-.5)*.32; this.r=Math.random()*1.2+.4; this.a=Math.random()*.5+.12; }
    update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W||this.y<0||this.y>H) this.init(); }
    draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(190,186,178,${this.a})`; ctx.fill(); }
  }
  for(let i=0;i<80;i++) dots.push(new Dot());

  (function animCanvas(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<dots.length;i++){
      dots[i].update(); dots[i].draw();
      for(let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y, d=Math.hypot(dx,dy);
        if(d<105){ ctx.beginPath(); ctx.strokeStyle=`rgba(190,186,178,${.055*(1-d/105)})`; ctx.lineWidth=.5; ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(animCanvas);
  })();
}

/* ---- Typed Effect ---- */
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = ['Software Developer.','Full-Stack Engineer.','Systems Student.','API Integration Dev.','3D Graphics Enthusiast.'];
  let ri=0, ci=0, deleting=false;
  function type(){
    const cur = roles[ri];
    if(!deleting){ typedEl.textContent=cur.slice(0,++ci); if(ci===cur.length){deleting=true;setTimeout(type,1800);return;} }
    else { typedEl.textContent=cur.slice(0,--ci); if(ci===0){deleting=false;ri=(ri+1)%roles.length;setTimeout(type,300);return;} }
    setTimeout(type, deleting?40:70);
  }
  type();
}

/* ---- Scroll Reveal ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el,i) => {
  el.style.transitionDelay = (i*.08)+'s';
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
    setTimeout(() => { btn.textContent='Enviar mensaje →'; btn.style.opacity='1'; btn.disabled=false; contactForm.reset(); }, 3000);
  });
}