// Sample catalogue data — replace with real inventory / API later.
// Images are free-to-use stock photography (Unsplash) for mockup purposes only.
const CATALOGUE_DATA = {
  bridal: {
    title: 'The Bridal Suite',
    tagline: 'Antique Kundan & Meenakari sets — heavy bridal jewellery crafted for your big day.',
    items: [
      { name: 'Antique Kundan Ranihaar', meta: 'Kundan Work', type: 'Necklace Set', price: '₹4,85,000', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=75&auto=format&fit=crop' },
      { name: 'Meenakari Bridal Choker', meta: 'Hand Meenakari', type: 'Necklace Set', price: '₹3,92,000', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=75&auto=format&fit=crop' },
      { name: 'Polki Bridal Maang Tikka', meta: 'Polki Work', type: 'Hair Jewellery', price: '₹68,000', img: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=500&q=75&auto=format&fit=crop' },
      { name: 'Temple Jewellery Set', meta: 'Temple Motif', type: 'Necklace Set', price: '₹5,40,000', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&q=75&auto=format&fit=crop' },
      { name: 'Kundan Jhumka Earrings', meta: 'Kundan & Pearl', type: 'Earrings', price: '₹1,15,000', img: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=75&auto=format&fit=crop' },
      { name: 'Bridal Nath (Nose Ring)', meta: 'Polki Work', type: 'Nose Jewellery', price: '₹58,000', img: 'https://images.unsplash.com/photo-1620656798579-1284503a9c02?w=500&q=75&auto=format&fit=crop' },
      { name: 'Layered Rani Haar', meta: 'Bridal Combo', type: 'Necklace Set', price: '₹6,10,000', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=75&auto=format&fit=crop' },
      { name: 'Bridal Vaddanam Belt', meta: 'Statement Piece', type: 'Waist Belt', price: '₹3,15,000', img: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  everyday: {
    title: 'Everyday Luxury',
    tagline: 'Delicate rings, diamond pendants and lightweight pieces perfect for daily wear.',
    items: [
      { name: 'Minimal Diamond Ring', meta: '18K Gold · 0.15ct', type: 'Ring', price: '₹35,500', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=75&auto=format&fit=crop' },
      { name: 'Solitaire Pendant', meta: '18K Gold · 0.30ct', type: 'Pendant', price: '₹42,000', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Everyday Stud Earrings', meta: '18K Gold · Pair', type: 'Earrings', price: '₹28,000', img: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&q=75&auto=format&fit=crop' },
      { name: 'Thin Gold Chain', meta: '22K Gold · Daily Wear', type: 'Chain', price: '₹64,000', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=75&auto=format&fit=crop' },
      { name: 'Office-Wear Bracelet', meta: '18K Gold', type: 'Bracelet', price: '₹51,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Diamond Nose Pin', meta: '18K Gold · Certified', type: 'Nose Jewellery', price: '₹19,500', img: 'https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  bangles: {
    title: 'Heritage Bangles & Kadas',
    tagline: 'Traditional Peachli-style craft — bangles and kadas rooted in heritage design.',
    items: [
      { name: 'Peachli Gold Bangles (Set of 2)', meta: '22K Gold · Heritage Craft', type: 'Bangles', price: '₹1,68,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Engraved Kada', meta: '22K Gold · Hand Engraved', type: 'Kada', price: '₹95,000', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=75&auto=format&fit=crop' },
      { name: 'Antique Finish Bangles', meta: '22K Gold · Antique Finish', type: 'Bangles', price: '₹1,42,000', img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&q=75&auto=format&fit=crop' },
      { name: 'Broad Bridal Kada Pair', meta: '22K Gold · Bridal Craft', type: 'Kada', price: '₹2,10,000', img: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=500&q=75&auto=format&fit=crop' },
      { name: 'Slim Everyday Bangles', meta: '22K Gold · Daily Wear', type: 'Bangles', price: '₹78,000', img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=500&q=75&auto=format&fit=crop' }
    ]
  },
  diamonds: {
    title: 'Certified Diamonds',
    tagline: 'Sterling silver & fine ornaments — certified diamonds for lasting brilliance.',
    items: [
      { name: 'Solitaire Diamond Ring', meta: 'Certified Diamond · 18K Gold', type: 'Ring', price: '₹1,85,000', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=75&auto=format&fit=crop' },
      { name: 'Diamond Tennis Bracelet', meta: '18K Gold · Certified', type: 'Bracelet', price: '₹2,40,000', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Diamond Drop Earrings', meta: '18K Gold · Certified', type: 'Earrings', price: '₹74,000', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=75&auto=format&fit=crop' },
      { name: 'Certified Diamond Pendant', meta: '18K Gold · 0.45ct', type: 'Pendant', price: '₹1,10,000', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=75&auto=format&fit=crop' },
      { name: 'Sterling Silver Chain', meta: '92.5 Sterling Silver', type: 'Chain', price: '₹8,200', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=75&auto=format&fit=crop' }
    ]
  }
};
