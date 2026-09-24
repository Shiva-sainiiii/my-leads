const WA = '917056000419';
const FEEDBACK_ENDPOINT = ''; // optional: paste a Formspree / Supabase / Firebase function URL to receive feedback
const $ = s => document.querySelector(s);
const waUrl = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

// Mobile menu
const nav = $('nav'), menu = $('.menu');
menu.onclick = () => menu.setAttribute('aria-expanded', nav.classList.toggle('open'));
nav.onclick = e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', false); } };

// Contact form opens WhatsApp with the details filled in
$('#contact').onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target);
  window.open(waUrl(`Hello The Catalina, I am ${f.get('name')} (${f.get('phone')}). I am looking for ${f.get('type')}. ${f.get('msg')}`), '_blank', 'noopener');
};

// Star-rating feedback form
$('#fb').onsubmit = e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target)), out = $('#fbmsg');
  if (!d.rating) { out.textContent = 'Please choose a star rating first.'; return; }
  d.at = new Date().toISOString();
  try { const a = JSON.parse(localStorage.getItem('catalinaFeedback') || '[]'); a.push(d); localStorage.setItem('catalinaFeedback', JSON.stringify(a)); } catch (_) {}
  if (FEEDBACK_ENDPOINT) fetch(FEEDBACK_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }).catch(() => {});
  e.target.reset();
  out.textContent = 'Thank you for your feedback.';
};

// Chat assistant with prepared replies
const panel = $('.panel'), chat = $('.chat'), log = $('.log'), input = $('.ask input');
const REPLIES = [
  [/room|suite|deluxe|stay|amenit|wi-?fi|laundry/, 'We offer Deluxe Rooms, Executive Suites and Family Suites. All rooms have free Wi-Fi, AC, a flat-screen TV, 24/7 room service, a tea/coffee maker and a work desk.', 1],
  [/check|timing|id\b|proof|policy/, 'Check-in is at 12:00 PM and check-out at 10:00 AM. Please carry an Aadhaar, Passport or Driving License. Guests must be 18 or older.'],
  [/food|menu|dining|restaurant|veg|eat|drink|mojito|rooftop|glades/, 'Our restaurant and rooftop lounge are 100% pure vegetarian, with North Indian, Continental, South Indian and Chinese dishes. Try the Paneer Tikka, Kadhai Paneer, Malai Kofta, Dal Makhani and our mojitos.', 1],
  [/banquet|event|wedding|marriage|party|birthday|corporate|hall|engagement/, 'We have 3 event spaces for up to 350 seated or 400 floating guests. We host weddings, engagements, birthday parties and corporate meetings.', 1],
  [/where|location|address|map|reach|direction/, 'We are at Plot No. 180-B/29, Sonipat Road, Ram Gopal Colony, Rohtak, Haryana 124001, opposite the Sector 3-4 dividing road. The map is at the bottom of this page.'],
  [/park/, 'Free parking is available for all guests.'],
  [/price|rate|cost|tariff|book|available|phone|call|contact|number/, 'For rates and availability, please message us on WhatsApp or call +91 70560 00419.', 1]
];
const FALLBACK = 'I can help with rooms, check-in, dining, banquets and location. For anything else, please chat with our team on WhatsApp.';

const say = (t, cls, link) => {
  const p = document.createElement('p');
  if (cls) p.className = cls;
  p.textContent = t;
  if (link) { p.append(' '); const a = document.createElement('a'); a.href = waUrl('Hello The Catalina, I have a question.'); a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open WhatsApp'; p.append(a); }
  log.append(p);
  log.scrollTop = log.scrollHeight;
};
const ask = q => {
  say(q, 'me');
  const hit = REPLIES.find(r => r[0].test(q.toLowerCase()));
  setTimeout(() => hit ? say(hit[1], '', hit[2]) : say(FALLBACK, '', 1), 350);
};

say('Hello! I am the Catalina assistant. What would you like to know?');
['Rooms', 'Check-in time', 'Dining', 'Banquets', 'Location'].forEach(t => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = t; b.onclick = () => ask(t);
  $('.qr').append(b);
});
chat.onclick = () => {
  panel.hidden = !panel.hidden;
  chat.setAttribute('aria-expanded', !panel.hidden);
  if (!panel.hidden) input.focus();
};
$('.ask').onsubmit = e => { e.preventDefault(); const q = input.value.trim(); if (q) { input.value = ''; ask(q); } };

// Header shadow on scroll
const header = $('header');
addEventListener('scroll', () => header.classList.toggle('sc', scrollY > 20), { passive: true });

// Reveal-on-scroll (added by JS, so the page still works without it)
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(list => list.forEach(x => {
    if (!x.isIntersecting) return;
    x.target.classList.add('in');
    io.unobserve(x.target);
    setTimeout(() => x.target.style.setProperty('--d', '0s'), 1800);
  }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.sec h2,.lead,.sec .arch,.list>div,.chips,#dining .grid3>img,.menucols>div,.food figure,.pair img,.gal img,.hl .grid4>div,.grid2>form,.split>div>p').forEach(el => {
    el.classList.add('rv');
    el.style.setProperty('--d', Math.min([...el.parentNode.children].indexOf(el), 4) * 90 + 'ms');
    io.observe(el);
  });
}
