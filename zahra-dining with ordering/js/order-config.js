/* ==================================================================
   ZAHRA DINING — ONLINE ORDERING CONFIGURATION
   ------------------------------------------------------------------
   Edit THIS FILE to control how the online ordering system behaves:
   your WhatsApp number, delivery fee, tax rate, and estimated timing.

   This is separate from js/config.js on purpose — config.js controls
   the marketing site (hours, menu display, colors, etc.) and is never
   touched by the ordering system. This file only affects ordering.
   ================================================================== */

window.ZAHRA_ORDER_CONFIG = {

  /* ---------- WHATSAPP ---------- */
  // REQUIRED: replace with your real WhatsApp number before going live.
  // Country code + number, digits only — no "+", spaces or dashes.
  // Example for a US number (512) 555-0142 -> "15125550142"
  whatsappNumber: "15551234567",

  /* ---------- CURRENCY ---------- */
  currencySymbol: "$",

  /* ---------- CHARGES ---------- */
  // Flat delivery fee applied to Home Delivery orders.
  deliveryFee: 4.99,
  // Orders at or above this subtotal get free delivery. Set to a very
  // high number (e.g. 999999) to disable free delivery entirely.
  freeDeliveryThreshold: 60,
  // Sales tax as a decimal (0.08 = 8%). Set to 0 to hide/skip tax.
  taxRate: 0,
  // Smallest subtotal (before delivery/tax) allowed for checkout.
  minOrderAmount: 10,

  /* ---------- ESTIMATED TIMES (minutes from order placed) ---------- */
  deliveryEta: { min: 35, max: 55 },
  pickupEta:   { min: 15, max: 25 }
};
