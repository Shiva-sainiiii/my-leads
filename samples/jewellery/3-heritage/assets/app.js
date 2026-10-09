/* ===== EDIT PER CLIENT ===== */
const C={name:'Your Jewellers',phone:'+91 99999 99999',wa:'919999999999',map:'jewellery showroom Delhi',addr:'Your showroom address, Main Market, City'};
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
const NL=[['home','index.html','Home'],['cat','catalogue.html','Catalogue'],['contact','contact.html','Contact']];
document.body.insertAdjacentHTML('afterbegin',`<nav><div class="w"><a href="index.html" class="logo"><i></i><span>${C.name}</span></a>
<div class="nl" id="nl">${NL.map(l=>`<a href="${l[1]}"${l[0]==pg?' class="on"':''}>${l[2]}</a>`).join('')}</div>
<div class="nr"><a href="contact.html#visit" class="btn o" style="padding:11px 22px">Book a visit</a><button class="mb" id="mb" aria-label="Menu">${ic('mn')}</button></div></div></nav>`);
$('#mb').onclick=()=>$('#nl').classList.toggle('open');
document.body.insertAdjacentHTML('beforeend',`<footer class="dark"><div class="w"><div class="ft"><div><h3>${C.name}</h3><p>Fine gold, diamond and bridal jewellery.<br>BIS hallmarked. Transparent pricing.</p></div>
<div><h3>Explore</h3><a href="catalogue.html">Catalogue</a><a href="catalogue.html?c=Bridal">Bridal sets</a><a href="contact.html">Contact</a></div>
<div><h3>Visit</h3><p>${C.addr}</p><p>${C.phone}</p></div></div>
<div class="bt"><span>&copy; ${C.name}. All rights reserved.</span><span>Prices subject to daily gold rate.</span></div></div></footer>
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
Bridal:['1599643478518-a784e5dc4c8f','1515562141207-7a88fb7ce338','1596944924616-7b38e7cfac36'],
Chains:['1603974372039-adc49044b6bd','1599643478518-a784e5dc4c8f']};
const D=`Solitaire Halo Ring|Rings|Diamond|18K, 3.2 g
Eternity Band|Rings|Diamond|18K, 4.1 g
Classic Gold Band|Rings|Gold|22K, 6.8 g
Emerald Cocktail Ring|Rings|Gemstone|18K, 5.5 g
Temple Lakshmi Haar|Necklaces|Gold|22K, 42 g
Pearl Rani Haar|Necklaces|Pearl|22K, 36 g
Gold Choker Necklace|Necklaces|Gold|22K, 28 g
Layered Chain Necklace|Necklaces|Gold|18K, 15 g
Jhumka Drops|Earrings|Gold|22K, 12.4 g
Diamond Studs|Earrings|Diamond|18K, 2.1 g
Polki Chandbali|Earrings|Polki|22K, 18 g
Everyday Hoops|Earrings|Gold|18K, 6 g
Kada Bangle Pair|Bangles|Gold|22K, 48 g
Filigree Bangle|Bangles|Gold|22K, 32 g
Diamond Tennis Bracelet|Bangles|Diamond|18K, 11 g
Daily Wear Bangle|Bangles|Gold|22K, 14 g
Evil Eye Pendant|Pendants|Gold|18K, 3.4 g
Om Pendant|Pendants|Gold|22K, 4.8 g
Diamond Initial Pendant|Pendants|Diamond|18K, 2.2 g
Kundan Bridal Set|Bridal|Polki|22K, 95 g
Temple Wedding Set|Bridal|Gold|22K, 120 g
Classic Mangalsutra|Bridal|Gold|22K, 18 g
Rope Chain|Chains|Gold|22K, 16 g
Box Chain|Chains|Gold|18K, 10 g`;
const cn={};
const items=D.split('\n').map((l,i)=>{const[n,c,m,d]=l.split('|');cn[c]=(cn[c]||0)+1;return{i,n,c,m,d,w:parseFloat(d.split(',')[1]),im:P[c][(cn[c]-1)%P[c].length]}});
const cats=Object.keys(P),saved=new Set();
const card=(p,k)=>`<article class="pc" style="animation-delay:${k*45}ms"><div class="ph" data-l="${p.c}" data-i="${p.i}"><img data-id="${p.im}" alt="${p.n}"><button class="hr${saved.has(p.i)?' on':''}" data-h="${p.i}" aria-label="Save ${p.n}">${ic('ht')}</button></div><h3>${p.n}</h3><p>${p.m} &middot; ${p.d}</p><a class="ask" target="_blank" rel="noopener" href="${wa('I am interested in '+p.n)}">Enquire on WhatsApp</a></article>`;

/* ---- modal + grid events ---- */
document.body.insertAdjacentHTML('beforeend','<div class="md" id="md"><div class="mc" id="mc"></div></div>');
const md=$('#md');
function open(i){const p=items[i];$('#mc').innerHTML=`<button class="x" aria-label="Close">${ic('x')}</button><div class="ph" data-l="${p.c}"><img data-id="${p.im}" data-w="1100" alt="${p.n}"></div><div><div class="eb" style="margin:0">${p.c}</div><h3>${p.n}</h3><p>${p.m} &middot; ${p.d}. BIS hallmarked, with certificate and itemised bill. Final price depends on the live gold rate and making charges.</p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px"><a class="btn" target="_blank" rel="noopener" href="${wa('Please share the price of '+p.n)}">Get price on WhatsApp</a><a class="btn o" href="tel:${C.phone.replace(/\s/g,'')}">Call us</a></div></div>`;
imgs($('#mc'));md.classList.add('open')}
md.onclick=e=>{if(e.target==md||e.target.closest('.x'))md.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key=='Escape')md.classList.remove('open')});
function grid(el){el.onclick=e=>{const h=e.target.closest('.hr');
if(h){const i=+h.dataset.h;saved.has(i)?saved.delete(i):saved.add(i);h.classList.toggle('on');if(window.draw&&$('.chips .on')?.dataset.c=='Saved')draw();return}
const p=e.target.closest('.ph');if(p)open(+p.dataset.i)}}

