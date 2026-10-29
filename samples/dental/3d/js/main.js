import { siteConfig as C } from './config.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const get = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isReal = (v) => v && !/^YOUR /.test(v);

/* ---------- 1. CONTENT RENDER (sab kuch config se) ---------- */
document.title = `${C.businessName} — Dental Care`;
$$('[data-c]').forEach(el => {
  const v = get(C, el.dataset.c); if (v == null) return;
  if (el.classList.contains('split')) el.innerHTML = v.split('\n').map(l => `<span class="ln"><span>${l}</span></span>`).join('');
  else el.textContent = v;
});
$$('[data-href]').forEach(el => {
  const v = get(C, el.dataset.href);
  el.href = isReal(v) ? (el.dataset.pre || '') + v : '#contact';
  if (isReal(v) && !el.dataset.pre) { el.target = '_blank'; el.rel = 'noopener'; }
});
$('#logo').innerHTML = C.logo.image ? `<img src="${C.logo.image}" alt="${C.businessName}">` : C.logo.text;
const navHTML = C.nav.map(([t, h]) => `<a href="${h}">${t}</a>`).join('');
$('#nav').innerHTML = navHTML; $('#menuNav').innerHTML = navHTML;
$('#stats').innerHTML = C.about.stats.map(s => `<div><b>${s.value}</b><span>${s.label}</span></div>`).join('');
$('#svcList').innerHTML = C.services.map((s, i) => `<div class="svc rv"><em>0${i + 1} —</em><h3>${s.name}</h3><p>${s.desc}</p></div>`).join('');
$('#feat').innerHTML = C.why.features.map(f => `<li class="rv"><b>${f.title}</b><p>${f.text}</p></li>`).join('');
$('#exp').innerHTML = C.experience.items.map((x, i) => `<div class="rv"><span>0${i + 1}</span><b>${x.title}</b><p>${x.text}</p></div>`).join('');
$('#tgrid').innerHTML = C.testimonials.items.map(t => `<blockquote class="rv"><q>“${t.quote}”</q><cite>— ${t.author}</cite></blockquote>`).join('');
$('#ggrid').innerHTML = C.gallery.items.map(g => `<figure class="g"><img src="${g.src}" alt="${g.label}" loading="lazy" onerror="this.remove()"><span>${g.label}</span></figure>`).join('');
$('#svcSel').innerHTML = C.services.map(s => `<option>${s.name}</option>`).join('');

/* ---------- 2. UI: menu, header theme, reveal, form ---------- */
const toggleMenu = (o) => { $('#menu').classList.toggle('open', o); document.body.classList.toggle('mo', o); };
$('#ham').onclick = $('#srch').onclick = () => toggleMenu(!$('#menu').classList.contains('open'));
$$('#menuNav a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.split,.rv,.g').forEach(el => io.observe(el));
$$('.svc,.feat li,.expgrid div,.tgrid blockquote').forEach((el, i) => el.style.transitionDelay = `${(i % 4) * .08}s`);
setTimeout(() => $$('.hero .split,.hero .rv').forEach(el => el.classList.add('in')), 150);

$('#form').addEventListener('submit', async e => {
  e.preventDefault();
  if (C.contact.formAction) { try { await fetch(C.contact.formAction, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } }); } catch (_) {} }
  $('#ok').hidden = false; e.target.reset();
});

/* ---------- 3. 3D TOOTH (GLB) ---------- */
const keys = $$('section[data-tooth]').map(el => ({
  el, d: el.dataset.tooth.split(',').map(Number), m: el.dataset.toothM?.split(',').map(Number)
}));
let mids = [];
const calcMids = () => { mids = keys.map(k => { const r = k.el.getBoundingClientRect(); return r.top + scrollY + r.height / 2; }); };
const smooth = t => t * t * (3 - 2 * t);
const mobile = () => innerWidth < 860;
const frame = k => (mobile() ? (k.m || [k.d[0] * .5, k.d[1], k.d[2] * .55, k.d[3], k.d[4]]) : k.d);

