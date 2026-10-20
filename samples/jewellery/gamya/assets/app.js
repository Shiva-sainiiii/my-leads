/* ===== EDIT PER CLIENT ===== */
const C={name:'Gamya Jewellers',phone:'+91 92542 94542',wa:'919254294542',waShow:'+91 92542 94542',alt:'+91 98135 67674',map:'Shop No, 1, Gamya, near Gandhi Chowk Road, Sector 14, Sonipat, Haryana 131001',addr:'Shop No. C-20, Prem Nagar, Near Gandhi Chowk, Atlas Road, Sector 14, Sonipat, Haryana - 131001'};
/* ========================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ic=n=>`<svg class="ic"><use href="#${n}"/></svg>`;
const wa=t=>`https://wa.me/${C.wa}?text=${encodeURIComponent(C.name+': '+t)}`;
const S=(n,d)=>`<symbol id="${n}" viewBox="0 0 24 24">${d}</symbol>`;
document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute">${
S('star','<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>')+
S('wa','<path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>')+
S('chat','<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>')+
S('x','<path d="M6 6l12 12M18 6L6 18"/>')+S('send','<path d="M4 12l16-8-6 16-2.5-6.5z"/>')+
S('pin','<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>')+
S('clock','<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')+
S('ph','<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>')+
S('arr','<path d="M5 12h14M13 6l6 6-6 6"/>')+
S('shield','<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>')+
S('tag','<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>')+
S('cycle','<path d="M20 7H8a4 4 0 0 0-4 4M4 17h12a4 4 0 0 0 4-4"/><path d="M17 4l3 3-3 3M7 14l-3 3 3 3"/>')+
S('ht','<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.500 10-7.500 10z"/>')+
S('sr','<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>')+S('mn','<path d="M4 8h16M4 16h16"/>')}</svg>`);

/* ---- layout ---- */
const pg=document.body.dataset.p;
const NL=[['home','index.html','Home'],['cat','catalogue.html','Shop'],['contact','contact.html','Contact']];
document.body.insertAdjacentHTML('afterbegin',`<nav><div class="w"><a href="index.html" class="logo"><i></i><span>${C.name}</span></a>
<div class="nl" id="nl">${NL.map(l=>`<a href="${l[1]}"${l[0]==pg?' class="on"':''}>${l[2]}</a>`).join('')}</div>
<div class="nr"><a href="admin.html" class="admin-link">Admin</a><button class="cart-top" id="cartTop" type="button">Bag <span id="cartCount">0</span></button><a href="contact.html#visit" class="btn o" style="padding:11px 22px">Visit us</a><button class="mb" id="mb" aria-label="Menu">${ic('mn')}</button></div></div></nav>`);
$('#mb').onclick=()=>$('#nl').classList.toggle('open');
document.body.insertAdjacentHTML('beforeend',`<footer class="dark"><div class="w"><div class="ft"><div><h3>${C.name}</h3><p>Gold, diamond and 925 sterling silver jewellery.<br>Hallmarked quality. Transparent pricing.</p></div>
<div><h3>Explore</h3><a href="catalogue.html">Catalogue</a><a href="catalogue.html?c=Silver">Silver collection</a><a href="contact.html">Contact</a></div>
<div><h3>Visit</h3><p>${C.addr}</p><p>${C.phone}</p><p>WhatsApp: ${C.waShow}</p></div></div>
<div class="bt"><span>&copy; ${C.name}. All rights reserved.</span><span>Open daily, 10:00 AM – 8:00 PM.</span></div></div></footer>
<div class="cp" id="cp" role="dialog" aria-label="Chat"><div class="ch"><div><b>${C.name}</b><small>Assistant online</small></div><button id="cx" aria-label="Close chat">${ic('x')}</button></div>
<div class="cm" id="cm"></div><div class="qr" id="qr"></div>
<form class="cf" id="cf"><input id="ci" placeholder="Type your question..." autocomplete="off"><button aria-label="Send">${ic('send')}</button></form></div>
<div class="fab"><button class="cb" id="co" aria-label="Open chat">${ic('chat')}</button><a class="wa" href="${wa('Hello, I would like to know more about your jewellery.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ic('wa')}</a></div>`);

