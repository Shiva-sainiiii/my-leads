// Sample catalogue data — replace with real inventory / API later.
const CATALOGUE_DATA = {
  bridal: {
    title: 'The Bridal Trousseau',
    tagline: 'Heavy gold chokers, Polki & Meenakari fusion sets, and signature Ram Darbar craftsmanship for the bride\'s big day.',
    items: [
      { name: 'Rani Polki Choker Set', meta: '22K Gold · Polki & Kundan', price: '₹4,85,000' },
      { name: 'Meenakari Bridal Necklace', meta: '22K Gold · Hand Meenakari', price: '₹3,92,000' },
      { name: 'Ram Darbar Heritage Set', meta: '22K Gold · Signature Craft', price: '₹6,10,000' },
      { name: 'Gold Temple Choker', meta: '22K Gold · Temple Motif', price: '₹3,15,000' },
      { name: 'Layered Haar with Maang Tikka', meta: '22K Gold · Bridal Combo', price: '₹5,40,000' },
      { name: 'Antique Kundan Necklace', meta: '22K Gold · Kundan Work', price: '₹4,20,000' },
      { name: 'Heavy Wedding Choker', meta: '22K Gold · Statement Piece', price: '₹3,78,000' },
      { name: 'Bridal Jhumar & Necklace Combo', meta: '22K Gold · Full Set', price: '₹5,95,000' }
    ]
  },
  silver: {
    title: 'Ghasi Ram Silver Line',
    tagline: 'Haryana\'s finest 92.5 Sterling Silver — bangles, anklets, and contemporary giftware.',
    items: [
      { name: 'Classic Silver Kada', meta: '92.5 Sterling Silver', price: '₹6,400' },
      { name: 'Oxidised Payal Pair', meta: '92.5 Sterling Silver', price: '₹3,850' },
      { name: 'Silver Giftware Tray Set', meta: '92.5 Sterling Silver', price: '₹12,900' },
      { name: 'Contemporary Silver Bangles (Set of 2)', meta: '92.5 Sterling Silver', price: '₹8,200' },
      { name: 'Temple-Design Silver Anklets', meta: '92.5 Sterling Silver', price: '₹4,600' },
      { name: 'Silver Coin — Lakshmi Ganesh', meta: '92.5 Sterling Silver · 20g', price: '₹2,150' }
    ]
  },
  diamond: {
    title: 'The Diamond Lounge',
    tagline: 'Certified solitaires, engagement rings, and daily-wear pendants.',
    items: [
      { name: 'Solitaire Engagement Ring', meta: 'Certified Diamond · 18K Gold', price: '₹1,85,000' },
      { name: 'Daily Wear Diamond Pendant', meta: '18K Gold · 0.30ct', price: '₹42,000' },
      { name: 'Diamond Halo Band', meta: '18K Gold · Certified', price: '₹96,500' },
      { name: 'Classic Diamond Studs', meta: '18K Gold · Pair', price: '₹58,000' },
      { name: 'Diamond Tennis Bracelet', meta: '18K Gold · Certified', price: '₹2,40,000' },
      { name: 'Everyday Diamond Ring', meta: '18K Gold · 0.15ct', price: '₹35,500' }
    ]
  }
};
