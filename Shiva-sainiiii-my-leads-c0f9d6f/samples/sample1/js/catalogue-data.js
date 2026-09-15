// Sample catalogue data — replace with real inventory / API later.
// Images are placeholder stock photos (Unsplash) for mockup purposes only.
const CATALOGUE_DATA = {
  bridal: {
    title: 'The Bridal Trousseau',
    tagline: 'Heavy gold chokers, Polki & Meenakari fusion sets, and signature Ram Darbar craftsmanship for the bride\'s big day.',
    items: [
      { name: 'Rani Polki Choker Set', meta: '22K Gold · Polki & Kundan', price: '₹4,85,000', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=75&auto=format&fit=crop' },
      { name: 'Meenakari Bridal Necklace', meta: '22K Gold · Hand Meenakari', price: '₹3,92,000', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=75&auto=format&fit=crop' },
      { name: 'Ram Darbar Heritage Set', meta: '22K Gold · Signature Craft', price: '₹6,10,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Gold Temple Choker', meta: '22K Gold · Temple Motif', price: '₹3,15,000', img: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&q=75&auto=format&fit=crop' },
      { name: 'Layered Haar with Maang Tikka', meta: '22K Gold · Bridal Combo', price: '₹5,40,000', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=75&auto=format&fit=crop' },
      { name: 'Antique Kundan Necklace', meta: '22K Gold · Kundan Work', price: '₹4,20,000', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=75&auto=format&fit=crop' },
      { name: 'Heavy Wedding Choker', meta: '22K Gold · Statement Piece', price: '₹3,78,000', img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=500&q=75&auto=format&fit=crop' },
      { name: 'Bridal Jhumar & Necklace Combo', meta: '22K Gold · Full Set', price: '₹5,95,000', img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  silver: {
    title: 'Ghasi Ram Silver Line',
    tagline: 'Haryana\'s finest 92.5 Sterling Silver — bangles, anklets, and contemporary giftware.',
    items: [
      { name: 'Classic Silver Kada', meta: '92.5 Sterling Silver', price: '₹6,400', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Oxidised Payal Pair', meta: '92.5 Sterling Silver', price: '₹3,850', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=75&auto=format&fit=crop' },
      { name: 'Silver Giftware Tray Set', meta: '92.5 Sterling Silver', price: '₹12,900', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=75&auto=format&fit=crop' },
      { name: 'Contemporary Silver Bangles (Set of 2)', meta: '92.5 Sterling Silver', price: '₹8,200', img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=500&q=75&auto=format&fit=crop' },
      { name: 'Temple-Design Silver Anklets', meta: '92.5 Sterling Silver', price: '₹4,600', img: 'https://images.unsplash.com/photo-1620656798579-1284d5ba6e60?w=500&q=75&auto=format&fit=crop' },
      { name: 'Silver Coin — Lakshmi Ganesh', meta: '92.5 Sterling Silver · 20g', price: '₹2,150', img: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  diamond: {
    title: 'The Diamond Lounge',
    tagline: 'Certified solitaires, engagement rings, and daily-wear pendants.',
    items: [
      { name: 'Solitaire Engagement Ring', meta: 'Certified Diamond · 18K Gold', price: '₹1,85,000', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=75&auto=format&fit=crop' },
      { name: 'Daily Wear Diamond Pendant', meta: '18K Gold · 0.30ct', price: '₹42,000', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Diamond Halo Band', meta: '18K Gold · Certified', price: '₹96,500', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=75&auto=format&fit=crop' },
      { name: 'Classic Diamond Studs', meta: '18K Gold · Pair', price: '₹58,000', img: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&q=75&auto=format&fit=crop' },
      { name: 'Diamond Tennis Bracelet', meta: '18K Gold · Certified', price: '₹2,40,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Everyday Diamond Ring', meta: '18K Gold · 0.15ct', price: '₹35,500', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  heritage: {
    title: 'Heritage Bangles & Kadas',
    tagline: 'Traditional craft bangles and kadas rooted in heritage design — engraved, antique-finish, and everyday pieces.',
    items: [
      { name: 'Peachli Gold Bangles (Set of 2)', meta: '22K Gold · Heritage Craft', price: '₹1,68,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Engraved Kada', meta: '22K Gold · Hand Engraved', price: '₹95,000', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=75&auto=format&fit=crop' },
      { name: 'Antique Finish Bangles', meta: '22K Gold · Antique Finish', price: '₹1,42,000', img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&q=75&auto=format&fit=crop' },
      { name: 'Broad Bridal Kada Pair', meta: '22K Gold · Bridal Craft', price: '₹2,10,000', img: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&q=75&auto=format&fit=crop' },
      { name: 'Slim Everyday Bangles', meta: '22K Gold · Daily Wear', price: '₹78,000', img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=500&q=75&auto=format&fit=crop' }
    ]
  }
};