/* ---- images + reveal ---- */
function imgs(r=document){r.querySelectorAll('img[data-id]:not([src])').forEach(i=>{const p=i.parentElement;
i.onload=()=>p.classList.add('ok');i.onerror=()=>p.classList.add('bad');
i.src=`https://images.unsplash.com/photo-${i.dataset.id}?auto=format&fit=crop&w=${i.dataset.w||800}&q=80`})}
imgs();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(e=>io.observe(e));

/* ---- catalogue data ---- */
const P={Rings:['1605100804763-247f67b3557e','1617038220319-276d3cfab638','1601121141461-9d6647bef0a1','1608042314453-ae338d80c427'],
Necklaces:['1599643478518-a784e5dc4c8f','1515562141207-7a88fb7ce338','1588444837495-c6cfeb53f32d','1630019852942-f89202989a59'],
Earrings:['1535632066927-ab7c9ab60908','1573408301185-9146fe634ad0','1611652022419-a9419f74343d','1535632066927-ab7c9ab60908'],
Bangles:['1611591437281-460bfbe1220a','1603974372039-adc49044b6bd','1602173574767-37ac01994b2a','1611591437281-460bfbe1220a'],
Pendants:['1588444837495-c6cfeb53f32d','1630019852942-f89202989a59','1596944924616-7b38e7cfac36'],
Chains:['1603974372039-adc49044b6bd','1599643478518-a784e5dc4c8f']};
const D=`Hallmarked Gold Necklace|Gold|Gold|22K, 28 g|Necklaces:0
Gold Choker Necklace|Gold|Gold|22K, 26 g|Necklaces:2
Gold Jhumka|Gold|Gold|22K, 12 g|Earrings:0
Classic Gold Ring|Gold|Gold|22K, 6.5 g|Rings:2
Gold Chain|Gold|Gold|22K, 16 g|Chains:1
Solitaire Diamond Ring|Diamond|Diamond|Certified, 3.4 g|Rings:0
Diamond Eternity Band|Diamond|Diamond|Certified, 4.1 g|Rings:1
Diamond Studs|Diamond|Diamond|Certified, 2.1 g|Earrings:1
Diamond Tennis Bracelet|Diamond|Diamond|Certified, 11 g|Bangles:2
Diamond Necklace|Diamond|Diamond|Certified, 9 g|Necklaces:3
925 Silver Bracelet|Silver|Silver|925, 22 g|Bangles:0
Silver Payal Pair|Silver|Silver|925, 40 g|Bangles:1
Silver Chain|Silver|Silver|925, 18 g|Chains:0
Silver Kada Bracelet|Silver|Silver|925, 35 g|Bangles:3
Yellow Sapphire Ring|Gemstones|Gemstone|Astrological, 6 g|Rings:3
Pearl Necklace|Gemstones|Gemstone|Birthstone, 22 g|Necklaces:1
Emerald Drop Earrings|Gemstones|Gemstone|Birthstone, 5 g|Earrings:2
Evil Eye Pendant|Gifts|Gold|22K, 3.4 g|Pendants:0
Om Pendant|Gifts|Gold|22K, 4.8 g|Pendants:1
Gold Locket|Gifts|Gold|22K, 5 g|Pendants:2`;
const items=D.split('\n').map((l,i)=>{const[n,c,m,d,g]=l.split('|'),[gk,gi]=g.split(':');return{i,n,c,m,d,w:parseFloat(d.split(',')[1]),im:P[gk][+gi]}});
const cats=['Gold','Diamond','Silver','Gemstones','Gifts'],saved=new Set();
const samplePrices=[24999,18999,12999,9999,15999,22999,11999,8999,19999,27999,2499,3499,1999,4999,6999,8999,5499,3999,4499,5999];
const card=(p,k)=>`<article class="pc shop-card" style="animation-delay:${k*45}ms"><div class="ph" data-l="${p.c}" data-i="${p.i}"><img data-id="${p.im}" alt="${p.n}"><button class="hr${saved.has(p.i)?' on':''}" data-h="${p.i}" aria-label="Save ${p.n}">${ic('ht')}</button></div><h3>${p.n}</h3><p>${p.m} &middot; ${p.d}</p><strong class="shop-price">₹${(samplePrices[p.i]||4999).toLocaleString('en-IN')} <small>demo price*</small></strong><div class="shop-actions"><button type="button" class="buy-btn" data-buy="${p.i}">Add to cart</button><a class="ask" target="_blank" rel="noopener" href="${wa('I am interested in '+p.n)}">WhatsApp</a></div></article>`;

