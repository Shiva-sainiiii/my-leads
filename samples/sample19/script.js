// ===========================================================
// Hotel Landlord Premier — interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav drawer (overlay + close button) ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    const mobileMQ = window.matchMedia('(max-width: 1100px)');

    // Overlay
    let navOverlay = document.getElementById('navOverlay');
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      navOverlay.id = 'navOverlay';
      document.body.appendChild(navOverlay);
    }

    // Close (X) button inside the drawer
    let navClose = mainNav.querySelector('.nav-close');
    if (!navClose) {
      navClose = document.createElement('button');
      navClose.className = 'nav-close';
      navClose.type = 'button';
      navClose.setAttribute('aria-label', 'Close menu');
      navClose.innerHTML = '&#10005;';
      mainNav.prepend(navClose);
    }

    // Keep the drawer as a direct child of <body> on mobile so it always
    // stacks above the overlay (and is never trapped in the header's stacking context).
    const navHome = mainNav.parentElement;
    const navMarker = document.createComment('main-nav-home');
    navHome.insertBefore(navMarker, mainNav);
    const placeNav = () => {
      if (mobileMQ.matches) {
        if (mainNav.parentElement !== document.body) document.body.appendChild(mainNav);
      } else if (mainNav.parentElement === document.body) {
        navMarker.parentNode.insertBefore(mainNav, navMarker.nextSibling);
      }
    };
    placeNav();

    const closeNav = () => {
      mainNav.classList.remove('is-open');
      navOverlay.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openNav = () => {
      mainNav.classList.add('is-open');
      navOverlay.classList.add('is-open');
      navToggle.classList.add('is-active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', () => {
      mainNav.classList.contains('is-open') ? closeNav() : openNav();
    });
    navClose.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);
    mainNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
    const onMQChange = () => { closeNav(); placeNav(); };
    mobileMQ.addEventListener ? mobileMQ.addEventListener('change', onMQChange) : mobileMQ.addListener(onMQChange);
  }

  /* ---------- Star rating input ---------- */
  const starInput = document.getElementById('starInput');
  const ratingValue = document.getElementById('ratingValue');
  if (starInput) {
    const stars = Array.from(starInput.querySelectorAll('.star-btn'));
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.value, 10);
        ratingValue.value = val;
        stars.forEach(s => s.classList.toggle('is-active', parseInt(s.dataset.value, 10) <= val));
      });
    });
  }

  /* ---------- Feedback form (static handling) ---------- */
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackNote = document.getElementById('feedbackNote');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (ratingValue.value === '0') {
        feedbackNote.textContent = 'Please select a star rating before submitting.';
        return;
      }
      feedbackNote.textContent = 'Thank you — your feedback has been recorded.';
      feedbackForm.reset();
      document.querySelectorAll('#starInput .star-btn').forEach(s => s.classList.remove('is-active'));
      ratingValue.value = '0';
    });
  }

  /* ---------- Booking enquiry form (static handling) ---------- */
  const bookForm = document.getElementById('contact');
  const bookNote = document.getElementById('bookNote');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookNote.textContent = 'Enquiry sent — our desk will call you shortly to confirm.';
      bookForm.reset();
    });
  }

  /* ---------- AI chatbot widget (static scripted replies) ---------- */
  const launcher = document.getElementById('chatbotLauncher');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const quickBtns = document.querySelectorAll('.quick-btn');

  const replies = {
    rates: 'Direct rates start around ₹900/night for a Deluxe Double, and roughly ₹1,400–₹1,900 for our Premium Suite and Quadruple rooms depending on the season. Call +91 93503 28009 for today\'s best rate.',
    location: 'We\'re at 2nd Floor, Anand Plaza, Chotu Ram Chowk, Arya Nagar — opposite Pillar No. 15, above Bandhan Bank. About 1.2 km (15 min walk) from Rohtak Junction Railway Station.',
    checkin: 'Check-in is from 12:00 noon and check-out is by 11:00 a.m. Early check-in is available on request, subject to room availability.',
    call: 'You can reach the front desk anytime at +91 93503 28009 or +91 90508 00234 — we\'re staffed 24/7.',
    default: 'Thanks for your message — for anything specific to your dates, the fastest answer is a quick call to +91 93503 28009. Is there anything else I can help with?'
  };

  function addMessage(text, from) {
    const div = document.createElement('div');
    div.className = from === 'user' ? 'user-msg' : 'bot-msg';
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  if (launcher && panel) {
    launcher.addEventListener('click', () => {
      panel.classList.add('is-open');
    });
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener('click', () => panel.classList.remove('is-open'));
  }
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addMessage(btn.textContent, 'user');
      setTimeout(() => addMessage(replies[btn.dataset.reply] || replies.default, 'bot'), 400);
    });
  });
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      setTimeout(() => addMessage(replies.default, 'bot'), 500);
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(18,17,16,0.1)' : 'none';
    }, { passive: true });
  }

  /* ---------- Scroll-reveal animations ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-text, .about-media, .rooms-head, .room-filmstrip, ' +
    '.amenities-media, .amenities-list, .dining-media, .dining-copy, ' +
    '.location > .section-kicker, .location > .section-title, .location > .section-sub, ' +
    '.transit-strip, .map-embed, .reviews > .section-kicker, .reviews > .section-title, ' +
    '.review-grid, .feedback-box, .book-copy, .book-form'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.review-grid, .transit-strip, .amenity-grid').forEach(el => el.classList.add('reveal-stagger'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  }

});
