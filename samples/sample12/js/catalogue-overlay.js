// ============================================
// In-page catalogue overlay controller
// Requires CATALOGUE_DATA (js/catalogue-data.js) and window.PSJ (js/app.js) to be loaded first.
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
    const chipsEl = document.getElementById('catOverlayChips');
    const closeBtn = document.getElementById('catOverlayClose');

    let currentKey = null;
    let activeType = 'All';

    function renderItems(items) {
      gridEl.innerHTML = items.map(function (item) {
        return window.PSJ.renderProductCard(item);
      }).join('');
      emptyEl.classList.toggle('show', items.length === 0);
    }

    function applyFilters() {
      if (!currentKey) return;
      const q = searchEl.value.trim().toLowerCase();
      const filtered = CATALOGUE_DATA[currentKey].items.filter(function (item) {
        const matchesType = activeType === 'All' || item.type === activeType;
        const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
        return matchesType && matchesQuery;
      });
      renderItems(filtered);
    }

    function renderChips(items) {
      const types = ['All'].concat(Array.from(new Set(items.map(function (i) { return i.type; }).filter(Boolean))));
      chipsEl.innerHTML = types.map(function (t) {
        return '<button class="filter-chip' + (t === activeType ? ' active' : '') + '" data-type="' + t + '">' + t + '</button>';
      }).join('');
      chipsEl.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          activeType = chip.getAttribute('data-type');
          chipsEl.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
          applyFilters();
        });
      });
    }

    function openCatalogue(key) {
      const data = CATALOGUE_DATA[key];
      if (!data) return;
      currentKey = key;
      activeType = 'All';
      titleEl.textContent = data.title;
      taglineEl.textContent = data.tagline;
      searchEl.value = '';
      renderChips(data.items);
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

    if (searchEl) searchEl.addEventListener('input', applyFilters);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeCatalogue();
    });
  }

  document.addEventListener('DOMContentLoaded', initCatalogueOverlay);
})();
