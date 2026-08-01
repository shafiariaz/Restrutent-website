# Zahra Dining — Customization Guide

Welcome! This guide assumes zero coding experience. If you can edit a
text file, you can fully rebrand this template.

---

## 1. Open the project

You need two things:
1. A **text editor** — free options: VS Code, Notepad++, or even
   plain Notepad / TextEdit.
2. A **web browser** — Chrome, Safari, Edge, whatever you already use.

To preview the site, just double-click `index.html`. It opens directly
in your browser — no server, no install, nothing to run.

---

## 2. The only file you need to edit: `js/config.js`

Open `js/config.js` in your text editor. It's organized into 17
numbered sections, each with a comment explaining what it controls:

| Section | What it changes |
|---|---|
| 1. Brand | Restaurant name, tagline, logo, favicon |
| 2. Contact & Location | Phone, email, address |
| 3. Hours | Your opening hours table |
| 4. Social Links | Instagram, Facebook, TikTok, Yelp URLs |
| 5. Colors | Every color on the site |
| 6. Hero | Homepage banner images, headline, dish marquee |
| 7. About | Story section text, image, stats |
| 8. Featured Dishes | The 6 highlighted dishes |
| 9. Chef | Chef name, bio, photo |
| 10. Gallery | The photo grid |
| 11. Testimonials | Guest reviews |
| 12. Events | Your recurring events |
| 13. Catering | Catering blurb and packages |
| 14. Special Offers | Promo cards |
| 15. FAQ | Questions and answers |
| 16. Instagram Gallery | The 8-photo Instagram strip |
| 17. Full Menu | Every category and every dish |

**Rule of thumb:** find the text between quote marks `"like this"` and
replace it with your own. Don't delete the quote marks, commas, or
curly braces `{ }` — just change what's *inside* the quotes.

### Example: changing the restaurant name

```js
brand: {
  name: "Zahra Dining",          // ← change this
  tagline: "Where Every Meal Becomes a Memory.",  // ← and this
```

Becomes:

```js
brand: {
  name: "Bella Vista",
  tagline: "Taste the Tradition.",
```

Save the file, refresh `index.html` in your browser — done. The new
name now appears in the header, footer, browser tab, and everywhere
else it's used.

---

## 3. Changing colors

Section 5 of `config.js` controls every color on the site:

```js
colors: {
  bg:        "#14100D",   // page background
  bgAlt:     "#1C1610",   // alternating section background
  surface:   "#251D16",   // cards and panels
  gold:      "#C6A15B",   // primary accent color
  goldLight: "#E7CE99",   // hover / highlight
  wine:      "#7B2036",   // secondary accent (badges, newsletter band)
  ivory:     "#F4EAD9",   // main text color
  muted:     "#B6A794",   // secondary text color
},
```

Pick new hex colors from any color picker (Google "hex color picker")
and paste them in. The whole site updates automatically — buttons,
borders, hover states, everything.

**Tip:** for a lighter theme, try swapping `bg`/`bgAlt`/`surface` for
light values and `ivory`/`muted` for dark ones. Because every color is
a variable, this template can go from dark-luxury to bright-and-airy
without touching the CSS file.

---

## 4. Changing images

All images live as web links (URLs) inside `config.js` — there's
nothing to "upload." Every image in the template ships pointing to a
real, free stock photo from Unsplash so the site looks complete right
away.

