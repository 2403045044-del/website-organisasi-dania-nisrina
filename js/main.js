/* ============================================================
   MAPALA RIMBA NUSANTARA — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── NAVBAR SCROLL ───────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── MOBILE NAV TOGGLE ───────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');

      // Animate hamburger → X
      const spans = navToggle.querySelectorAll('span');
      if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ─── SCROLL REVEAL ANIMATION ─────────────────────────────
  const revealElements = document.querySelectorAll(
    '.strip-card, .exp-card, .audio-card, .program-card, ' +
    '.schedule-card, .achievement-card, .benefit-card, ' +
    '.vm-card, .timeline-item, .org-node, .photo-item, ' +
    '.video-card, .requirement-item'
  );

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (i % 4) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // ─── STAT COUNTER ANIMATION ──────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) {
    countObserver.observe(el);
  });

  function animateCounter(el) {
    const text = el.textContent;
    const suffix = text.replace(/[0-9]/g, '');
    const target = parseInt(text.replace(/\D/g, ''), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    function update() {
      current += step;
      if (current >= target) {
        el.textContent = target + suffix;
        return;
      }
      el.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ─── AUDIO WAVE PLAY ANIMATION ───────────────────────────
  const audioElements = document.querySelectorAll('.custom-audio');

  audioElements.forEach(function (audio) {
    const card = audio.closest('.audio-card');
    const wave = card ? card.querySelector('.audio-wave') : null;

    if (!wave) return;

    audio.addEventListener('play', function () {
      wave.classList.add('playing');
      wave.querySelectorAll('span').forEach(function (s) {
        s.style.animationPlayState = 'running';
      });
    });

    audio.addEventListener('pause', function () {
      wave.classList.remove('playing');
      wave.querySelectorAll('span').forEach(function (s) {
        s.style.animationPlayState = 'paused';
      });
    });

    audio.addEventListener('ended', function () {
      wave.classList.remove('playing');
    });
  });

  // ─── SMOOTH ANCHOR SCROLL ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ─── HERO PARALLAX (subtle) ──────────────────────────────
  const heroMountain = document.querySelector('.mountain-silhouette');
  if (heroMountain) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      heroMountain.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
    }, { passive: true });
  }

  // ─── EXPEDITION CARD HOVER TILT ─────────────────────────
  document.querySelectorAll('.exp-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(600px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  console.log('%c🏔 MAPALA RIMBA NUSANTARA', 'color:#2d6a4f;font-size:18px;font-weight:bold;');
  console.log('%cWebsite Resmi Mahasiswa Pecinta Alam', 'color:#d4a017;font-size:12px;');
});
