/* ==================================================================
   ZAHRA DINING — CHECKOUT
   ------------------------------------------------------------------
   Vanilla JS. Powers checkout.html:
   - Renders the live order summary (items, subtotal, delivery fee,
     tax, grand total) and keeps it in sync with the chosen delivery
     option.
   - Shows/hides the delivery-address fields based on Home Delivery
     vs Pickup.
   - Validates the form with the browser's built-in validation (same
     approach already used by the reservation/contact forms).
   - On submit: saves the customer's details for next time, builds a
     unique order ID, opens a pre-filled WhatsApp message to the
     restaurant, clears the cart, and shows an order-confirmation
     screen with the estimated delivery/pickup time.
   ================================================================== */

(function () {
  "use strict";

  if (!window.ZahraCart || !window.ZahraCustomer || !window.ZahraLastOrder) {
    console.error("checkout.js requires cart.js to be loaded first.");
    return;
  }

  const CONFIG = window.ZAHRA_CONFIG || {};
  const ORDER_CONFIG = window.ZAHRA_ORDER_CONFIG || {};

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function currency(amount) {
    const symbol = ORDER_CONFIG.currencySymbol || "$";
    return symbol + Number(amount).toFixed(2);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function currentDeliveryOption() {
    const checked = $('input[name="deliveryOption"]:checked');
    return checked ? checked.value : "delivery";
  }
  function currentPaymentMethod() {
    const checked = $('input[name="paymentMethod"]:checked');
    return checked ? checked.value : "cod";
  }

  const PAYMENT_LABELS = {
    cod: "Cash on Delivery",
    bank: "Bank Transfer",
    stripe: "Card Payment (Stripe) — placeholder, payment pending",
    paypal: "PayPal — placeholder, payment pending"
  };

  /* ---------- ORDER SUMMARY ---------- */
  function renderSummary() {
    const body = $("#checkoutSummaryBody");
    const emptyNotice = $("#checkoutEmptyNotice");
    const formSection = $("#checkoutFormSection");
    if (!body) return;

    const items = window.ZahraCart.getItems();
    const summarySection = $("#checkoutSummarySection");

    if (items.length === 0) {
      if (emptyNotice) emptyNotice.hidden = false;
      if (formSection) formSection.hidden = true;
      if (summarySection) summarySection.hidden = true;
      body.innerHTML = "";
      return;
    }
    if (emptyNotice) emptyNotice.hidden = true;
    if (formSection) formSection.hidden = false;
    if (summarySection) summarySection.hidden = false;

    const deliveryOption = currentDeliveryOption();
    const totals = window.ZahraCart.getTotals(deliveryOption);

    const lines = items.map((item) => `
      <div class="summary-line">
        <div>
          <div class="summary-line-name">${escapeHtml(item.name)} &times; ${item.qty}</div>
          <div class="summary-line-meta">${currency(item.price)} each${item.unit ? " / " + escapeHtml(item.unit) : ""}</div>
        </div>
        <div class="summary-line-amount">${currency(item.price * item.qty)}</div>
      </div>
    `).join("");

    const totalsHtml = `
      <div class="cart-totals-row" style="margin-top:14px;"><span>Subtotal</span><span class="amount">${currency(totals.subtotal)}</span></div>
      <div class="cart-totals-row"><span>${deliveryOption === "pickup" ? "Pickup" : "Delivery Fee"}</span><span class="amount">${totals.deliveryFee > 0 ? currency(totals.deliveryFee) : "Free"}</span></div>
      ${ORDER_CONFIG.taxRate ? `<div class="cart-totals-row"><span>Tax</span><span class="amount">${currency(totals.tax)}</span></div>` : ""}
      <div class="cart-totals-row cart-grand-total"><span>Grand Total</span><span class="amount">${currency(totals.total)}</span></div>
    `;

    body.innerHTML = lines + totalsHtml;
  }

  /* ---------- DELIVERY OPTION TOGGLE ---------- */
  function wireDeliveryToggle() {
    const radios = $$('input[name="deliveryOption"]');
    const addressFields = $("#deliveryAddressFields");
    const addressInputs = addressFields ? $$("input, select", addressFields) : [];

    function apply() {
      const option = currentDeliveryOption();
      const isDelivery = option === "delivery";
      if (addressFields) addressFields.hidden = !isDelivery;
      addressInputs.forEach((input) => {
        if (input.dataset.requiredWhenDelivery === "true") input.required = isDelivery;
      });
      $$(".option-card").forEach((card) => {
        const input = $("input", card);
        if (input && input.name === "deliveryOption") card.classList.toggle("is-checked", input.checked);
      });
      renderSummary();
    }

    radios.forEach((r) => r.addEventListener("change", apply));
    apply();
  }

  /* ---------- PAYMENT METHOD CARDS ---------- */
  function wirePaymentToggle() {
    const radios = $$('input[name="paymentMethod"]');
    function apply() {
      $$(".option-card").forEach((card) => {
        const input = $("input", card);
        if (input && input.name === "paymentMethod") card.classList.toggle("is-checked", input.checked);
      });
    }
    radios.forEach((r) => r.addEventListener("change", apply));
    apply();
  }

  /* ---------- PREFILL FROM SAVED CUSTOMER INFO ---------- */
  function prefillForm() {
    const saved = window.ZahraCustomer.get();
    if (!saved) return;
    [
      ["coFullName", "fullName"], ["coPhone", "phone"], ["coEmail", "email"],
      ["coAddress", "address"], ["coCity", "city"], ["coPostalCode", "postalCode"],
      ["coNotes", "notes"]
    ].forEach(([id, key]) => {
      const input = $("#" + id);
      if (input && saved[key]) input.value = saved[key];
    });
    if (saved.deliveryOption) {
      const radio = $(`input[name="deliveryOption"][value="${saved.deliveryOption}"]`);
      if (radio) radio.checked = true;
    }
  }

  /* ---------- ORDER ID + ETA ---------- */
  function generateOrderId() {
    const ts = Date.now().toString().slice(-6);
    const rand = Math.floor(10 + Math.random() * 90);
    return `ZD-${ts}${rand}`;
  }

  function etaWindow(deliveryOption) {
    const range = deliveryOption === "pickup"
      ? (ORDER_CONFIG.pickupEta || { min: 15, max: 25 })
      : (ORDER_CONFIG.deliveryEta || { min: 35, max: 55 });
    const now = new Date();
    const from = new Date(now.getTime() + range.min * 60000);
    const to = new Date(now.getTime() + range.max * 60000);
    const fmt = (d) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `${fmt(from)} \u2013 ${fmt(to)}`;
  }

  /* ---------- WHATSAPP MESSAGE ---------- */
  function buildWhatsAppMessage(order) {
    const lines = [
      `New Order \u2014 ${CONFIG.brand ? CONFIG.brand.name : "Zahra Dining"}`,
      `Order ID: ${order.id}`,
      ``,
      `Customer Details`,
      `Name: ${order.customer.fullName}`,
      `Phone: ${order.customer.phone}`,
      `Email: ${order.customer.email}`,
      ``,
      order.delivery.option === "pickup"
        ? `Order Type: Pickup`
        : [`Order Type: Home Delivery`, `Address: ${order.delivery.address}, ${order.delivery.city} ${order.delivery.postalCode}`].join("\n"),
      ``,
      `Payment Method: ${PAYMENT_LABELS[order.payment] || order.payment}`,
      ``,
      `Order Items:`
    ];
    order.items.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.name} x${item.qty} \u2014 ${currency(item.price * item.qty)}`);
    });
    lines.push(``);
    lines.push(`Subtotal: ${currency(order.totals.subtotal)}`);
    lines.push(`${order.delivery.option === "pickup" ? "Pickup" : "Delivery Fee"}: ${order.totals.deliveryFee > 0 ? currency(order.totals.deliveryFee) : "Free"}`);
    if (ORDER_CONFIG.taxRate) lines.push(`Tax: ${currency(order.totals.tax)}`);
    lines.push(`Grand Total: ${currency(order.totals.total)}`);
    if (order.notes) { lines.push(``); lines.push(`Notes: ${order.notes}`); }
    lines.push(``);
    lines.push(`Estimated ${order.delivery.option === "pickup" ? "pickup" : "delivery"}: ${order.eta}`);
    return lines.join("\n");
  }

  /* ---------- COPY TO CLIPBOARD (mirrors the pattern used elsewhere on the site) ---------- */
  function copyToClipboard(text, triggerBtn) {
    const done = () => {
      if (!triggerBtn) return;
      const original = triggerBtn.textContent;
      triggerBtn.textContent = "Copied!";
      setTimeout(() => { triggerBtn.textContent = original; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (err) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  /* ---------- CONFIRMATION SCREEN ---------- */
  function showConfirmation(order, waUrl) {
    const formSection = $("#checkoutFormSection");
    const summarySection = $("#checkoutSummarySection");
    const confirmation = $("#orderConfirmation");
    if (formSection) formSection.hidden = true;
    if (summarySection) summarySection.hidden = true;
    if (!confirmation) return;
    confirmation.hidden = false;

    const setText = (sel, val) => { const n = $(sel, confirmation); if (n) n.textContent = val; };
    setText("#confOrderId", order.id);
    setText("#confEta", order.eta);
    setText("#confTotal", currency(order.totals.total));
    setText("#confType", order.delivery.option === "pickup" ? "Pickup" : "Home Delivery");

    const waLink = $("#confWaLink");
    if (waLink) waLink.href = waUrl;

    const msgBox = $("#confMessageText");
    if (msgBox) msgBox.value = buildWhatsAppMessage(order);
    const copyBtn = $("#confCopyBtn");
    if (copyBtn) copyBtn.addEventListener("click", () => copyToClipboard(msgBox.value, copyBtn));

    confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- SUBMIT ---------- */
  function wireSubmit() {
    const form = $("#checkoutForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.ZahraCart.isEmpty()) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const deliveryOption = currentDeliveryOption();
      const paymentMethod = currentPaymentMethod();
      const items = window.ZahraCart.getItems();
      const totals = window.ZahraCart.getTotals(deliveryOption);

      const customer = {
        fullName: $("#coFullName").value.trim(),
        phone: $("#coPhone").value.trim(),
        email: $("#coEmail").value.trim(),
        address: $("#coAddress") ? $("#coAddress").value.trim() : "",
        city: $("#coCity") ? $("#coCity").value.trim() : "",
        postalCode: $("#coPostalCode") ? $("#coPostalCode").value.trim() : "",
        deliveryOption
      };
      window.ZahraCustomer.save(customer);

      const order = {
        id: generateOrderId(),
        placedAt: new Date().toISOString(),
        customer,
        delivery: {
          option: deliveryOption,
          address: customer.address,
          city: customer.city,
          postalCode: customer.postalCode
        },
        payment: paymentMethod,
        notes: $("#coNotes") ? $("#coNotes").value.trim() : "",
        items,
        totals,
        eta: etaWindow(deliveryOption)
      };

      window.ZahraLastOrder.save(order);

      const message = buildWhatsAppMessage(order);
      const number = (ORDER_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "");
      const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

      window.ZahraCart.clear();
      // Open WhatsApp in a new tab so the visitor doesn't lose this
      // confirmation page — some browsers may block this popup if it
      // isn't allowed, so a manual "Open WhatsApp" button is also
      // shown on the confirmation screen as a fallback.
      window.open(waUrl, "_blank", "noopener");

      showConfirmation(order, waUrl);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    prefillForm();
    renderSummary();
    wireDeliveryToggle();
    wirePaymentToggle();
    wireSubmit();
    window.addEventListener("zahra-cart-updated", renderSummary);
  });
})();
