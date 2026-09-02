// ============================================
// In-page catalogue overlay controller
// Requires CATALOGUE_DATA (js/catalogue-data.js) to be loaded first.
// ============================================

(function () {
  function initCatalogueOverlay() {
    const overlay = document.getElementById('catOverlay');
    if (!overlay || typeof CATALOGUE_DATA === 'undefined') return;

    const titleEl = document.getElementById('catOverlayTitle');
    const taglineEl = document.getElementById('catOverlayTagline');
    const gridEl = document.getElementById('catOverlayGrid');
    const emptyEl = document.getElementById('catOverlayEmpty');
    const searchEl = document.getElementById('catOverlaySearch');
    const closeBtn = document.getElementById('catOverlayClose');

    let currentKey = null;

    function renderItems(items) {
      gridEl.innerHTML = items.map(function (item) {
        return '<div class="product-card">' +
          '<div class="product-media"><img src="' + item.img + '" alt="' + item.name + '" loading="lazy"></div>' +
          '<div class="product-info">' +
            '<h4>' + item.name + '</h4>' +
            '<div class="p-meta">' + item.meta + '</div>' +
            '<div class="p-price">' + item.price + '</div>' +
          '</div>' +
        '</div>';
      }).join('');
      emptyEl.classList.toggle('show', items.length === 0);
    }

    function openCatalogue(key) {
      const data = CATALOGUE_DATA[key];
      if (!data) return;
      currentKey = key;
      titleEl.textContent = data.title;
      taglineEl.textContent = data.tagline;
      searchEl.value = '';
      renderItems(data.items);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      overlay.scrollTop = 0;
    }

    function closeCatalogue() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-catalogue]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openCatalogue(trigger.getAttribute('data-open-catalogue'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCatalogue);

    if (searchEl) {
      searchEl.addEventListener('input', function () {
        if (!currentKey) return;
        const q = searchEl.value.trim().toLowerCase();
        const filtered = CATALOGUE_DATA[currentKey].items.filter(function (item) {
          return item.name.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
        });
        renderItems(filtered);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeCatalogue();
    });
  }

  document.addEventListener('DOMContentLoaded', initCatalogueOverlay);
})();
