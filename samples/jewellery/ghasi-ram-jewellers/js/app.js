// ============================================
// Ghasi Ram Jewellers — shared behaviour
// ============================================

(function () {
  const root = document.documentElement;
  const THEME_KEY = 'grj-theme';

  function applyTheme(theme) {
    if (theme === 'black') {
      root.setAttribute('data-theme', 'black');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    let saved = null;
    try { saved = window.localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }
    applyTheme(saved || 'maroon');

    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      const isBlack = root.getAttribute('data-theme') === 'black';
      const next = isBlack ? 'maroon' : 'black';
      applyTheme(next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  function initMobileMenu() {
    const btn = document.getElementById('navMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // ---- Chatbot widget ----
  function initChat() {
    const fab = document.getElementById('chatFab');
    const win = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatClose');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    if (!fab || !win) return;

    fab.addEventListener('click', function () {
      win.classList.toggle('open');
      if (win.classList.contains('open')) input.focus();
    });
    closeBtn.addEventListener('click', function () {
      win.classList.remove('open');
    });

    const replies = [
      "Aapko kis collection mein interest hai — Bridal, Silver ya Diamond?",
      "Hamare showroom ka address hai Railway Road, Opposite Old Anaj Mandi Gate, Rohtak. Timing 10 AM – 8 PM.",
      "Sabhi gold items 100% BIS Hallmarked hain. Weight aur making charges ke liye WhatsApp par bhi baat kar sakte hain.",
      "Aap latest catalog dekhna chahenge ya showroom visit book karna chahenge?"
    ];
    let replyIndex = 0;

    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'chat-msg ' + who;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const val = input.value.trim();
        if (!val) return;
        addMsg(val, 'user');
        input.value = '';
        setTimeout(function () {
          addMsg(replies[replyIndex % replies.length], 'bot');
          replyIndex++;
        }, 500);
      });
    }
  }

  // ---- Gold rate ticker (sample/demo data) ----
  function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    const base = [
      { label: '22K Gold (Haryana)', value: '₹7,145 / gm', trend: 'up' },
      { label: '24K Gold (Haryana)', value: '₹7,790 / gm', trend: 'up' },
      { label: '92.5 Silver', value: '₹98 / gm', trend: 'down' },
      { label: 'Rohtak Showroom', value: 'Open · 10 AM – 8 PM', trend: '' }
    ];
    function renderSet() {
      return base.map(function (item) {
        const arrow = item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '';
        const cls = item.trend === 'up' ? 'up' : '';
        return '<span class="ticker-item">' + item.label + ': <b>' + item.value + '</b>' +
          (arrow ? ' <span class="' + cls + '">' + arrow + '</span>' : '') + '</span>';
      }).join('');
    }
    track.innerHTML = renderSet() + renderSet();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileMenu();
    initChat();
    initTicker();
  });
})();

// ---- Wishlist + shared product card renderer ----
(function () {
  const WISHLIST_KEY = 'grj-wishlist';

  function getWishlist() {
    try { return JSON.parse(window.localStorage.getItem(WISHLIST_KEY)) || []; } catch (e) { return []; }
  }
  function saveWishlist(list) {
    try { window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function isWishlisted(name) { return getWishlist().indexOf(name) !== -1; }
  function toggleWishlist(name) {
    const list = getWishlist();
    const idx = list.indexOf(name);
    if (idx === -1) list.push(name); else list.splice(idx, 1);
    saveWishlist(list);
    updateWishlistBadge();
    return idx === -1;
  }
  function updateWishlistBadge() {
    const badge = document.getElementById('wishlistCount');
    if (badge) badge.textContent = String(getWishlist().length);
    const badgeMobile = document.getElementById('wishlistCountMobile');
    if (badgeMobile) badgeMobile.textContent = String(getWishlist().length);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderProductCard(item) {
    const name = escapeHtml(item.name);
    const active = isWishlisted(item.name) ? ' active' : '';
    const waText = encodeURIComponent('Hi, I\'m interested in "' + item.name + '" — could you share more details?');
    return '<div class="product-card">' +
      '<div class="product-media">' +
        (item.type ? '<span class="product-type-tag">' + escapeHtml(item.type) + '</span>' : '') +
        '<button class="product-wishlist-btn' + active + '" data-name="' + name + '" aria-label="Add to wishlist">' +
          '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>' +
        '</button>' +
        '<img src="' + item.img + '" alt="' + name + '" loading="lazy">' +
        '<a class="product-enquire" href="https://wa.me/919992783722?text=' + waText + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.696 4.61 1.902 6.475L4 29l7.727-1.867A11.94 11.94 0 0 0 16.001 27C22.627 27 28 21.627 28 15S22.627 3 16.001 3Z"/></svg>' +
          'Enquire on WhatsApp' +
        '</a>' +
      '</div>' +
      '<div class="product-info">' +
        '<h4>' + name + '</h4>' +
        '<div class="p-meta">' + escapeHtml(item.meta) + '</div>' +
        '<div class="p-price">' + item.price + '</div>' +
      '</div>' +
    '</div>';
  }

  function initWishlistUI() {
    updateWishlistBadge();
    document.body.addEventListener('click', function (e) {
      const btn = e.target.closest('.product-wishlist-btn');
      if (!btn) return;
      e.preventDefault();
      const name = btn.getAttribute('data-name');
      const nowActive = toggleWishlist(name);
      btn.classList.toggle('active', nowActive);
    });
    const navBtn = document.getElementById('wishlistNavBtn');
    if (navBtn) {
      navBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const count = getWishlist().length;
        alert(count === 0
          ? 'Your wishlist is empty — tap the heart icon on any piece to save it here.'
          : 'You have ' + count + ' saved piece' + (count === 1 ? '' : 's') + ' in your wishlist. (Sample demo — connect this to your backend to show the full list.)');
      });
    }
    const navBtnMobile = document.getElementById('wishlistNavBtnMobile');
    if (navBtnMobile) {
      navBtnMobile.addEventListener('click', function (e) {
        e.preventDefault();
        const count = getWishlist().length;
        alert(count === 0
          ? 'Your wishlist is empty — tap the heart icon on any piece to save it here.'
          : 'You have ' + count + ' saved piece' + (count === 1 ? '' : 's') + ' in your wishlist. (Sample demo — connect this to your backend to show the full list.)');
      });
    }
  }

  window.GRJ = window.GRJ || {};
  window.GRJ.renderProductCard = renderProductCard;
  window.GRJ.isWishlisted = isWishlisted;
  window.GRJ.toggleWishlist = toggleWishlist;

  document.addEventListener('DOMContentLoaded', initWishlistUI);
})();

// ---- Star-rating feedback form ----
(function () {
  function initFeedbackForm() {
    const picker = document.getElementById('starPicker');
    const form = document.getElementById('feedbackForm');
    const successEl = document.getElementById('feedbackSuccess');
    const label = document.getElementById('starPickerLabel');
    if (!picker || !form) return;

    const labels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    let rating = 0;

    picker.querySelectorAll('button').forEach(function (btn, idx) {
      const val = idx + 1;
      btn.addEventListener('click', function () {
        rating = val;
        picker.className = 'star-picker rated-' + rating;
        if (label) label.textContent = labels[rating];
        picker.setAttribute('data-rating', rating);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (rating === 0) {
        if (label) { label.textContent = 'Please select a rating'; label.style.color = '#B8452F'; }
        return;
      }
      form.style.display = 'none';
      successEl.classList.add('show');
    });
  }

  document.addEventListener('DOMContentLoaded', initFeedbackForm);
})();
