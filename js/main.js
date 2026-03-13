/* ══════════════════════════════════════
   PRELOADER — TIMER ONLY, NO LOAD EVENT
══════════════════════════════════════ */
const preloader = document.getElementById('preloader');

function hidePreloader() {
  if (!preloader) return;
  preloader.style.opacity    = '0';
  preloader.style.visibility = 'hidden';
  document.body.classList.remove('loading');
  document.body.style.overflow = '';
}

// Just use a flat timer — no load event dependency
setTimeout(hidePreloader, 2000);

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ══════════════════════════════════════
   NAV — SCROLL & ACTIVE STATE
══════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ══════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════ */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const overlay = document.createElement('div');
overlay.classList.add('mobile-overlay');
document.body.appendChild(overlay);

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
}

overlay.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ══════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href   = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = navbar ? navbar.offsetHeight + 20 : 80;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});