/* ---- home ---- */
const fp=$('#fp');
if(fp){fp.innerHTML=[4,0,19,9,12,22].map((i,k)=>card(items[i],k)).join('');imgs(fp);grid(fp)}
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

/* ---- contact: enquiry + rating ---- */
const bad=(id,v)=>$('#'+id).parentElement.classList.toggle('bad',v);
const ef=$('#ef');
if(ef){ef.onsubmit=e=>{e.preventDefault();
const a=$('#n').value.trim().length<2,b=!/^\d{10}$/.test($('#p').value.replace(/[\s+-]|^91/g,''));
bad('n',a);bad('p',b);if(a||b)return;
const bt=ef.querySelector('button');bt.disabled=true;bt.textContent='Sending...';
setTimeout(()=>{ef.style.display='none';$('#eo').classList.add('show')},900)};
const L=['Needs work','Fair','Good','Very good','Excellent'];let R=0;const st=$('#st');
const paint=n=>{[...st.children].forEach((b,i)=>b.classList.toggle('on',i<n));$('#rl').textContent=n?L[n-1]:''};
for(let i=1;i<=5;i++){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',i+' star');b.innerHTML=ic('star');
b.onmouseenter=()=>paint(i);b.onclick=()=>{R=i;paint(i);$('#re').style.display='none'};st.append(b)}
st.onmouseleave=()=>paint(R);
$('#rb').onclick=()=>{if(!R){$('#re').style.display='block';return}
$('#rv2').textContent=R;$('#rf').style.display='none';$('#ro').classList.add('show')}}
const mp=$('#mp');if(mp){mp.src='https://www.google.com/maps?q='+encodeURIComponent(C.map)+'&output=embed';$('#dir').href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(C.map)}

/* ---- chatbot ---- */
const cp=$('#cp'),cm=$('#cm');
const Q=['Gold rate today','Bridal collection','Custom design','Visit timings'];
const A=[[/rate|price|cost|gold/i,'Our prices follow the live gold rate with transparent making charges. Tell us the piece you like in the catalogue and we will share an exact quote.'],
[/bridal|wedding|marriage|bride/i,'Our bridal sets range from temple and kundan to polki and diamond. See them under Bridal in the catalogue, or visit for a private viewing.'],
[/custom|design|make|order/i,'Yes, we make custom pieces. Bring a photo or idea and our karigars will quote the design and timeline.'],
[/time|open|hour|when|visit|address|where|location/i,'We are open Mon to Sun, 10:30 am to 8:30 pm. The Contact page has our map and directions.'],
[/ring|necklace|earring|bangle|pendant|chain|catalog/i,'You can browse and search all pieces in our Catalogue. Tap the heart to save favourites, then enquire on WhatsApp.'],
[/exchange|return|buy.?back/i,'We offer lifetime exchange and buy-back on all ornaments purchased from us, subject to current rates.'],
[/hallmark|pure|certif|bis/i,'All our gold is BIS hallmarked and diamonds are certified, with a detailed bill for every purchase.'],
[/\b(hi|hello|hey|namaste)\b/i,'Namaste! Welcome to '+C.name+'. How can I help you today?']];
function add(t,c){const d=document.createElement('div');d.className='m '+c;if(c!='t')d.textContent=t;else d.innerHTML='<i></i><i></i><i></i>';cm.append(d);cm.scrollTop=cm.scrollHeight;return d}
function ask(q){add(q,'u');const t=add('','t');
setTimeout(()=>{t.remove();const m=A.find(a=>a[0].test(q));add(m?m[1]:'Thank you for your message. Please call us on '+C.phone+' or tap the WhatsApp button and our team will help you right away.','b')},700)}
$('#qr').innerHTML=Q.map(q=>`<button type="button">${q}</button>`).join('');
$('#qr').onclick=e=>{if(e.target.tagName=='BUTTON')ask(e.target.textContent)};
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(!v)return;$('#ci').value='';ask(v)};
const tog=o=>{cp.classList.toggle('open',o);if(o&&!cm.children.length)add('Namaste! I am the virtual assistant for '+C.name+'. Ask me about collections, prices, timings or custom designs.','b')};
$('#co').onclick=()=>tog(!cp.classList.contains('open'));$('#cx').onclick=()=>tog(false);