function target() { // scroll progress -> do keyframes ke beech smooth interpolation
  const cy = scrollY + innerHeight / 2; let i = 0;
  while (i < mids.length - 1 && cy >= mids[i + 1]) i++;
  const a = frame(keys[i]), b = frame(keys[Math.min(i + 1, keys.length - 1)]);
  const t = i >= mids.length - 1 ? 0 : smooth(Math.min(1, Math.max(0, (cy - mids[i]) / (mids[i + 1] - mids[i]))));
  return a.map((v, n) => v + (b[n] - v) * t);
}

async function initTooth() {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  const canvas = $('#tooth');
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || mobile();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !lowEnd, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, lowEnd ? 1.25 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(30, 1, .1, 100); cam.position.z = 10;
  const FOV_H = () => 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;

  scene.add(new THREE.AmbientLight(0xffffff, .45));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key);          // soft key
  const rim = new THREE.DirectionalLight(0xcbb3e8, 3);   rim.position.set(-4, 2, -3); scene.add(rim);        // lavender rim
  const fill = new THREE.DirectionalLight(0xd4ff3f, .35); fill.position.set(-3, -3, 2); scene.add(fill);     // chartreuse kick

  const resize = () => { renderer.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); calcMids(); };
  resize(); addEventListener('resize', resize);

  const gltf = await new GLTFLoader().loadAsync(C.model.path);
  const model = gltf.scene, pivot = new THREE.Group(), tilt = new THREE.Group();
  const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
  model.position.sub(ctr); model.scale.setScalar(1 / size.y);   // height = 1 unit, center pe
  model.position.multiplyScalar(1 / size.y);
  tilt.add(model); pivot.add(tilt); scene.add(pivot);
  if (C.model.overrideMaterial) {
    const mat = new THREE.MeshPhysicalMaterial({ color: 0xf6f2ee, roughness: .2, metalness: 0, clearcoat: 1, clearcoatRoughness: .08, sheen: 1, sheenColor: new THREE.Color(0xcbb3e8), sheenRoughness: .5, envMapIntensity: 1.15 });
    model.traverse(o => { if (o.isMesh) { if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals(); o.material = mat; } });
  }

  const cur = target().slice(); let vel = 0, lastY = scrollY, mx = 0, my = 0, tmx = 0, tmy = 0;
  if (!reduced && !mobile()) addEventListener('pointermove', e => { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; }, { passive: true });
  const clock = new THREE.Clock();

  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    const tg = target(), k = 1 - Math.exp(-dt * (reduced ? 8 : 3.2));   // lerp = koi sudden jump nahi
    for (let i = 0; i < 5; i++) cur[i] += (tg[i] - cur[i]) * k;
    mx += (tmx - mx) * k; my += (tmy - my) * k;
    const H = FOV_H(), W = H * cam.aspect, fl = reduced ? 0 : 1;
    pivot.position.set(cur[0] * W / 2 + mx * .15 * fl, cur[1] * H / 2 * -1 + Math.sin(t * .7) * .035 * H * fl, Math.sin(t * .5) * .25 * fl);
    pivot.scale.setScalar(cur[2] * H);
    pivot.rotation.y = cur[3] * (reduced ? .25 : 1) + Math.sin(t * .4) * .08 * fl + mx * .35 * fl;
    tilt.rotation.x = cur[4] + Math.sin(t * .55) * .04 * fl + my * .2 * fl;
    tilt.rotation.z = Math.sin(t * .35) * .03 * fl;
    renderer.render(scene, cam);
  });
  canvas.classList.add('on'); $('#loader').classList.add('off');
}

/* header: dark section pe white text */
const dark = () => { const y = 40; $('#top').classList.toggle('dark', $$('[data-theme=dark]').some(s => { const r = s.getBoundingClientRect(); return r.top < y && r.bottom > y; })); };
addEventListener('scroll', dark, { passive: true });

addEventListener('load', () => {
  calcMids();
  const start = () => initTooth().catch(err => { console.warn('3D load failed', err); $('#loader').textContent = ''; });
  'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 800 }) : setTimeout(start, 200); // page render block nahi hota
  setTimeout(calcMids, 1200);
});
