IMAGES — READ ME FIRST
=======================

This site currently loads jewellery photos live from Unsplash
(images.unsplash.com), a free, no-attribution-required stock photo
library. They are NOT saved as files in this folder because the
build environment that generated this site has no internet access
to download images — it could only reference the direct photo
links. Nothing is stored as base64 either; every <img> tag simply
points to a normal external URL, so the HTML file itself stays
small and clean.

This is meant to be a placeholder step, not the final state. For
the real Jyoleri / Radha Jewellers site, swap these for actual
photographs of your own jewellery, shop front, and products.

HOW TO REPLACE WITH YOUR OWN PHOTOS
------------------------------------
1. Take photos of your jewellery (well-lit, plain background works
   best) and your showroom front.
2. Save them into this folder (img/) with clear names, e.g.:
     img/hero-bridal-set.jpg
     img/gold-necklace-1.jpg
     img/shop-front.jpg
     img/rashi-ratan-gems.jpg
3. Open index.html in a text editor, find each <img src="https://images.unsplash.com/...">
   tag, and change the src to your local path, e.g.:
     <img src="img/hero-bridal-set.jpg" alt="...">
4. Keep the "alt" text descriptive — it helps with Google SEO
   (e.g. "Hallmark gold bridal necklace set Kharkhoda").
5. Compress large photos before uploading (aim for under 300KB each)
   so the site stays fast on mobile — tools like TinyPNG or Squoosh
   work well.

WHERE EACH IMAGE IS CURRENTLY USED (Unsplash links, free license)
--------------------------------------------------------------------
- Hero small frame + Bridal collection card:
  https://images.unsplash.com/photo-1769103638683-6391a4490ec6
  (Woman in traditional attire with a tiara — Photo by AJOY DAS)

- About/Legacy large photo + Gold Jewellery collection card:
  https://images.unsplash.com/photo-1586878340506-af074f2ee999
  (Gold bangles and a necklace on a tray — Photo by LUM3N)

- About/Legacy small photo + Silver Articles collection card:
  https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b
  (Close-up of a pearl necklace — Photo by Paige Johnson)

- Diamond & Platinum collection card + Rashi Ratan collection card:
  https://images.unsplash.com/photo-1551346261-e19dd7ae9587
  (Assorted ring collection — Photo by Stefano Intintoli)

All of the above are published under the Unsplash License (free to
use for commercial and non-commercial purposes, no permission or
attribution required) — see https://unsplash.com/license for the
full terms. Even so, real photos of YOUR actual jewellery and shop
will always convert better than stock photos, since customers in
Kharkhoda will recognise your real showroom and real designs.

FAVICON
-------
The little 💍 ring emoji used as the browser tab icon is generated
inline in index.html (no image file needed for it). If you'd like a
proper logo-based favicon instead, save a square PNG (e.g. 512x512)
as img/favicon.png and update the <link rel="icon"> tag in
index.html's <head> to point to it.
