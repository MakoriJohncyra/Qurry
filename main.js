/* ============================================================
   main.js — Qurry Ombati Legal Portfolio
============================================================ */

(function () {
  'use strict';

  /* ── Hamburger / Mobile Nav ── */
  const navToggle  = document.getElementById('navToggle');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    navToggle.classList.add('open');
    mobileNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden',   'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('open');
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden',   'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    this.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Close drawer when a mobile link is clicked */
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close drawer on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Scroll-reveal with IntersectionObserver ── */
  const revealEls = document.querySelectorAll(
    '.edu-card, .skill-card, .stat-card, .contact-row, .value-item, .about-text p'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.65s ease forwards';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });

  /* ── Contact form send button ── */
  var sendBtn = document.getElementById('sendBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var name    = document.getElementById('cf-name')   && document.getElementById('cf-name').value.trim();
      var email   = document.getElementById('cf-email')  && document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message') && document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        sendBtn.textContent = 'Please fill required fields';
        sendBtn.style.background = '#8C2A3E';
        setTimeout(function () {
          sendBtn.textContent = 'Send Message';
          sendBtn.style.background = '';
        }, 2500);
        return;
      }

      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.classList.add('sent');
      sendBtn.disabled = true;

      setTimeout(function () {
        sendBtn.textContent = 'Send Message';
        sendBtn.classList.remove('sent');
        sendBtn.disabled = false;
      }, 4000);
    });
  }

  /* ── Navbar shrink on scroll ── */
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.style.height      = '56px';
      navbar.style.boxShadow   = '0 2px 16px rgba(13,42,78,0.1)';
    } else {
      navbar.style.height      = '';
      navbar.style.boxShadow   = '';
    }

    lastScroll = currentScroll;
  }, { passive: true });

})();
