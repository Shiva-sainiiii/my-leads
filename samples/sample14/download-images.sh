#!/usr/bin/env bash
# Downloads real, free-to-use jewellery photos from Unsplash's CDN into img/.
# Run this once after unzipping: bash download-images.sh
# Requires internet access + curl.

set -e
mkdir -p img
BASE="https://images.unsplash.com"

fetch () {
  local file="$1" id="$2" w="$3"
  echo "-> img/${file}"
  curl -sL "${BASE}/${id}?auto=format&fit=crop&w=${w}&q=80" -o "img/${file}"
}

# Hero
fetch "hero-jewellery.jpg"      "photo-1611652022419-a9419f74343d" 1800
# Gold collection
fetch "gold-rings.jpg"          "photo-1603561596112-0a132b757442" 1000
fetch "gold-wedding-set.jpg"    "photo-1600721391689-2564dd76f4b6" 1000
fetch "gold-bangles.jpg"        "photo-1622398925373-3f91b1e275f5" 1000
fetch "gold-daily-wear.jpg"     "photo-1620656798579-1984d9e87df7" 1000
# Diamond collection
fetch "diamond-ring.jpg"        "photo-1605100804763-247f67b3557e" 1000
fetch "diamond-kada.jpg"        "photo-1611591437281-460bfbe1220a" 1000
fetch "diamond-custom.jpg"      "photo-1515562141207-7a88fb7ce338" 1000
# Silver collection
fetch "silver-jewellery.jpg"    "photo-1611652022419-a9419f74343d" 1000
fetch "silver-rings.jpg"        "photo-1598560917505-59a3ad559071" 1000
fetch "silver-pooja-idol.jpg"   "photo-1567445125892-5b5c1a86ed6e" 1000
# Store / trust section
fetch "store-interior.jpg"      "photo-1573408301185-9146fe634ad0" 1400
fetch "craftsman-hands.jpg"     "photo-1617038260897-41a1f14a8ca0" 1000
# Testimonial avatars (generic portraits)
fetch "avatar-1.jpg"            "photo-1633332755192-727a05c4013d" 200
fetch "avatar-2.jpg"            "photo-1573497019940-1c28c88b4f3e" 200

echo ""
echo "All images downloaded into img/. You can now open index.html."