/* ---- modal + grid events ---- */
document.body.insertAdjacentHTML('beforeend','<div class="md" id="md"><div class="mc" id="mc"></div></div>');
const md=$('#md');
const NT={Gold:'BIS hallmarked gold. Final price depends on the live gold rate and making charges.',Diamond:'Certified diamond jewellery. Final price depends on the diamond quality, gold rate and making charges.',Silver:'925 silver. Final price depends on the current silver rate and the design.',Gemstone:'Visit the shop to see the stone in person, or message us on WhatsApp for an exact quote.'};
function open(i){const p=items[i];$('#mc').innerHTML=`<button class="x" aria-label="Close">${ic('x')}</button><div class="ph" data-l="${p.c}"><img data-id="${p.im}" data-w="1100" alt="${p.n}"></div><div><div class="eb" style="margin:0">${p.c}</div><h3>${p.n}</h3><p>${p.m} &middot; ${p.d}. ${NT[p.m]}</p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px"><a class="btn" target="_blank" rel="noopener" href="${wa('Please share the price of '+p.n)}">Get price on WhatsApp</a><a class="btn o" href="tel:${C.phone.replace(/\s/g,'')}">Call us</a></div></div>`;
imgs($('#mc'));md.classList.add('open')}
md.onclick=e=>{if(e.target==md||e.target.closest('.x'))md.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key=='Escape')md.classList.remove('open')});
function grid(el){el.onclick=e=>{const h=e.target.closest('.hr');
if(h){const i=+h.dataset.h;saved.has(i)?saved.delete(i):saved.add(i);h.classList.toggle('on');if(window.draw&&$('.chips .on')?.dataset.c=='Saved')draw();return}
const p=e.target.closest('.ph');if(p)open(+p.dataset.i)}}

/* ---- home ---- */
const fp=$('#fp');
if(fp){fp.innerHTML=[0,5,10,2,14,18].map((i,k)=>card(items[i],k)).join('');imgs(fp);grid(fp)}
const hs=$('#hs');if(hs)hs.onsubmit=e=>{e.preventDefault();location.href='catalogue.html?q='+encodeURIComponent($('#hq').value.trim())};

