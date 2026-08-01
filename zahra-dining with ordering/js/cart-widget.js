/* ==================================================================
   ZAHRA DINING — CART DRAWER WIDGET
   ------------------------------------------------------------------
   Vanilla JS. Builds the slide-out cart drawer once, on every page
   that includes this file, and keeps it (plus every cart badge on
   the page) in sync with js/cart.js.

   Any button with the class "js-cart-toggle" anywhere on the page
   opens the drawer — the header cart icon on every page already
   uses this class.

   Requires js/cart.js (and, for pricing, js/order-config.js) to be
   loaded first.
   ================================================================== */

(function () {
  "use strict";

  if (!window.ZahraCart) {
    console.error("cart-widget.js requires cart.js to be loaded first.");
    return;
  }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  function currency(amount) {
    const symbol = (window.ZAHRA_ORDER_CONFIG && window.ZAHRA_ORDER_CONFIG.currencySymbol) || "$";
    return symbol + Number(amount).toFixed(2);
  }

  /* ---------- BUILD DRAWER MARKUP (once) ---------- */
  function buildDrawer() {
    if ($("#cartDrawer")) return; // already built (e.g. hot navigation)

    const overlay = document.createElement("div");
    overlay.className = "cart-drawer-overlay";
    overlay.id = "cartDrawerOverlay";

    const drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.id = "cartDrawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "Shopping cart");
    drawer.innerHTML = `
      <div class="cart-drawer-head">
        <h2>Your Order</h2>
        <button type="button" class="cart-drawer-close" id="cartDrawerClose" aria-label="Close cart">
          <i class="icon" aria-hidden="true">${ICONS.close}</i>
        </button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody"></div>
      <div class="cart-drawer-foot" id="cartDrawerFoot"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    overlay.addEventListener("click", closeDrawer);
    $("#cartDrawerClose").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });
  }

  function openDrawer() {
    $("#cartDrawerOverlay").classList.add("is-open");
    $("#cartDrawer").classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    const overlay = $("#cartDrawerOverlay");
    const drawer = $("#cartDrawer");
    if (overlay) overlay.classList.remove("is-open");
    if (drawer) drawer.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  /* ---------- RENDER DRAWER CONTENT ---------- */
  function renderDrawer() {
    const body = $("#cartDrawerBody");
    const foot = $("#cartDrawerFoot");
    if (!body || !foot) return;

    const items = window.ZahraCart.getItems();

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-drawer-empty">
          <i class="icon" aria-hidden="true">${ICONS.cart}</i>
          <p>Your cart is empty.</p>
          <a href="order.html" class="btn btn-gold btn-small">Browse the Menu</a>
        </div>`;
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = items.map((item) => `
      <div class="cart-line" data-id="${escapeAttr(item.id)}">
        <div class="cart-line-img"><img src="${escapeAttr(item.image)}" alt="" loading="lazy"></div>
        <div class="cart-line-info">
          <h4>${escapeHtml(item.name)}</h4>
          ${item.unit ? `<div class="cart-line-unit">per ${escapeHtml(item.unit)}</div>` : ""}
          <div class="cart-line-price">${currency(item.price)}</div>
          <button type="button" class="cart-line-remove" data-action="remove" data-id="${escapeAttr(item.id)}">Remove</button>
        </div>
        <div class="cart-line-qty">
          <div class="qty-stepper">
            <button type="button" data-action="dec" data-id="${escapeAttr(item.id)}" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" data-action="inc" data-id="${escapeAttr(item.id)}" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    `).join("");

    const totals = window.ZahraCart.getTotals("delivery");
    foot.innerHTML = `
      <div class="cart-totals-row"><span>Subtotal</span><span class="amount">${currency(totals.subtotal)}</span></div>
      <div class="cart-totals-row cart-grand-total"><span>Total</span><span class="amount">${currency(totals.subtotal)}</span></div>
      <a href="checkout.html" class="btn btn-gold btn-full">Proceed to Checkout</a>
      <a href="cart.html" class="btn btn-outline btn-full" style="margin-top:10px;">View Full Cart</a>
      <p class="cart-drawer-note">Delivery fee and tax are calculated at checkout.</p>
    `;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function escapeAttr(str) { return escapeHtml(str); }

  /* ---------- BADGE ---------- */
  function renderBadges() {
    const count = window.ZahraCart.getCount();
    $$(".js-cart-count").forEach((badge) => {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  /* ---------- EVENTS ---------- */
  function wireDrawerInteractions() {
    document.addEventListener("click", (e) => {
      const toggle = e.target.closest(".js-cart-toggle");
      if (toggle) {
        e.preventDefault();
        renderDrawer();
        openDrawer();
        return;
      }
      const actionBtn = e.target.closest("[data-action]");
      if (actionBtn && actionBtn.closest("#cartDrawer")) {
        const id = actionBtn.getAttribute("data-id");
        const action = actionBtn.getAttribute("data-action");
        if (action === "inc") window.ZahraCart.changeQty(id, 1);
        if (action === "dec") window.ZahraCart.changeQty(id, -1);
        if (action === "remove") window.ZahraCart.removeItem(id);
      }
    });

    window.addEventListener("zahra-cart-updated", () => {
      renderBadges();
      renderDrawer();
    });
  }

  /* ---------- TOAST ("Added to cart") ---------- */
  let toastTimer = null;
  function showToast(message) {
    let toast = $("#zdToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "zd-toast";
      toast.id = "zdToast";
      toast.innerHTML = `<i class="icon" aria-hidden="true">${ICONS.check}</i><span id="zdToastText"></span>`;
      document.body.appendChild(toast);
    }
    $("#zdToastText", toast).textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }
  window.ZahraToast = { show: showToast };

  document.addEventListener("DOMContentLoaded", () => {
    buildDrawer();
    renderBadges();
    wireDrawerInteractions();
  });
})();
