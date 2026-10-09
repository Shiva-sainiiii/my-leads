// ============================================================
// Narayan Manav Chetna Classes — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav drawer ----
  var navToggle = document.getElementById('navToggle');
  var navClose = document.getElementById('navClose');
  var mobileNav = document.getElementById('mobileNav');

  function openNav() {
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // ---- Back to top button ----
  var backTop = document.getElementById('backTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 480) {
      backTop.classList.add('is-visible');
    } else {
      backTop.classList.remove('is-visible');
    }
  });
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact form ----
  var contactForm = document.getElementById('contactForm');
  var contactSuccess = document.getElementById('contactSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // NOTE: This currently only simulates submission on the front end.
      // To actually receive these enquiries, connect this form to a backend
      // endpoint, form service (e.g. Formspree/Getform), or WhatsApp API.
      var data = {
        name: contactForm.name.value.trim(),
        phone: contactForm.phone.value.trim(),
        course: contactForm.course.value,
        message: contactForm.message.value.trim()
      };
      console.log('Contact enquiry submitted:', data);

      contactSuccess.classList.add('is-visible');
      contactForm.reset();

      setTimeout(function () {
        contactSuccess.classList.remove('is-visible');
      }, 6000);
    });
  }

  // ---- Feedback form ----
  var feedbackForm = document.getElementById('feedbackForm');
  var feedbackSuccess = document.getElementById('feedbackSuccess');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
      }

      var rating = feedbackForm.querySelector('input[name="rating"]:checked');

      var data = {
        name: feedbackForm.name.value.trim(),
        batch: feedbackForm.batch.value.trim(),
        rating: rating ? rating.value : null,
        message: feedbackForm.message.value.trim()
      };
      console.log('Feedback submitted:', data);

      feedbackSuccess.classList.add('is-visible');
      feedbackForm.reset();
      // Re-check default 5-star rating after reset
      var r5 = document.getElementById('r5');
      if (r5) r5.checked = true;

      setTimeout(function () {
        feedbackSuccess.classList.remove('is-visible');
      }, 6000);
    });
  }

  // ---- Smooth-scroll offset safety for sticky header (native scroll-padding handles most) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