/* ---- catalogue ---- */
const gd=$('#gd');
if(gd){const u=new URLSearchParams(location.search);let cat=u.get('c')||'All',q=u.get('q')||'';
$('#q').value=q;
$('#chips').innerHTML=['All',...cats,'Saved'].map(c=>`<button data-c="${c}">${c}</button>`).join('');
$('#mt').innerHTML='<option value="">All materials</option>'+[...new Set(items.map(p=>p.m))].map(m=>`<option>${m}</option>`).join('');
window.draw=()=>{const s=q.trim().toLowerCase(),m=$('#mt').value,so=$('#so').value;
let l=items.filter(p=>(cat=='All'||(cat=='Saved'?saved.has(p.i):p.c==cat))&&(!m||p.m==m)&&(!s||(p.n+p.c+p.m+p.d).toLowerCase().includes(s)));
if(so=='a')l.sort((a,b)=>a.w-b.w);if(so=='b')l.sort((a,b)=>b.w-a.w);if(so=='n')l.sort((a,b)=>a.n.localeCompare(b.n));
$$('#chips button').forEach(b=>b.classList.toggle('on',b.dataset.c==cat));
$('#cnt').textContent=l.length+(l.length==1?' piece':' pieces');
$('#xq').style.visibility=q?'visible':'hidden';
gd.innerHTML=l.length?l.map(card).join(''):`<div class="emp"><h3>No pieces found</h3><p>${cat=='Saved'?'Tap the heart on any piece to save it here.':'We could not find a match. Try another word, or ask us to source it for you.'}</p><button class="btn" id="rs">Clear filters</button> <a class="btn o" target="_blank" rel="noopener" href="${wa('I am looking for: '+(q||cat))}">Ask on WhatsApp</a></div>`;
imgs(gd);const r=$('#rs');if(r)r.onclick=()=>{cat='All';q='';$('#q').value='';$('#mt').value='';draw()}};
$('#chips').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;draw()}};
$('#q').oninput=e=>{q=e.target.value;draw()};$('#xq').onclick=()=>{q='';$('#q').value='';draw()};
$('#sf').onsubmit=e=>e.preventDefault();$('#mt').onchange=$('#so').onchange=draw;
grid(gd);draw()}

/* ---- contact enquiry + persistent 5-star feedback (browser demo) ---- */
const bad=(id,v)=>$('#'+id).parentElement.classList.toggle('bad',v);
const safeRead=(key)=>{try{return JSON.parse(localStorage.getItem(key))||[]}catch{return[]}};
const safeWrite=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const ef=$('#ef');
if(ef){ef.onsubmit=e=>{e.preventDefault();
const name=$('#n').value.trim(),phone=$('#p').value.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,''),interest=$('#i').value,message=$('#m').value.trim();
const a=name.length<2,b=!/^\d{10}$/.test(phone);bad('n',a);bad('p',b);if(a||b)return;
const entry={id:'ENQ'+Date.now().toString().slice(-7),created:new Date().toLocaleString('en-IN'),name,phone,interest,message};
const enquiries=safeRead('gamya_demo_enquiries_v1');enquiries.unshift(entry);safeWrite('gamya_demo_enquiries_v1',enquiries);
ef.style.display='none';$('#eo').classList.add('show');
const text=`Hello Gamya Jewellers, I submitted a website enquiry.\nName: ${name}\nMobile: ${phone}\nInterested in: ${interest}\nMessage: ${message||'Not provided'}\nReference: ${entry.id}`;
const waLink='https://wa.me/919254294542?text='+encodeURIComponent(text);
const link=document.createElement('a');link.className='btn';link.href=waLink;link.target='_blank';link.rel='noopener';link.textContent='Send details on WhatsApp';$('#eo').append(link);
};
const L=['Needs work','Fair','Good','Very good','Excellent'];let R=0;const st=$('#st');
const paint=n=>{[...st.children].forEach((b,i)=>{b.classList.toggle('on',i<n);b.setAttribute('aria-pressed',String(i<n))});$('#rl').textContent=n?`${L[n-1]} · ${n}/5`:''};
for(let i=1;i<=5;i++){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',i+' star');b.setAttribute('aria-pressed','false');b.innerHTML=ic('star');
b.onmouseenter=()=>paint(i);b.onclick=()=>{R=i;paint(i);$('#re').style.display='none'};st.append(b)}
st.onmouseleave=()=>paint(R);
$('#rb').onclick=()=>{if(!R){$('#re').style.display='block';return}
const feedback={id:'FB'+Date.now().toString().slice(-7),created:new Date().toLocaleString('en-IN'),name:$('#rn').value.trim()||'Anonymous',rating:R,experience:$('#rt').value.trim()};
const feedbacks=safeRead('gamya_demo_feedback_v1');feedbacks.unshift(feedback);safeWrite('gamya_demo_feedback_v1',feedbacks);
$('#rv2').textContent=R;$('#rf').style.display='none';$('#ro').classList.add('show');
const follow=document.createElement('a');follow.className='btn';follow.href='https://wa.me/919254294542?text='+encodeURIComponent(`Hello Gamya Jewellers, I shared ${R}/5 star feedback. Reference: ${feedback.id}`);follow.target='_blank';follow.rel='noopener';follow.textContent='Share feedback on WhatsApp';$('#ro').append(follow);
}}
const mp=$('#mp');if(mp){mp.src='https://maps.google.com/maps?q='+encodeURIComponent(C.map)+'&z=16&output=embed';$('#dir').href='https://www.google.com/maps/dir//Shop+No,+1,+Gamya,+near+Gandhi+Chowk+Road,+Sector+14,+Sonipat,+Haryana+131001/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390db14b327a36b3:0x77ade42197678748?sa=X&ved=1t:57443&ictx=111'}

