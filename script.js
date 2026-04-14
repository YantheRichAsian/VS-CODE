/* ═══════════════════════════════════════════════════════════
   PORTFOLIO · DESIGN EVOLUTION
   Script: Lightbox · Scroll Reveal · Timeline Tracker
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. LIGHTBOX ─────────────────────────────────────── */
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <img src="" alt="Enlarged view" />
  `;
  document.body.appendChild(overlay);

  const overlayImg  = overlay.querySelector('img');
  const closeBtn    = overlay.querySelector('.lightbox-close');

  // Open lightbox on card click
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img || card.querySelector('.card__img-wrap--placeholder')) return;
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close on button click
  closeBtn.addEventListener('click', closeLightbox);

  // Close on overlay background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { overlayImg.src = ''; }, 300);
  }


  /* ─── 2. SCROLL REVEAL ────────────────────────────────── */
  // Add reveal class to target elements
  const revealTargets = [
    '.era__header',
    '.era__subheading',
    '.era__grid',
    '.content-layers',
    '.stats-bar',
    '.evolution__item',
    '.card'
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger cards within a grid
      if (selector === '.card') {
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      }
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* ─── 3. TIMELINE DOT TRACKER ─────────────────────────── */
  const eras = [
    { id: 'era-1', dotIndex: 0 },
    { id: 'era-2', dotIndex: 1 },
    { id: 'era-3', dotIndex: 2 },
    { id: 'era-4', dotIndex: 3 },
  ];

  const dots = document.querySelectorAll('.timeline-dot');

  const eraObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const eraId = entry.target.id;
        const match = eras.find(e => e.id === eraId);
        if (match) {
          dots.forEach(d => d.classList.remove('active'));
          if (dots[match.dotIndex]) {
            dots[match.dotIndex].classList.add('active');
          }
        }
      }
    });
  }, {
    threshold: 0.3
  });

  eras.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) eraObserver.observe(el);
  });


  /* ─── 4. NAV SCROLL SHADOW ────────────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.06)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });


  /* ─── 5. SMOOTH ANCHOR OFFSET (for fixed nav) ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height + breathing room
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
