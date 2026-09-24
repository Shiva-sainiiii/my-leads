// Full catalogue data, built from the store's collections
const CATALOGUE = [
  { name: "Gents Rings", category: "gold", img: "https://images.unsplash.com/photo-1492714485642-dd6df6baafa2?auto=format&fit=crop&w=900&q=80", desc: "Classic and contemporary gold rings crafted for everyday elegance." },
  { name: "Traditional Wedding Sets", category: "gold", img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=900&q=80", desc: "Heirloom-style bridal sets rooted in traditional Indian design." },
  { name: "Bangles", category: "gold", img: "https://images.unsplash.com/photo-1578632297758-3a6c6de14be8?auto=format&fit=crop&w=900&q=80", desc: "Handcrafted gold bangles, from everyday to statement pieces." },
  { name: "Daily Wear Jewellery", category: "gold", img: "https://images.unsplash.com/photo-1492714485642-dd6df6baafa2?auto=format&fit=crop&w=900&q=80", desc: "Lightweight gold pieces designed for comfortable daily use." },
  { name: "Certified Diamond Rings", category: "diamond", img: "https://images.unsplash.com/photo-1595538934869-503c9448981b?auto=format&fit=crop&w=900&q=80", desc: "Certified diamonds set in fine gold, for engagements and gifting." },
  { name: "Kadas", category: "diamond", img: "https://images.unsplash.com/photo-1578632297758-3a6c6de14be8?auto=format&fit=crop&w=900&q=80", desc: "Bold diamond-studded kadas blending tradition with sparkle." },
  { name: "Modern Customized Jewellery", category: "diamond", img: "https://images.unsplash.com/photo-1595538934869-503c9448981b?auto=format&fit=crop&w=900&q=80", desc: "Bespoke diamond jewellery designed to your exact vision." },
  { name: "Silver Jewellery", category: "silver", img: "https://images.unsplash.com/photo-1595538934869-503c9448981b?auto=format&fit=crop&w=900&q=80", desc: "Sterling silver pieces for gifting, daily wear, and festive occasions." },
  { name: "Gents Rings (Silver)", category: "silver", img: "https://images.unsplash.com/photo-1578632297758-3a6c6de14be8?auto=format&fit=crop&w=900&q=80", desc: "Sturdy, stylish silver rings crafted for men." },
  { name: "Pooja Idols", category: "silver", img: "https://images.unsplash.com/photo-1701279680338-3822b21ab90b?auto=format&fit=crop&w=900&q=80", desc: "Finely detailed silver idols and pooja essentials for the home." }
];

const grid = document.getElementById("catalogue-grid");
const searchInput = document.getElementById("catalogue-search-input");
const filterChips = document.querySelectorAll(".filter-chip");
const countLabel = document.getElementById("catalogue-count");
const noResults = document.getElementById("no-results");

let activeCategory = "all";

function cardHTML(item) {
  return `
    <div class="cat-card">
      <div class="cat-card-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <div class="cat-card-body">
        <span class="cat-card-tag">${item.category}</span>
        <h3>${item.name}</h3>
      </div>
    </div>`;
}

function render() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const filtered = CATALOGUE.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = filtered.map(cardHTML).join("");
  countLabel.textContent = filtered.length + (filtered.length === 1 ? " item found" : " items found");
  noResults.classList.toggle("show", filtered.length === 0);
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.category;
    render();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", render);
}

render();