/* ---- chatbot ---- */
const cp=$('#cp'),cm=$('#cm');
const Q=['Gold rate today','Silver collection','Custom design','Visit timings'];
const A=[[/rate|price|cost|gold/i,'Our prices follow the live gold rate with transparent making charges. Tell us the piece you like in the catalogue and we will share an exact quote.'],
[/silver|payal|anklet|bracelet|silverware/i,'We have a 925 silver collection with bracelets, payals and silverware. Silver bracelets can be delivered across India. Message us on WhatsApp to see current designs.'],
[/stone|gem|astro|birth|ruby|pearl|coral|sapphire|emerald/i,'We have astrological stones and birthstones, along with certified diamond jewellery. Visit the shop or message us on WhatsApp and we will guide you.'],
[/custom|design|make|order/i,'Yes, you design and we create. Share a photo or idea and we will craft it with our own touch. Message us on WhatsApp or visit the shop.'],
[/time|open|hour|when|visit|address|where|location/i,'We are open every day from 10:00 AM to 8:00 PM at Shop No. C-20, Prem Nagar, near Gandhi Chowk, Atlas Road, Sector 14, Sonipat. The Contact page has our map and directions.'],
[/ring|necklace|earring|bangle|pendant|chain|catalog/i,'You can browse and search all pieces in our Catalogue. Tap the heart to save favourites, then enquire on WhatsApp.'],
[/exchange|return|buy.?back|repair|clean|polish/i,'We do professional cleaning and repair of old jewellery. For exchange of old pieces or any repair, please visit the shop or call us and we will guide you.'],
[/hallmark|pure|certif|bis/i,'We sell BIS hallmarked gold (22K and 24K) and certified diamond jewellery, so you can buy with full confidence.'],
[/\b(hi|hello|hey|namaste)\b/i,'Namaste! Welcome to '+C.name+'. How can I help you today?']];
function add(t,c){const d=document.createElement('div');d.className='m '+c;if(c!='t')d.textContent=t;else d.innerHTML='<i></i><i></i><i></i>';cm.append(d);cm.scrollTop=cm.scrollHeight;return d}
function ask(q){add(q,'u');const t=add('','t');
setTimeout(()=>{t.remove();const m=A.find(a=>a[0].test(q));add(m?m[1]:'Thank you for your message. Please call us on '+C.phone+' or tap the WhatsApp button and our team will help you right away.','b')},700)}
$('#qr').innerHTML=Q.map(q=>`<button type="button">${q}</button>`).join('');
$('#qr').onclick=e=>{if(e.target.tagName=='BUTTON')ask(e.target.textContent)};
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(!v)return;$('#ci').value='';ask(v)};
const tog=o=>{cp.classList.toggle('open',o);if(o&&!cm.children.length)add('Namaste! I am the virtual assistant for '+C.name+'. Ask me about collections, prices, timings or custom designs.','b')};
$('#co').onclick=()=>tog(!cp.classList.contains('open'));$('#cx').onclick=()=>tog(false);
