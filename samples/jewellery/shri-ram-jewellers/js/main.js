// ===================== Mobile nav =====================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open-mobile");
    navLinks.style.display = navLinks.classList.contains("open-mobile") ? "flex" : "";
    if (navLinks.classList.contains("open-mobile")) {
      navLinks.style.position = "absolute";
      navLinks.style.top = "72px";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "#fbf7f0";
      navLinks.style.flexDirection = "column";
      navLinks.style.padding = "20px 28px";
      navLinks.style.borderBottom = "1px solid rgba(31,24,21,0.12)";
      navLinks.style.gap = "18px";
    }
  });
}

// ===================== Collection category tabs =====================
const catTabs = document.querySelectorAll(".cat-tab");
const catPanels = document.querySelectorAll(".cat-panel");
catTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    catTabs.forEach((t) => t.classList.remove("active"));
    catPanels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// ===================== Feedback star rating =====================
const starButtons = document.querySelectorAll(".star-input button");
let selectedRating = 0;
starButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedRating = Number(btn.dataset.value);
    starButtons.forEach((b) => {
      b.classList.toggle("selected", Number(b.dataset.value) <= selectedRating);
    });
  });
});
const feedbackForm = document.getElementById("feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("feedback-msg");
    msg.textContent = selectedRating
      ? "Thank you for your " + selectedRating + "-star feedback!"
      : "Thank you for your feedback!";
    msg.style.display = "block";
    feedbackForm.reset();
    starButtons.forEach((b) => b.classList.remove("selected"));
    selectedRating = 0;
    setTimeout(() => { msg.style.display = "none"; }, 4000);
  });
}

// ===================== Contact form (bottom) =====================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-success").style.display = "block";
    contactForm.reset();
  });
}

// ===================== WhatsApp + AI Chatbot floating widgets =====================
const aiBtn = document.getElementById("ai-toggle");
const chatPanel = document.getElementById("chat-panel");
const chatClose = document.getElementById("chat-close");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send");
const chatQuick = document.getElementById("chat-quick");

// Static Q&A knowledge base — no live AI call, deterministic replies
const FAQ = [
  {
    keys: ["hour", "time", "open", "close", "timing"],
    reply: "We're open all 7 days, Monday to Sunday, from 9:00 AM to 8:30 PM."
  },
  {
    keys: ["address", "location", "where", "shop", "direction"],
    reply: "You'll find us at Shop no. 2, Button Factory, Ashok Nagar, Sonipat, Haryana - 131001."
  },
  {
    keys: ["price", "cost", "rate", "gold rate"],
    reply: "Gold and diamond rates change daily. Please call us at +91 94676 64009 for today's rate, or visit the store."
  },
  {
    keys: ["gold"],
    reply: "Our gold collection includes Gents Rings, Traditional Wedding Sets, Bangles, and Daily Wear Jewellery. Check the Collections section above!"
  },
  {
    keys: ["diamond"],
    reply: "We offer Certified Diamond Rings, Diamond Kadas, and Modern Customized Diamond Jewellery."
  },
  {
    keys: ["silver"],
    reply: "Our silver range covers Silver Jewellery, Gents Rings, and Pooja Idols."
  },
  {
    keys: ["custom", "customise", "customize", "order"],
    reply: "Yes, we take customized orders! Visit the store or call us at +91 94676 64009 to discuss your design."
  },
  {
    keys: ["repair", "fix", "service"],
    reply: "We provide jewellery repair services in-store. Bring your piece by any day of the week."
  },
  {
    keys: ["payment", "upi", "card", "pay"],
    reply: "We accept Credit Card, Debit Card, UPI, Google Pay, and NFC mobile payments."
  },
  {
    keys: ["contact", "phone", "call", "number"],
    reply: "You can reach us at +91 94676 64009, or use the contact form below."
  },
  {
    keys: ["trust", "since", "established", "old", "year"],
    reply: "Shri Ram Jewellers has been serving Sonipat since 2003 — that's 23+ years of trusted service."
  }
];
const DEFAULT_REPLY = "Thanks for reaching out! For detailed help, please call us at +91 94676 64009 or use the contact form below — our team will assist you personally.";

function findReply(text) {
  const lower = text.toLowerCase();
  for (const entry of FAQ) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.reply;
  }
  return DEFAULT_REPLY;
}

function appendMsg(text, who) {
  const div = document.createElement("div");
  div.className = "chat-msg " + who;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleUserMessage(text) {
  if (!text.trim()) return;
  appendMsg(text, "user");
  chatInput.value = "";
  setTimeout(() => {
    appendMsg(findReply(text), "bot");
  }, 500);
}

if (aiBtn) {
  aiBtn.addEventListener("click", () => {
    chatPanel.classList.toggle("open");
  });
}
if (chatClose) {
  chatClose.addEventListener("click", () => chatPanel.classList.remove("open"));
}
if (chatSendBtn) {
  chatSendBtn.addEventListener("click", () => handleUserMessage(chatInput.value));
}
if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessage(chatInput.value);
  });
}
if (chatQuick) {
  chatQuick.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => handleUserMessage(btn.textContent));
  });
}

// ===================== Active nav link highlight =====================
(function highlightNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
})();
