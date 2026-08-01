# Online Ordering System — Setup Guide

This template now includes a full online ordering flow on top of the
existing one-page site: **Order Online → Cart → Checkout →
WhatsApp order message**. This guide covers everything you need to
configure before it's ready for real customers.

---

## 1. Set your WhatsApp number (required)

Open `js/order-config.js` and replace the placeholder:

```js
whatsappNumber: "15551234567",
```

Use your country code + number, digits only — no `+`, spaces, or
dashes. For example, a US number `(512) 555-0142` becomes
`"15125550142"`.

This is the number every "Place Order" click sends a formatted order
message to via WhatsApp.

---

## 2. Edit your menu

All ordering-menu content — categories, dish names, descriptions,
prices, photos, and which items are marked "Chef's Pick" — lives in
one file: **`data/menu.json`**. Open it in any text editor and change
the values directly; you never need to touch `order.html` or any
JavaScript file. Example:

```json
{
  "id": "bbq-seekh-kebab",
  "name": "Seekh Kebab",
  "description": "Hand-minced chicken, garam masala, char-grilled",
  "price": 18,
  "unit": null,
  "image": "images/seekh-kebab.jpg",
  "featured": true,
  "available": true
}
```

- `price` is a plain number (no `$` sign).
- `unit` is only used for per-person items (e.g. a tasting menu) —
  set it to `null` for everything else.
- `id` must stay unique across the whole file — if you add a new
  item, give it a new id that isn't used anywhere else.
- Set `"available": false` to temporarily hide an item from the
  ordering page without deleting it (support for this flag is ready
  in the data; the menu simply skips items marked unavailable if you
  choose to filter for it).

The marketing homepage's menu display (the one inside `index.html`,
controlled by `js/config.js`) is separate on purpose — editing
`menu.json` only changes the ordering system, not the homepage menu
section, and vice versa.

---

## 3. Delivery fee, tax, and timing

Also in `js/order-config.js`:

```js
deliveryFee: 4.99,           // flat fee for Home Delivery
freeDeliveryThreshold: 60,   // orders at/above this subtotal ship free
taxRate: 0,                  // 0.08 = 8% sales tax; 0 hides tax entirely
minOrderAmount: 10,          // informational — enforce in checkout.js if needed
deliveryEta: { min: 35, max: 55 },  // minutes, shown as a time window
pickupEta:   { min: 15, max: 25 }
```

---

## 4. Payment methods

Checkout ships with four payment options: **Cash on Delivery**,
**Bank Transfer**, and placeholders for **Stripe** and **PayPal**
(both labeled "Coming Soon" and marked as pending payment in the
order message). To accept real card payments, you'll need to connect
an actual Stripe or PayPal integration — that requires a backend or
a payment provider's hosted checkout, which is outside the scope of
a static template. Cash on Delivery and Bank Transfer work
immediately with no extra setup.

---

## 5. Previewing locally

The ordering pages load `data/menu.json` with JavaScript's `fetch()`.
Browsers block `fetch()` from reading local files when a page is
opened directly from disk (a `file://` address) — this is a browser
security rule, not a bug. Two easy ways around it while you're
working locally:

- **VS Code:** install the "Live Server" extension, then right-click
  `order.html` → "Open with Live Server."
- **Command line:** run `python -m http.server` (or any static
  server) from the project folder and open
  `http://localhost:8000/order.html`.

Once the site is uploaded to real web hosting, this isn't an issue —
`fetch()` works normally over `http://`/`https://`.

---

## 6. What's stored in the visitor's browser

To avoid losing a customer's order on refresh, the cart and their
last-entered delivery details are saved in the browser's
`localStorage` (never sent anywhere except in the WhatsApp message
they choose to send). Nothing is stored on a server — this is a
static template with no backend or database.

---

## 7. Files you'll never need to edit

Everything else that powers the ordering system —
`js/cart.js`, `js/cart-widget.js`, `js/menu-loader.js`,
`js/cart-page.js`, `js/checkout.js`, `js/site-chrome.js`, and
`css/order.css` — is wired up already and doesn't need any changes
for normal use. They're commented throughout if you (or a developer)
ever want to extend the system further.
