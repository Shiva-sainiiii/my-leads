# Shri Ram Jewellers — Website

A premium static website for Shri Ram Jewellers (Sonipat, Haryana).

## Getting started

Just unzip and open `index.html` — no build step, no server, no setup script.
All images load directly from Unsplash's CDN (verified, free-license photos),
so an internet connection is needed for images to display, but nothing needs to be
downloaded or run first. For local testing you can also run
`python3 -m http.server` in this folder and visit `http://localhost:8000`.

## Structure

```
index.html          Homepage — hero, collections, story, services, testimonials, contact
catalogue.html       Full catalogue page with search bar + category filters
css/style.css        All styles (single stylesheet, CSS custom properties for theming)
js/main.js            Shared behavior: nav, tabs, chatbot, star rating, contact form
js/catalogue.js       Catalogue search/filter logic + product data
```

## Features included

- Responsive premium design (maroon/gold jewellery-boutique theme, Playfair Display + Inter)
- WhatsApp floating widget — links directly to a pre-filled WhatsApp chat
- Floating AI assistant widget — static (offline) Q&A about hours, location, collections,
  no external API calls, works with zero setup
- Bottom contact form (name, phone, interest, message) with on-page confirmation
- 5-star customer feedback form + testimonials section (4.9★ / 280+ reviews)
- Collections section on homepage (tabs: Gold / Diamond / Silver) with "View Full Catalogue"
- Dedicated catalogue.html — search bar at top, category filter chips, all products listed
- Embedded Google Map for the store address
- All business info (address, phone, hours, socials) wired from the data you provided

## Editing content

- Business details, collections, and testimonials are written directly into the HTML —
  search for the relevant text in `index.html` / `catalogue.html` to edit.
- The catalogue product list is a JS array at the top of `js/catalogue.js` — add/edit/remove
  items there and the search/filter will pick them up automatically.
- The chatbot's static replies are in the `FAQ` array in `js/main.js`.
- Images are hotlinked from `images.unsplash.com` in each `<img src="...">` — swap any URL
  for your own product photography whenever you're ready (just replace the src, same `<img>` tags).

## Notes

- No image is a placeholder — every `<img>` points to a real, verified Unsplash photo.
- No base64 images are used anywhere.
