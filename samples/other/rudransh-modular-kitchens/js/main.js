// ---------- Header scroll state ----------
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---------- Marquee strip content ----------
const stripItems = ["Modular Kitchens", "Wardrobes", "TV Wall Units", "False Ceiling", "Bathroom Vanities", "Custom Furniture"];
const track = document.getElementById('strip-track');
if (track) {
  const loopItems = [...stripItems, ...stripItems, ...stripItems];
  track.innerHTML = loopItems.map(i => `<span>${i}</span>`).join('');
}

// ---------- Star rating widget ----------
const starRating = document.getElementById('star-rating');
const ratingValue = document.getElementById('rating-value');
const ratingLabel = document.getElementById('rating-label');
const ratingWords = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' };

if (starRating) {
  const stars = starRating.querySelectorAll('.star');

  function setStars(value) {
    stars.forEach(star => {
      const v = parseInt(star.dataset.value, 10);
      star.classList.toggle('active', v <= value);
    });
  }

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.value, 10);
      ratingValue.value = value;
      setStars(value);
      ratingLabel.textContent = `${ratingWords[value]} — ${value} star${value > 1 ? 's' : ''}`;
    });
    star.addEventListener('mouseenter', () => setStars(parseInt(star.dataset.value, 10)));
  });

  starRating.addEventListener('mouseleave', () => setStars(parseInt(ratingValue.value, 10) || 0));
}

// ---------- Feedback form ----------
const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (parseInt(ratingValue.value, 10) === 0) {
      ratingLabel.textContent = 'Please select a star rating before submitting';
      ratingLabel.style.color = '#b3453f';
      return;
    }

    // NOTE: This currently just confirms submission in the browser.
    // To actually receive these messages, connect this form to a backend
    // (e.g. Formspree, Google Sheets via a script, or your own email API)
    // and send the data there instead of only showing the success message.

    feedbackSuccess.classList.add('show');
    feedbackForm.reset();
    setStars(0);
    ratingLabel.style.color = '';
    ratingLabel.textContent = 'Tap a star to rate';

    setTimeout(() => feedbackSuccess.classList.remove('show'), 6000);
  });
}

// ---------- Contact / quote form ----------
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // NOTE: Same as above — connect this to a backend or form service
    // (Formspree, WhatsApp API, email API, etc.) to actually receive leads.

    contactSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => contactSuccess.classList.remove('show'), 6000);
  });
}
