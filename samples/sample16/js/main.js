(function () {
  "use strict";

  var WA_NUMBER = "918053709878";
  var PHONE = "+91 80537 09878";

  /* ---------- Header: solid after scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.getElementById("yr").textContent = new Date().getFullYear();

  /* ---------- Scroll-reveal ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(".reveal, .reveal-group");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, .reveal-group").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Pre-select room in the form from "Ask about this room" buttons ---------- */
  var roomSelect = document.getElementById("cRoom");
  document.querySelectorAll("[data-room]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var want = btn.getAttribute("data-room");
      for (var i = 0; i < roomSelect.options.length; i++) {
        if (roomSelect.options[i].text === want) { roomSelect.selectedIndex = i; break; }
      }
    });
  });

  /* ---------- Date inputs: no past dates, checkout after checkin ---------- */
  var cIn = document.getElementById("cIn");
  var cOut = document.getElementById("cOut");
  var today = new Date().toISOString().split("T")[0];
  cIn.min = today; cOut.min = today;
  cIn.addEventListener("change", function () {
    if (cIn.value) { cOut.min = cIn.value; if (cOut.value && cOut.value < cIn.value) cOut.value = cIn.value; }
  });

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  var formOk = document.getElementById("formOk");

  function setErr(input, bad) { input.closest(".field").classList.toggle("has-error", bad); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var phone = form.elements.phone;
    var nameBad = name.value.trim().length < 2;
    var digits = phone.value.replace(/\D/g, "");
    var phoneBad = digits.length < 10;
    setErr(name, nameBad);
    setErr(phone, phoneBad);
    if (nameBad || phoneBad) { (nameBad ? name : phone).focus(); return; }

    var lines = [
      "Hello Hotel L'AVENIR,",
      "Name: " + name.value.trim(),
      "Phone: " + phone.value.trim(),
      "Interested in: " + form.elements.room.value
    ];
    if (form.elements.checkin.value) lines.push("Check-in: " + form.elements.checkin.value);
    if (form.elements.checkout.value) lines.push("Check-out: " + form.elements.checkout.value);
    if (form.elements.message.value.trim()) lines.push("Message: " + form.elements.message.value.trim());

    formOk.classList.add("is-shown");
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    form.reset();
  });
  form.addEventListener("input", function (e) { if (e.target.closest(".has-error")) setErr(e.target, false); });

  /* ---------- Star rating ---------- */
  var starsWrap = document.getElementById("stars");
  var starsLabel = document.getElementById("starsLabel");
  var labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  var rating = 0;
  var starBtns = [];

  for (var s = 1; s <= 5; s++) {
    (function (n) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", "false");
      b.setAttribute("aria-label", n + " star" + (n > 1 ? "s" : "") + ", " + labels[n]);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg>';
      b.addEventListener("click", function () { setRating(n); });
      b.addEventListener("mouseenter", function () { paint(n); });
      b.addEventListener("focus", function () { paint(n); });
      starsWrap.appendChild(b);
      starBtns.push(b);
    })(s);
  }
  starsWrap.addEventListener("mouseleave", function () { paint(rating); });
  starsWrap.addEventListener("focusout", function () { paint(rating); });

  function paint(n) {
    starBtns.forEach(function (b, i) { b.classList.toggle("is-on", i < n); });
    starsLabel.textContent = n ? n + " of 5: " + labels[n] : "Choose a rating";
  }
  function setRating(n) {
    rating = n;
    starBtns.forEach(function (b, i) { b.setAttribute("aria-checked", String(i + 1 === n)); });
    paint(n);
    document.getElementById("ratingErr").style.display = "none";
  }

  // Arrow-key support for the radio group
  starsWrap.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); var n = Math.min(5, (rating || 0) + 1); setRating(n); starBtns[n - 1].focus(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); var m = Math.max(1, (rating || 2) - 1); setRating(m); starBtns[m - 1].focus(); }
  });

  document.getElementById("ratingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var err = document.getElementById("ratingErr");
    var ok = document.getElementById("ratingOk");
    if (!rating) { err.style.display = "block"; starBtns[0].focus(); return; }

    var name = document.getElementById("fName").value.trim() || "A guest";
    var text = document.getElementById("fText").value.trim();

    // Saved in this browser so it survives a refresh. Replace with a server call to collect feedback centrally.
    try {
      var list = JSON.parse(localStorage.getItem("lavenirFeedback") || "[]");
      list.push({ rating: rating, name: name, text: text, at: new Date().toISOString() });
      localStorage.setItem("lavenirFeedback", JSON.stringify(list));
    } catch (_) { /* storage may be blocked; the thank-you still shows */ }

    ok.innerHTML = "Thank you, " + escapeHtml(name) + ". You gave us " + rating + " out of 5.";
    ok.classList.add("is-shown");
    document.getElementById("fName").value = "";
    document.getElementById("fText").value = "";
    rating = 0; paint(0);
    starBtns.forEach(function (b) { b.setAttribute("aria-checked", "false"); });
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lastFocus = null;

  document.getElementById("galleryGrid").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-full]");
    if (!btn) return;
    lastFocus = btn;
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = btn.getAttribute("data-cap");
    lbCap.textContent = btn.getAttribute("data-cap");
    lb.classList.add("is-open");
    document.getElementById("lbClose").focus();
  });
  function closeLb() { lb.classList.remove("is-open"); if (lastFocus) lastFocus.focus(); }
  document.getElementById("lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });

  /* ---------- Chat assistant (static, pre-written replies) ---------- */
  var chat = document.getElementById("chat");
  var chatOpen = document.getElementById("chatOpen");
  var chatLog = document.getElementById("chatLog");
  var quick = document.getElementById("quick");
  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var greeted = false;

  var WA_LINK = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello Hotel L'AVENIR, I want to book a room.");

  // Each entry: keywords to match (lowercase, English + Hinglish) and a fixed reply.
  var KB = [
    { id: "price", q: "Room price", k: ["price", "rate", "cost", "tariff", "charge", "kitna", "kimat", "paisa", "rent", "budget", "cheap"],
      a: "Rooms cost about Rs 1,776 to Rs 1,885 a night for 2 adults, depending on the booking platform. Rates change by date, so call " + PHONE + " for today's price." },
    { id: "rooms", q: "Room types", k: ["room", "deluxe", "premium", "suite", "size", "kamra", "kamre", "sq"],
      a: "We have four room types:\nDeluxe Room, 144 sq. ft.\nSuper Deluxe, 224 sq. ft.\nLAVENIR Premium, 288 sq. ft.\nExecutive and Family Suites, with interconnecting rooms.\nAll have AC, TV, tea/coffee maker and an attached bathroom." },
    { id: "time", q: "Check-in time", k: ["check", "timing", "time", "arrive", "checkout", "kab", "samay"],
      a: "Check-in is from 12:00 PM. Check-out is by 11:00 AM. The front desk is open 24 hours." },
    { id: "couple", q: "Couple policy", k: ["couple", "unmarried", "id", "aadhar", "aadhaar", "local", "document", "proof"],
      a: "Unmarried couples are allowed, and local IDs are accepted." },
    { id: "food", q: "Restaurant", k: ["food", "restaurant", "eat", "menu", "dinner", "lunch", "breakfast", "khana", "room service", "cuisine"],
      a: "Our Come-N-Eat restaurant serves multi-cuisine food. Room service is available 24 hours." },
    { id: "banquet", q: "Banquet & events", k: ["banquet", "party", "hall", "event", "function", "wedding", "birthday", "conference", "seminar", "meeting", "shaadi"],
      a: "We have a banquet hall for parties and functions, and a dedicated conference room for seminars and meetings. Call " + PHONE + " to check dates and get a quote." },
    { id: "wifi", q: "Wi-Fi & parking", k: ["wifi", "wi-fi", "internet", "parking", "park", "car", "gaadi"],
      a: "Wi-Fi is free throughout the hotel, and parking is free on site." },
    { id: "loc", q: "Location", k: ["where", "address", "location", "map", "direction", "reach", "kahan", "distance", "bus", "station", "railway", "airport", "far"],
      a: "We are near Sheila Bypass Road, opposite Gulab Rewari, Jasbir Colony, Delhi Road, Rohtak 124001.\nBus stand: 2 km. Railway station: 4 km. Delhi airport: about 74 km. A paid airport shuttle is available.\nThe map is at the bottom of this page." },
    { id: "amen", q: "Amenities", k: ["amenit", "facility", "facilities", "lift", "elevator", "laundry", "power", "backup", "medical", "geyser", "hot water", "heater", "ac"],
      a: "Free Wi-Fi, free parking, lift, 24-hour front desk, 100% power backup, laundry, on-call medical help, room heater for winter and 24/7 hot water." },
    { id: "contact", q: "Phone & email", k: ["phone", "call", "number", "contact", "email", "mail", "baat"],
      a: "Phone: +91 80537 09878 or +91 89309 33933.\nEmail: lavenir3738@gmail.com" },
    { id: "book", q: "Book a room", k: ["book", "booking", "reserve", "reservation", "available", "availability", "avail"],
      a: "To book, call " + PHONE + " or message us on WhatsApp: <a href=\"" + WA_LINK + "\" target=\"_blank\" rel=\"noopener\">open WhatsApp</a>. You can also fill the enquiry form in the Contact section." }
  ];

  var GREET_WORDS = ["hi", "hello", "hey", "namaste", "hii", "helo"];
  var THANKS_WORDS = ["thanks", "thank", "thx", "shukriya", "dhanyavad"];

  function addMsg(text, who, html) {
    var d = document.createElement("div");
    d.className = "msg msg--" + who;
    if (html) d.innerHTML = text; else d.textContent = text;
    chatLog.appendChild(d);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function reply(userText) {
    var t = userText.toLowerCase();
    var words = t.split(/[^a-z0-9\u0900-\u097f]+/);

    if (words.some(function (w) { return THANKS_WORDS.indexOf(w) > -1; })) {
      return { text: "You are welcome. Call " + PHONE + " whenever you are ready to book." };
    }

    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.k.forEach(function (kw) {
        if (kw.length <= 3) { if (words.indexOf(kw) > -1) score += 2; }
        else if (t.indexOf(kw) > -1) score += 2;
      });
      if (score > bestScore) { best = item; bestScore = score; }
    });
    if (best) return { text: best.a, html: /<a /.test(best.a) };

    if (words.some(function (w) { return GREET_WORDS.indexOf(w) > -1; })) {
      return { text: "Hello. Ask me about rooms, prices, check-in, food, events or the location." };
    }
    return { text: "I don't have an answer for that. Please call " + PHONE + " or message us on WhatsApp: <a href=\"" + WA_LINK + "\" target=\"_blank\" rel=\"noopener\">open WhatsApp</a>.", html: true };
  }

  function ask(text) {
    if (!text.trim()) return;
    addMsg(text, "me");
    var r = reply(text);
    setTimeout(function () { addMsg(r.text, "bot", r.html); }, 380);
  }

  KB.slice(0, 6).forEach(function (item) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = item.q;
    b.addEventListener("click", function () { ask(item.q); });
    quick.appendChild(b);
  });

  function openChat() {
    chat.classList.add("is-open");
    chatOpen.setAttribute("aria-expanded", "true");
    if (!greeted) {
      greeted = true;
      addMsg("Hello, welcome to Hotel L'AVENIR. Ask about rooms, prices, check-in, food or events, or tap a question below.", "bot");
    }
    chatInput.focus();
  }
  function closeChat() {
    chat.classList.remove("is-open");
    chatOpen.setAttribute("aria-expanded", "false");
    chatOpen.focus();
  }
  chatOpen.addEventListener("click", function () { chat.classList.contains("is-open") ? closeChat() : openChat(); });
  document.getElementById("chatClose").addEventListener("click", closeChat);
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = chatInput.value;
    chatInput.value = "";
    ask(v);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("is-open")) closeLb();
    else if (chat.classList.contains("is-open")) closeChat();
  });
})();
