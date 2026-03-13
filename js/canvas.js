/* ══════════════════════════════════════
   HERO CANVAS — ANIMATED PARTICLE FIELD
══════════════════════════════════════ */
const canvas  = document.getElementById('heroCanvas');
const ctx     = canvas.getContext('2d');

let W, H, particles, mouse;

mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resize();
  init();
});

/* ── PARTICLE CLASS ── */
class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x     = Math.random() * W;
    this.y     = initial ? Math.random() * H : H + 10;
    this.size  = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.opacity = Math.random() * 0.5 + 0.1;
    this.opacityDir = (Math.random() - 0.5) * 0.005;

    // Color: white, red-tinted, or blue-tinted
    const r = Math.random();
    if (r < 0.33)      this.color = `rgba(255,255,255,`;
    else if (r < 0.66) this.color = `rgba(205,100,110,`;
    else               this.color = `rgba(100,140,220,`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.opacityDir;

    if (this.opacity <= 0.05 || this.opacity >= 0.6) {
      this.opacityDir *= -1;
    }

    // Mouse repulsion
    if (mouse.x !== null) {
      const dx   = this.x - mouse.x;
      const dy   = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += dx * force * 0.02;
        this.y += dy * force * 0.02;
      }
    }

    if (this.y < -10) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.fill();
  }
}

/* ── LINES BETWEEN NEARBY PARTICLES ── */
function drawConnections(pts) {
  const maxDist = 90;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx   = pts[i].x - pts[j].x;
      const dy   = pts[i].y - pts[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.08;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
}

/* ── GRADIENT BACKGROUND ── */
function drawBackground() {
  const grad = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.8);
  grad.addColorStop(0,   'rgba(30, 10, 60, 1)');
  grad.addColorStop(0.4, 'rgba(15, 25, 60, 1)');
  grad.addColorStop(1,   'rgba(5,  10, 20, 1)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Red accent glow — top left
  const redGlow = ctx.createRadialGradient(W * 0.15, H * 0.25, 0, W * 0.15, H * 0.25, W * 0.4);
  redGlow.addColorStop(0,   'rgba(205, 46, 58, 0.18)');
  redGlow.addColorStop(1,   'transparent');
  ctx.fillStyle = redGlow;
  ctx.fillRect(0, 0, W, H);

  // Blue accent glow — bottom right
  const blueGlow = ctx.createRadialGradient(W * 0.85, H * 0.75, 0, W * 0.85, H * 0.75, W * 0.4);
  blueGlow.addColorStop(0,   'rgba(0, 52, 120, 0.22)');
  blueGlow.addColorStop(1,   'transparent');
  ctx.fillStyle = blueGlow;
  ctx.fillRect(0, 0, W, H);
}

/* ── INIT & LOOP ── */
function init() {
  const count = Math.min(Math.floor((W * H) / 9000), 140);
  particles   = Array.from({ length: count }, () => new Particle());
}

function loop() {
  drawBackground();
  drawConnections(particles);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(loop);
}

resize();
init();
loop();