### Option A — keep using web images (fastest)
Replace any Unsplash URL with a link to another image online. Free
sources: [unsplash.com](https://unsplash.com), [pexels.com](https://pexels.com).
Right-click any photo on those sites → "Copy image address" → paste
into `config.js` in place of the old link.

### Option B — use your own restaurant's photos (recommended for launch)
1. Put your photo files in the `/images/` folder (e.g. `images/hero-1.jpg`).
2. In `config.js`, replace the URL with the local path:
   ```js
   images: [
     "images/hero-1.jpg",
     "images/hero-2.jpg"
   ]
   ```
3. Do this for every section — hero, about, chef, gallery, menu,
   Instagram grid, catering, events.

**Why we recommend Option B before you go live:** the demo photos are
loaded from Unsplash's servers, not stored inside this template. That
keeps the download small, but it also means the images depend on your
internet connection and on Unsplash staying online. Your own hosted
photos load faster, never break, and make the site unmistakably yours.
See `images/image-credits.txt` for the full list of demo photo links
used throughout the template.

**If any demo image doesn't display** in your browser or preview tool,
it's almost always one of these — in order of likelihood:
- Your browser or an ad-blocker/privacy extension is blocking
  third-party images when opening the file directly (try disabling
  extensions or previewing after uploading to a real host)
- You're offline, or the specific Unsplash link changed
- A quick fix either way: switch that image to Option B above and
  point it at a local file instead.

---

## 5. Editing the menu

Section 17 (`menu`) is a list of categories. Each category looks like
this:

```js
{
  id: "pizza",
  label: "Pizza",
  items: [
    { name: "Margherita Reale", description: "San Marzano tomato, fior di latte, basil, EVOO", price: "$18", featured: true },
    { name: "Tartufo Bianco", description: "White truffle cream, wild mushroom, fontina, arugula", price: "$24" }
  ]
}
```

- **Add a dish:** copy an existing `{ name: ..., description: ..., price: ... }`
  line, paste it above or below, and change the text.
- **Remove a dish:** delete its whole `{ ... }` line.
- **Add a whole category:** copy an entire `{ id: ..., label: ..., items: [...] }`
  block (from one `{` to its matching `}`), paste it, and edit. It
  automatically appears as a new tab on the Menu section.
- **Mark a dish as a chef favorite:** add `featured: true` after the
  price (see the Margherita example above) — it adds a small gold
  star next to the name.

Watch your commas: every item except the *last* one in a list needs a
comma `,` after its closing `}`.

---

## 6. Changing hours, contact info, and social links

All three are near the top of `config.js` (sections 2–4) and follow
the same copy-and-edit pattern as everything else. The hours table,
footer, reservation section, contact section, and footer all pull
from these same few lines — update once, it changes everywhere.

---

## 7. The reservation & contact forms

Both forms are functional out of the box: when a visitor submits one,
their own email app opens with a message already filled in and
addressed to the email set in `js/config.js` under `contact.email`.
They just tap Send. **Before you publish the site, change
`contact.email` to your real inbox** — it currently points to the
placeholder `reservations@zahradining.com`.

This mailto approach needs no backend, no signup, and no monthly
cost — but it does rely on the visitor having an email app set up on
their device, and it doesn't give you a form log or auto-replies.

If you'd rather have submissions land directly in your inbox (or a
spreadsheet) without opening the visitor's email app, swap to a free
form backend instead:

1. Sign up at Formspree, Web3Forms, or Getform and get your endpoint
   URL / access key.
2. In `index.html`, change the `<form id="reservationForm">` and
   `<form id="contactForm">` tags to POST to that endpoint
   (`action="https://your-endpoint" method="POST"`).
3. In `js/script.js`, remove the `e.preventDefault()` line (and the
   `mailto:` redirect) inside `wireForms()` for that form, so the
   browser submits it normally to your new endpoint.

For an actual restaurant, you may prefer to replace these forms
entirely with an embedded OpenTable/Resy widget in the Reservation
section.

---

## 8. Folder structure reference

```
index.html                  ← the page itself (rarely needs editing)
css/style.css                ← design/layout (rarely needs editing)
js/config.js                 ← ⭐ edit this for all content changes
js/script.js                 ← the logic that reads config.js (rarely needs editing)
images/                      ← put your own photos here (optional)
images/image-credits.txt     ← list of demo Unsplash photos used
assets/                      ← extra files (fonts, docs) if you add any
documentation/                ← this guide
README.md                    ← quick overview
LICENSE.txt                  ← usage terms
```

---

## 9. Publishing the site

This is a static site — no database, no server-side code — so it can
be hosted almost anywhere:
- **Netlify** or **Vercel**: drag-and-drop the whole folder, live in seconds
- **GitHub Pages**: push the folder to a repository, enable Pages
- **Any shared web host**: upload all files via FTP to your `public_html`

---

## 10. Troubleshooting

| Problem | Fix |
|---|---|
| Colors didn't change | Make sure you saved `config.js` and did a hard refresh (Ctrl/Cmd + Shift + R) |
| Menu tab is empty | Check for a missing comma between items in that category |
| Page looks unstyled — plain white background, blue underlined links, huge un-cropped images | `css/style.css` and the `js/` folder got separated from `index.html`. This almost always happens when only `index.html` is copied/moved out of the extracted zip on its own. **Fix:** delete your copy, re-extract the zip fresh (right-click the .zip → *Extract All*), and open `index.html` **from inside that extracted folder** without moving it — the `css`, `js`, `images`, and `documentation` folders must stay sitting right next to it. |
| An image is broken | See section 4 above |
| Site doesn't update at all | You may be editing a duplicate/backup copy — check the file path in your browser's address bar matches where you saved `config.js` |

Enjoy building with Zahra Dining!
