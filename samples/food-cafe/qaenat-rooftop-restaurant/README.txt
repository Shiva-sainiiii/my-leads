Qaenat Multicuisine Rooftop Restaurant - Website
=================================================
Kaise chalayein: index.html ko browser mein double-click karke kholein.
(Koi build/install nahi chahiye - plain HTML, CSS, JS.)

Files:
  index.html   - page structure
  style.css    - design (colors/fonts top par :root mein)
  script.js    - menu data, gallery, chatbot replies, forms
  img/         - saari images (base64 nahi, alag files)

Kya badalna ho to:
  - WhatsApp number: script.js mein  var WA = "918950509292";
    aur index.html mein wa.me/918950509292 links
  - Menu items/prices: script.js mein  MENU  object
  - Chatbot replies: script.js mein  BOT  object aur  RULES  list
  - Gallery photos: script.js mein  GALLERY  list (img/ mein file daalein)

Notes:
  - Fonts (Playfair Display, Figtree) aur Google Map internet se load hote hain.
  - Feedback aur booking forms WhatsApp par message bhejte hain (backend nahi).
  - Images chhoti (243px) hain - agar restaurant se high-res photos mil jayein
    to img/ mein same naam se replace kar dein, website apne aap sharp ho jayegi.
