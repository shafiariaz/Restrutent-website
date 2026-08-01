/* ==================================================================
   ZAHRA DINING — CART PAGE
   ------------------------------------------------------------------
   Vanilla JS. Renders the full cart (cart.html): every line item with
   its own quantity stepper and remove link, plus a summary card with
   the subtotal and a "Proceed to Checkout" button.

   Delivery fee and tax depend on the delivery option, which is chosen
   on the checkout page — so this page only shows the item subtotal,
   with a short note that delivery/tax are added at checkout.
   ================================================================== */

(function () {
  "use strict";

  if (!window.ZahraCart) {
    console.error("cart-page.js requires cart.js to be loaded first.");
    return;
  }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);

  function currency(amount) {
    const symbol = (window.ZAHRA_ORDER_CONFIG && window.ZAHRA_ORDER_CONFIG.currencySymbol) || "$";
    return symbol + Number(amount).toFixed(2);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function render() {
    const layout = $("#cartPageLayout");
    const listEl = $("#cartPageList");
    const summaryEl = $("#cartPageSummaryBody");
    const emptyEl = $("#cartPageEmpty");
    if (!layout || !listEl || !summaryEl || !emptyEl) return;

    const items = window.ZahraCart.getItems();

    if (items.length === 0) {
      layout.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    layout.hidden = false;
    emptyEl.hidden = true;

    listEl.innerHTML = items.map((item) => `
      <div class="cart-page-line" data-id="${escapeHtml(item.id)}">
        <div class="cart-page-img"><img src="${escapeHtml(item.image)}" alt="" loading="lazy"></div>
        <div class="cart-page-info">
          <h4>${escapeHtml(item.name)}</h4>
          ${item.unit ? `<div class="cart-line-unit">per ${escapeHtml(item.unit)}</div>` : ""}
          <div class="qty-stepper" style="margin-top:8px;">
            <button type="button" data-action="dec" data-id="${escapeHtml(item.id)}" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" data-action="inc" data-id="${escapeHtml(item.id)}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="cart-line-remove" data-action="remove" data-id="${escapeHtml(item.id)}">Remove</button>
        </div>
        <div class="cart-page-price">${currency(item.price)}</div>
        <div class="cart-page-linetotal">${currency(item.price * item.qty)}</div>
      </div>
    `).join("");

    const totals = window.ZahraCart.getTotals("delivery");
    summaryEl.innerHTML = `
      <div class="cart-totals-row"><span>Subtotal</span><span class="amount">${currency(totals.subtotal)}</span></div>
      <div class="cart-totals-row"><span>Delivery &amp; tax</span><span class="amount">Calculated at checkout</span></div>
      <div class="cart-totals-row cart-grand-total"><span>Estimated Total</span><span class="amount">${currency(totals.subtotal)}</span></div>
      <a href="checkout.html" class="btn btn-gold btn-full" style="margin-top:16px;">Proceed to Checkout</a>
      <a href="order.html" class="btn btn-outline btn-full" style="margin-top:10px;">Add More Items</a>
    `;
  }

  function wireInteractions() {
    const listEl = $("#cartPageList");
    if (!listEl) return;
    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      const action = btn.getAttribute("data-action");
      if (action === "inc") window.ZahraCart.changeQty(id, 1);
      if (action === "dec") window.ZahraCart.changeQty(id, -1);
      if (action === "remove") window.ZahraCart.removeItem(id);
    });
    window.addEventListener("zahra-cart-updated", render);
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    wireInteractions();
  });
})();
