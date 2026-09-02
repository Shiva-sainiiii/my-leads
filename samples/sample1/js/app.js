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
