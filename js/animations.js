/* ══════════════════════════════════════
   INTERSECTION OBSERVER — REVEAL
══════════════════════════════════════ */
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════
   ABOUT CARDS — OBSERVE INDIVIDUALLY
══════════════════════════════════════ */
const aboutCards = document.querySelectorAll('.about-card');

const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

aboutCards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  cardObserver.observe(card);
});

/* ══════════════════════════════════════
   TIMELINE ITEMS — STAGGERED REVEAL
══════════════════════════════════════ */
const timelineItems = document.querySelectorAll('.timeline-item');

const tlObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        tlObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

timelineItems.forEach(item => tlObserver.observe(item));

/* ══════════════════════════════════════
   NUMBER COUNTER — HERO STATS (future)
   HOVER TILT — CARDS
══════════════════════════════════════ */
function addTilt(selector, intensity = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -intensity;
      const rotY  = ((x - cx) / cx) *  intensity;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

addTilt('.uni-card', 6);
addTilt('.speaker-card', 5);
addTilt('.workshop-card', 4);