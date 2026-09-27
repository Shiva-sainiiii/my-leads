// ===========================================================
// Hotel Landlord Premier — interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        mainNav.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#F7F3EC;padding:1.2rem 1.3rem;gap:1rem;border-bottom:1px solid #EFE9DD;';
      } else {
        mainNav.removeAttribute('style');
      }
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        mainNav.removeAttribute('style');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
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
      header.style.boxShadow = window.scrollY > 20 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
    }, { passive: true });
  }

});
