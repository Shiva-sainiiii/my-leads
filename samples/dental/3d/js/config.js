// ==========================================================
//  CLIENT CONFIG — client ke liye sirf yahi file edit karo.
//  Logo: logo.text ya logo.image | Tooth GLB: assets/tooth.glb replace karo
//  Images: gallery.items[].src me apne paths daalo (assets/img/...)
// ==========================================================
export const siteConfig = {
  businessName: "YOUR CLINIC",
  logo: { text: "YOUR CLINIC", image: "" }, // image: "assets/logo.svg" (optional)
  model: { path: "assets/tooth.glb", overrideMaterial: true }, // false = GLB ka original material
  nav: [["HOME","#hero"],["ABOUT","#about"],["SERVICES","#services"],["DOCTORS","#why"],["CONTACT","#contact"]],
  hero: {
    eyebrow: "YOUR CLINIC",
    title: "YOUR SMILE\nDESERVES\nBETTER.",
    description: "Modern dental care designed around your comfort, confidence and long-term smile.",
    primaryCTA: "BOOK APPOINTMENT", secondaryCTA: "EXPLORE SERVICES",
    tag1: "ADVANCED DENTAL CARE", tag2: "COMFORT • PRECISION • CONFIDENCE", est: "EST. 20XX"
  },
  about: {
    title: "CARE THAT\nFEELS DIFFERENT.",
    text: "Thoughtful dental care combining modern technology, clinical precision and a comfortable patient experience at YOUR CLINIC.",
    stats: [{ value: "XX+", label: "PATIENTS" }, { value: "XX+", label: "YEARS" }, { value: "XX", label: "TREATMENTS" }]
  },
  services: [
    { name: "GENERAL DENTISTRY", desc: "YOUR SERVICES — short description." },
    { name: "COSMETIC DENTISTRY", desc: "YOUR SERVICES — short description." },
    { name: "DENTAL IMPLANTS", desc: "YOUR SERVICES — short description." },
    { name: "TEETH WHITENING", desc: "YOUR SERVICES — short description." },
    { name: "ORTHODONTICS", desc: "YOUR SERVICES — short description." },
    { name: "PREVENTIVE CARE", desc: "YOUR SERVICES — short description." }
  ],
  why: {
    title: "PRECISION.\nCOMFORT.\nCONFIDENCE.",
    features: [
      { title: "Modern Technology", text: "Placeholder — describe YOUR equipment." },
      { title: "Personalized Care", text: "Placeholder — describe YOUR approach." },
      { title: "Experienced Professionals", text: "Placeholder — introduce YOUR DENTIST." },
      { title: "Comfort-First Experience", text: "Placeholder — describe the patient journey." }
    ]
  },
  experience: {
    title: "A BETTER\nDENTAL EXPERIENCE.",
    items: [
      { title: "Comfortable treatment", text: "Placeholder text." },
      { title: "Modern equipment", text: "Placeholder text." },
      { title: "Clean environment", text: "Placeholder text." },
      { title: "Personalized care", text: "Placeholder text." }
    ]
  },
  testimonials: {
    title: "KIND\nWORDS.",
    items: [
      { quote: "Beautiful experience from start to finish.", author: "YOUR PATIENT" },
      { quote: "Demo testimonial — replace with a real review.", author: "YOUR PATIENT" },
      { quote: "Demo testimonial — replace with a real review.", author: "YOUR PATIENT" }
    ]
  },
  gallery: { title: "INSIDE\nTHE CLINIC.", items: [
    { src: "assets/img/clinic-1.jpg", label: "CLINIC INTERIOR" }, { src: "assets/img/clinic-2.jpg", label: "YOUR DENTIST" },
    { src: "assets/img/clinic-3.jpg", label: "TREATMENT" }, { src: "assets/img/clinic-4.jpg", label: "EQUIPMENT" },
    { src: "assets/img/clinic-5.jpg", label: "PATIENT EXPERIENCE" }
  ] },
  cta: { title: "READY FOR\nYOUR BEST SMILE?", primary: "BOOK YOUR VISIT", secondary: "CONTACT YOUR CLINIC" },
  contact: {
    name: "YOUR CLINIC", phone: "YOUR PHONE", email: "YOUR EMAIL", address: "YOUR ADDRESS",
    maps: "YOUR GOOGLE MAPS LINK", whatsapp: "YOUR WHATSAPP LINK", instagram: "YOUR INSTAGRAM LINK", facebook: "YOUR FACEBOOK LINK",
    formAction: "" // optional endpoint (Formspree etc). Khali = demo success message
  },
  beforeAfter: { title: "REAL\nRESULTS.", before: "assets/img/before.jpg", after: "assets/img/after.jpg", caption: "Placeholder — YOUR PATIENT case. Replace with real before / after photos." },
  feedback: { title: "RATE YOUR\nVISIT.", text: "Tell YOUR CLINIC how we did. It takes ten seconds." },
  map: { embed: "" }, // Google Maps > Share > Embed a map > src="..." wala URL yahan paste karo
  chatbot: {
    name: "YOUR CLINIC ASSISTANT", endpoint: "", // endpoint khali = scripted demo bot; baad me real AI API yahan jodo ({message} -> {reply})
    greeting: "Hi! I'm the virtual assistant for YOUR CLINIC. How can I help?",
    fallback: "Thanks for your question! Please call YOUR PHONE or use the appointment form and our team will help.",
    faqs: [
      { q: "Book an appointment", keys: ["book","appointment","visit","slot"], a: "You can book using the appointment form below — I'll take you there.", goto: "#contact" },
      { q: "Our services", keys: ["service","treatment","implant","whiten","braces","clean"], a: "We offer general & cosmetic dentistry, implants, whitening, orthodontics and preventive care.", goto: "#services" },
      { q: "Clinic timings", keys: ["time","timing","open","hour"], a: "YOUR TIMINGS — add clinic hours here." },
      { q: "Location", keys: ["where","location","address","map"], a: "YOUR ADDRESS — see the map section below.", goto: "#map" }
    ]
  },
  footer: { tagline: "Dental care designed around your smile." }
};
