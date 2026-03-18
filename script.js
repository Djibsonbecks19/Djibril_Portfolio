// script.js - Animation de fond étoilé, curseur personnalisé et animations au scroll
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let W, H, stars = [], shootingStars = [];


// Redimensionne le canvas pour qu'il prenne toute la fenêtre et initialise les étoiles
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
function initStars() {
  stars = [];
  const n = Math.floor((W * H) / 4200);
  for (let i = 0; i < n; i++) stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.2+0.1, alpha: Math.random()*0.6+0.1, speed: Math.random()*0.006+0.002, phase: Math.random()*Math.PI*2 });
}

// Dessine les étoiles scintillantes
function drawStars(t) {
  ctx.clearRect(0,0,W,H);
  for (const s of stars) {
    const a = s.alpha * (0.65 + 0.35 * Math.sin(t * s.speed + s.phase));
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(200,220,255,${a})`; ctx.fill();
  }
}

// Génère aléatoirement des étoiles filantes
function spawnShoot() {
  if (Math.random() < 0.003) shootingStars.push({ x: Math.random()*W*0.8, y: Math.random()*H*0.4, len: Math.random()*100+60, speed: Math.random()*6+5, angle: Math.PI/5+Math.random()*0.2, life: 1 });
}

// Dessine les étoiles filantes et met à jour leur position et leur vie
function drawShoots() {
  shootingStars = shootingStars.filter(s => s.life > 0);
  for (const s of shootingStars) {
    const x2 = s.x - Math.cos(s.angle)*s.len*s.life, y2 = s.y - Math.sin(s.angle)*s.len*s.life;
    const g = ctx.createLinearGradient(s.x,s.y,x2,y2);
    g.addColorStop(0,`rgba(200,225,255,${s.life})`); g.addColorStop(1,'rgba(200,225,255,0)');
    ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(x2,y2);
    ctx.strokeStyle = g; ctx.lineWidth = 1.2; ctx.stroke();
    s.x += Math.cos(s.angle)*s.speed; s.y += Math.sin(s.angle)*s.speed; s.life -= 0.018;
  }
}
let t = 0;

// Boucle d'animation principale
function loop() { t++; drawStars(t); spawnShoot(); drawShoots(); requestAnimationFrame(loop); }
resize(); initStars(); loop();
window.addEventListener('resize', () => { resize(); initStars(); });

// Création du curseur personnalisé 
const cursor = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function ac() {
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  cursor.style.left = mx+'px'; cursor.style.top = my+'px';
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(ac);
})();


document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='6px'; cursor.style.height='6px'; ring.style.width='52px'; ring.style.height='52px'; ring.style.borderColor='rgba(79,142,247,.8)'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='10px'; cursor.style.height='10px'; ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(79,142,247,.5)'; });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));


const io = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'),i*80); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const images = document.querySelectorAll(".project-gallery img");
  const closeBtn = document.querySelector(".lightbox-close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove("active");
    }
  });
});