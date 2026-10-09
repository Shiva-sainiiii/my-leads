(function () {
  "use strict";

  var WA = "918950509292";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Year ---------- */
  $("#yr").textContent = new Date().getFullYear();

  /* ---------- Header scroll state + mobile nav ---------- */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $("#burger"), navlinks = $("#navlinks");
  function setNav(open) {
    navlinks.classList.toggle("open", open);
    header.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setNav(!navlinks.classList.contains("open")); });
  $$("#navlinks a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  header.addEventListener("click", function (e) { if (e.target === header) setNav(false); });

  /* ---------- Hero stars ---------- */
  var starBox = $("#stars");
  for (var i = 0; i < 46; i++) {
    var s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 62 + "%";
    s.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    s.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
    starBox.appendChild(s);
  }

  /* ---------- "Tonight" ticker (based on visitor's local time) ---------- */
  (function tonight() {
    var box = $("#tonight"), txt = $("#tonight-text");
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var open = 11 * 60, close = 23 * 60 + 30, music = 20 * 60;
    if (mins >= music && mins < close) {
      txt.textContent = "Live music is on right now";
    } else if (mins >= open && mins < music) {
      txt.textContent = "Open now. Live music tonight from 8:00 PM";
    } else if (mins >= close) {
      txt.textContent = "Closed for tonight. Open tomorrow at 11:00 AM";
      box.classList.add("closed");
    } else {
      txt.textContent = "Opens at 11:00 AM. Live music tonight from 8:00 PM";
      box.classList.add("closed");
    }
  })();

  /* ---------- Menu ---------- */
  var MENU = {
    "Chef's specials": {
      img: "img/paneer-tikka.jpg", alt: "Grilled paneer tikka",
      items: [
        ["Qaenat Special Paneer", "Our signature vegetarian dish, cooked to the chef's own recipe.", "", "Signature"],
        ["Qaenat Dal", "Slow-cooked black dal in the Dal Makhani style.", "", "Signature"],
        ["Murgh Hara Pyaza", "Chicken in a green onion and herb gravy.", "₹550", "Chef's pick"],
        ["Paneer Takatak", "Paneer tossed on the tawa with peppers and spices.", "", ""]
      ]
    },
    "Starters": {
      img: "img/starter-live.jpg", alt: "Spicy chilli starter served on a sizzler plate",
      items: [
        ["Kali Mirch Paneer", "Paneer with crushed black pepper. Guests rate this one highly.", "", "Most loved"],
        ["Oregano Cheese", "A fusion starter you will not find at most places in town.", "", "Only here"],
        ["Golden Fried Baby Corn", "Crisp and light, with a tangy dip.", "", ""],
        ["Veg Manchurian Dry", "Indo-Chinese classic with a garlic and soy glaze.", "₹265", ""],
        ["Chicken Seekh Kebab", "Minced chicken kebabs grilled on skewers.", "₹440", ""]
      ]
    },
    "Main course": {
      img: "img/platter.jpg", alt: "Platter of grilled starters and salad",
      items: [
        ["Butter Chicken", "Creamy tomato gravy with tandoor-grilled chicken.", "", "Must try"],
        ["Chicken Tikka Lababdar", "Chicken tikka in a rich, mildly spiced gravy.", "", ""],
        ["Mutton Rara", "Minced mutton and mutton pieces in one thick gravy.", "₹550", ""],
        ["Subz Miloni", "Mixed vegetables in a smooth, creamy gravy.", "₹350", ""]
      ]
    },
    "Breads": {
      img: "img/indoor-dining.jpg", alt: "Qaenat indoor dining area",
      items: [
        ["Pyaz Hari Mirch Ki Roti", "Roti stuffed with onion and green chilli. A Qaenat original.", "₹55", "Only here"],
        ["Cheese Stuffed Garlic Naan", "Garlic naan with melted cheese inside.", "₹130", ""],
        ["Lachha Parantha", "Flaky, layered whole wheat parantha.", "", ""]
      ]
    },
    "Fast food": {
      img: "img/starter-live.jpg", alt: "Spicy starter plate",
      items: [
        ["Grilled Sandwiches", "Toasted, filled and served hot.", "", ""],
        ["Peri Peri Fries", "Crisp fries tossed in peri peri seasoning.", "", ""]
      ]
    },
    "Desserts": {
      img: "img/gulab-jamun.jpg", alt: "Gulab jamun served in creamy rabri with pistachio",
      items: [
        ["Gulab E Gulkand", "A rose-petal gulkand twist on gulab jamun.", "₹195", "Premium"],
        ["Shahi Tukda", "Fried bread in saffron rabri.", "₹165", ""]
      ]
    },
    "Drinks": {
      img: "img/mocktails.jpg", alt: "Three colourful mocktails on the bar counter",
      items: [
        ["Watermelon Mocktail", "Fresh and cooling. Our signature drink.", "", "Signature"],
        ["Blue and orange coolers", "Bright, fruity mocktails from the bar. Ask your server for today's flavours.", "", ""]
      ]
    }
  };

  var tabs = $("#menuTabs"), list = $("#dishList"), menuImg = $("#menuImg");
  var keys = Object.keys(MENU);

  function renderMenu(k) {
    var m = MENU[k];
    menuImg.style.opacity = 0;
    setTimeout(function () {
      menuImg.src = m.img; menuImg.alt = m.alt; menuImg.style.opacity = 1;
    }, 180);
    list.innerHTML = m.items.map(function (d) {
      return '<li class="dish"><h3>' + d[0] + (d[3] ? ' <span class="badge">' + d[3] + '</span>' : '') + '</h3>' +
        (d[2] ? '<span class="price">' + d[2] + '</span>' : '<span></span>') +
        '<p>' + d[1] + '</p></li>';
    }).join("");
    $$(".tab", tabs).forEach(function (t) { t.setAttribute("aria-selected", t.dataset.k === k); });
  }

  keys.forEach(function (k, idx) {
    var b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.setAttribute("role", "tab"); b.dataset.k = k; b.textContent = k;
    b.addEventListener("click", function () { renderMenu(k); });
    tabs.appendChild(b);
  });
  renderMenu(keys[0]);

  /* ---------- Gallery + lightbox ---------- */
  var GALLERY = [
    ["img/rooftop-night.jpg", "The terrace on a busy night"],
    ["img/cocktails.jpg", "Cocktails with the city behind"],
    ["img/birthday-setup.jpg", "Birthday decor setup"],
    ["img/arch-seating.jpg", "Under the white arches"],
    ["img/live-band.jpg", "Live music under the palms"],
    ["img/skyline-stairs.jpg", "Rohtak lights from the rooftop"],
    ["img/paneer-tikka.jpg", "Paneer tikka"],
    ["img/mocktails.jpg", "Mocktails from the bar"],
    ["img/logo-neon.jpg", "The Qaenat neon sign"],
    ["img/indoor-dining.jpg", "Indoor dining area"],
    ["img/gulab-jamun.jpg", "Gulab jamun in rabri"],
    ["img/arch-night.jpg", "A table for two, after dark"]
  ];
  var grid = $("#galleryGrid"), lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  var lastFocus = null;

  GALLERY.forEach(function (g) {
    var b = document.createElement("button");
    b.className = "g-item"; b.type = "button"; b.dataset.cap = g[1]; b.setAttribute("aria-label", "Open photo: " + g[1]);
    b.innerHTML = '<img src="' + g[0] + '" alt="' + g[1] + '">';
    b.addEventListener("click", function () {
      lastFocus = b;
      lbImg.src = g[0]; lbImg.alt = g[1]; lbCap.textContent = g[1];
      lb.classList.add("open"); $("#lbClose").focus();
    });
    grid.appendChild(b);
  });
  function closeLb() { lb.classList.remove("open"); if (lastFocus) lastFocus.focus(); }
  $("#lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (lb.classList.contains("open")) closeLb(); closeChat(); setNav(false); }
  });

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Star rating text ---------- */
  var ratingWords = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very good", 5: "Excellent" };
  $$("#rating input").forEach(function (r) {
    r.addEventListener("change", function () { $("#ratingText").textContent = ratingWords[r.value]; });
  });

  function showMsg(box, type, text) {
    box.className = "form-msg show " + type;
    box.textContent = text;
  }

  /* ---------- Feedback form ---------- */
  $("#feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var box = $("#fbMsgBox");
    var rating = ($("input[name=rating]:checked", this) || {}).value;
    var name = $("#fbName").value.trim();
    var msg = $("#fbMsg").value.trim();
    if (!rating) return showMsg(box, "err", "Please choose a star rating first.");
    if (!name) return showMsg(box, "err", "Please enter your name.");

    var text = "New feedback for Qaenat\nRating: " + rating + "/5 (" + ratingWords[rating] + ")\nName: " + name +
      ($("#fbPhone").value.trim() ? "\nPhone: " + $("#fbPhone").value.trim() : "") +
      (msg ? "\nMessage: " + msg : "");
    try {
      var saved = JSON.parse(localStorage.getItem("qaenat_feedback") || "[]");
      saved.push({ rating: +rating, name: name, message: msg, at: new Date().toISOString() });
      localStorage.setItem("qaenat_feedback", JSON.stringify(saved));
    } catch (err) { /* storage unavailable, ignore */ }

    showMsg(box, "ok", "Thank you, " + name + ". Your " + rating + "-star feedback is saved. Opening WhatsApp so you can send it to the manager.");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    this.reset(); $("#ratingText").textContent = "";
  });

  /* ---------- Booking / contact form ---------- */
  var dateInput = $("#cDate");
  var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  dateInput.min = t.toISOString().slice(0, 10);

  $("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var box = $("#cMsgBox");
    var name = $("#cName").value.trim(), phone = $("#cPhone").value.trim().replace(/\s+/g, "");
    var date = dateInput.value, guests = $("#cGuests").value;
    if (!name) return showMsg(box, "err", "Please enter your name.");
    if (!/^[+]?\d{10,13}$/.test(phone)) return showMsg(box, "err", "Please enter a valid phone number, 10 digits.");
    if (!date) return showMsg(box, "err", "Please choose a date.");
    if (!guests || +guests < 1) return showMsg(box, "err", "Please enter the number of guests.");

    var prettyDate = new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    var note = $("#cNote").value.trim();
    var text = "Table booking request\nName: " + name + "\nPhone: " + phone + "\nDate: " + prettyDate +
      "\nGuests: " + guests + "\nOccasion: " + $("#cOcc").value + (note ? "\nNote: " + note : "");
    showMsg(box, "ok", "Thanks, " + name + ". Opening WhatsApp to send your request. We will confirm shortly.");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    this.reset();
  });

  /* ---------- AI chat widget (static, pre-written replies) ---------- */
  var chat = $("#chat"), chatOpenBtn = $("#chatOpen"), log = $("#chatLog"), chips = $("#chatChips"),
      chatForm = $("#chatForm"), chatInput = $("#chatInput");
  var greeted = false;

  var BOT = {
    hours: "We are open every day from 11:00 AM to 11:30 PM.",
    music: "Yes, live music plays every day from 8:00 PM. Some nights also have belly dance. Message us on WhatsApp to check what is planned for your date.",
    location: "Qaenat is at Dhouchak Complex, 75-R Part B, Power House Chowk, Near Tikona Park, Model Town, Rohtak 124001. The map is at the bottom of this page.",
    price: "A meal for two usually costs between ₹800 and ₹1200. Drinks and desserts are extra.",
    special: "Guests love the Qaenat Special Paneer, Kali Mirch Paneer, Butter Chicken and Paneer Takatak. Try the Pyaz Hari Mirch Ki Roti (₹55) too. It is a Qaenat original.",
    veg: "Yes, we have a big vegetarian menu: Qaenat Special Paneer, Paneer Takatak, Kali Mirch Paneer, Oregano Cheese, Subz Miloni, Golden Fried Baby Corn and more.",
    book: "You can book in two ways: use the Book a table form on this page, or WhatsApp us at +91 89505 09292. Please share the date, time, number of guests and occasion.",
    party: "We host birthdays, anniversaries and kitty parties with decoration setups. Share the date, headcount and any cake or decor request on WhatsApp and we will plan it with you.",
    contact: "Call or WhatsApp +91 89505 09292. We reply during opening hours, 11:00 AM to 11:30 PM.",
    cuisine: "We serve North Indian, Mughlai, Chinese and Continental, plus fast food like grilled sandwiches and peri peri fries.",
    chef: "Our head chef is Padam Singh. He is behind the Qaenat Special Paneer and the Qaenat Dal.",
    hi: "Hello! Welcome to Qaenat. Ask me about timings, live music, menu, prices, or booking a table.",
    fallback: "I am not sure about that one. Please WhatsApp us at +91 89505 09292 and the team will answer you directly."
  };

  var RULES = [
    [/^(hi|hello|hey|namaste|hii+)\b/i, "hi"],
    [/(time|timing|hour|open|close|kab|khul)/i, "hours"],
    [/(music|live|sing|singer|dj|belly|dance|event|tonight)/i, "music"],
    [/(where|address|location|map|reach|direction|kahan|kaha)/i, "location"],
    [/(price|cost|rate|budget|expensive|kitna|two people|for two)/i, "price"],
    [/(veg|paneer|jain)/i, "veg"],
    [/(special|best|famous|signature|recommend|must try|popular|dish)/i, "special"],
    [/(book|reserve|reservation|table|seat)/i, "book"],
    [/(birthday|party|kitty|anniversary|celebrat|decor|cake)/i, "party"],
    [/(phone|call|number|contact|whatsapp|talk)/i, "contact"],
    [/(cuisine|chinese|mughlai|north indian|continental|menu|food|serve)/i, "cuisine"],
    [/(chef|padam)/i, "chef"]
  ];

  var CHIPS = [
    ["Timings", "hours"], ["Live music", "music"], ["Best dishes", "special"],
    ["Price for two", "price"], ["Book a table", "book"], ["Location", "location"]
  ];

  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "msg " + who;
    d.innerHTML = text.replace(/\+91 89505 09292/g, '<a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+91 89505 09292</a>');
    if (who === "user") d.textContent = text;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  function botReply(key) {
    var typing = document.createElement("div");
    typing.className = "msg bot typing"; typing.innerHTML = "<i></i><i></i><i></i>";
    log.appendChild(typing); log.scrollTop = log.scrollHeight;
    setTimeout(function () { typing.remove(); addMsg(BOT[key] || BOT.fallback, "bot"); }, 650);
  }
  function ask(text) {
    if (!text) return;
    addMsg(text, "user");
    var key = "fallback";
    for (var i = 0; i < RULES.length; i++) { if (RULES[i][0].test(text)) { key = RULES[i][1]; break; } }
    botReply(key);
  }

  CHIPS.forEach(function (c) {
    var b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.textContent = c[0];
    b.addEventListener("click", function () { addMsg(c[0], "user"); botReply(c[1]); });
    chips.appendChild(b);
  });

  function openChat() {
    chat.classList.add("open"); chatOpenBtn.setAttribute("aria-expanded", "true");
    if (!greeted) { greeted = true; setTimeout(function () { addMsg("Hi! I am the Qaenat assistant. Ask me about timings, live music, menu, prices or booking.", "bot"); }, 250); }
    if (!window.matchMedia("(pointer: coarse)").matches) setTimeout(function () { chatInput.focus(); }, 300);
  }
  function closeChat() { chat.classList.remove("open"); chatOpenBtn.setAttribute("aria-expanded", "false"); }
  chatOpenBtn.addEventListener("click", function () { chat.classList.contains("open") ? closeChat() : openChat(); });
  $("#chatClose").addEventListener("click", closeChat);
  $("#dockChat").addEventListener("click", function () { chatOpenBtn.click(); });
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = chatInput.value.trim(); chatInput.value = ""; ask(v);
  });
})();
