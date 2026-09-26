/* ==========================================================================
   Radha Jewellers / Jyoleri — Site behaviour
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Promo ticker ---------- */
  var ticker = document.getElementById('promoTicker');
  var tickerClose = document.getElementById('promoClose');
  var body = document.body;

  if (ticker) {
    body.classList.add('ticker-active');
    tickerClose.addEventListener('click', function () {
      ticker.style.display = 'none';
      body.classList.remove('ticker-active');
    });
  }

  /* ---------- Sticky header on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile nav ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavOpen = false;

  menuToggle.addEventListener('click', function () {
    mobileNavOpen = !mobileNavOpen;
    mobileNav.style.display = mobileNavOpen ? 'flex' : 'none';
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNavOpen = false;
      mobileNav.style.display = 'none';
    });
  });

  /* ---------- Scroll reveal (single, simple observer) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Star rating input (feedback form) ---------- */
  var starButtons = document.querySelectorAll('#starInput button');
  var ratingValue = document.getElementById('ratingValue');

  starButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = parseInt(btn.getAttribute('data-val'), 10);
      ratingValue.value = val;
      starButtons.forEach(function (b) {
        var bVal = parseInt(b.getAttribute('data-val'), 10);
        b.classList.toggle('active', bVal <= val);
      });
    });
  });

  /* ---------- Feedback form submit (static / no backend yet) ---------- */
  var feedbackForm = document.getElementById('feedbackForm');
  var feedbackSuccess = document.getElementById('feedbackSuccess');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // TODO: wire this up to your backend / Google Sheet / email service.
      feedbackForm.style.display = 'none';
      feedbackSuccess.classList.add('show');
    });
  }

  /* ---------- Contact form submit (static / no backend yet) ---------- */
  var contactForm = document.getElementById('contactForm');
  var contactSuccess = document.getElementById('contactSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // TODO: wire this up to your backend / Google Sheet / email service.
      contactForm.style.display = 'none';
      contactSuccess.classList.add('show');
    });
  }

  /* ---------- Static AI-style chatbot widget ---------- */
  var chatToggle = document.getElementById('chatToggle');
  var chatWindow = document.getElementById('chatWindow');
  var chatClose = document.getElementById('chatClose');
  var chatBody = document.getElementById('chatBody');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');
  var chatQuick = document.getElementById('chatQuick');

  var chatReplies = {
    charges: "हमारा making charge हमेशा flat 3.5% रहता है — चाहे कोई भी design हो, कोई hidden fee नहीं। 😊",
    hours: "हम Monday–Saturday, सुबह 9:30 AM से शाम 7:30 PM तक खुले रहते हैं। Sunday को कृपया कॉल करके confirm कर लें।",
    location: "हम स्थित हैं Shop No. 33, RK Misthan Bhandar / Bikaner Sweets के पास, Delhi Road, Pacca Bagh, Kharkhoda, Sonipat — 131402।",
    gold: "आज के सटीक gold rate के लिए कृपया हमें +91-8881188856 पर कॉल करें या showroom विज़िट करें — rates रोज़ बदलते हैं।",
    default: "धन्यवाद आपके सवाल के लिए! सटीक जानकारी के लिए कृपया हमें +91-8881188856 पर कॉल करें, या नीचे दिए गए buttons में से चुनें।"
  };

  function openChat() {
    chatWindow.classList.add('open');
  }
  function closeChat() {
    chatWindow.classList.remove('open');
  }

  if (chatToggle) {
    chatToggle.addEventListener('click', function () {
      if (chatWindow.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });
  }
  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  function addMsg(text, who) {
    var msg = document.createElement('div');
    msg.className = 'chat-msg ' + who;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function botReply(key) {
    var reply = chatReplies[key] || chatReplies.default;
    // small delay to feel conversational
    setTimeout(function () {
      addMsg(reply, 'bot');
    }, 500);
  }

  if (chatQuick) {
    chatQuick.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = btn.getAttribute('data-q');
        addMsg(btn.textContent, 'user');
        botReply(q);
      });
    });
  }

  function sendUserMessage() {
    var val = chatInput.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    chatInput.value = '';
    botReply('default');
  }

  if (chatSend) chatSend.addEventListener('click', sendUserMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendUserMessage();
    });
  }

});
