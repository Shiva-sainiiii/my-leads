// S.D. Memorial Convent Sr. Sec. School — site script

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form — demo submit (no backend wired up)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      if (note) {
        note.textContent = 'Thank you! Your message has been noted. We will get back to you soon.';
      }
      form.reset();
    });
  }

  // Scroll-reveal: sections and staggered groups fade/rise into view once
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealTargets.length && !prefersReduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver support or reduced motion — show everything immediately
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Stat numbers count up once when the stats strip enters view
  var statEls = document.querySelectorAll('.stat strong[data-count-to]');
  if (statEls.length && !prefersReduced && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count-to'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 900;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  }
});
