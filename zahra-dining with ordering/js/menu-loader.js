/* ==================================================================
   ZAHRA DINING — ORDER PAGE MENU LOADER
   ------------------------------------------------------------------
   Vanilla JS. Loads /data/menu.json and renders it as an orderable
   menu on order.html: a sticky category quick-nav plus a grid of
   item cards, each with a quantity stepper and an Add to Cart button.

   Menu content lives entirely in data/menu.json — to add a dish,
   change a price, or swap a photo, edit that file only. Nothing here
   needs to change.

   NOTE ON LOCAL PREVIEW: browsers block a webpage from reading local
   JSON files when it's opened directly from disk (a file:// address)
   instead of through a server. That's a browser security rule, not a
   bug in this code. It works normally once this site is uploaded to
   real hosting, or previewed locally with a tool like VS Code's
   "Live Server" extension. If the fetch below fails, a friendly
   on-page notice explains this instead of leaving a blank page.
   ================================================================== */

(function () {
  "use strict";

  if (!window.ZahraCart) {
    console.error("menu-loader.js requires cart.js to be loaded first.");
    return;
  }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);

  const PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  function currency(amount) {
    const symbol = (window.ZAHRA_ORDER_CONFIG && window.ZAHRA_ORDER_CONFIG.currencySymbol) || "$";
    return symbol + Number(amount).toFixed(2);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function renderCategoryNav(categories) {
    const nav = $("#categoryNavTrack");
    if (!nav) return;
    const visibleCats = categories.filter((cat) => cat.items.some((item) => item.available !== false));
    nav.innerHTML = visibleCats.map((cat, i) =>
      `<a href="#cat-${cat.id}" class="category-chip${i === 0 ? " is-active" : ""}" data-cat="${cat.id}">${escapeHtml(cat.label)}</a>`
    ).join("");

    nav.addEventListener("click", (e) => {
      const chip = e.target.closest(".category-chip");
      if (!chip) return;
      Array.from(nav.children).forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
    });

    // Keep the active chip in sync while the visitor scrolls the page.
    const sections = visibleCats.map((cat) => document.getElementById("cat-" + cat.id)).filter(Boolean);
    if (sections.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id.replace("cat-", "");
          Array.from(nav.children).forEach((c) => c.classList.toggle("is-active", c.dataset.cat === id));
        });
      }, { rootMargin: "-140px 0px -70% 0px" });
      sections.forEach((s) => observer.observe(s));
    }
  }

  function itemCard(item) {
    const priceHtml = item.unit
      ? `${currency(item.price)}<span class="order-item-unit">per ${escapeHtml(item.unit)}</span>`
      : currency(item.price);
    return `
      <div class="order-item-card" data-item-id="${escapeHtml(item.id)}">
        <div class="order-item-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">
          ${item.featured ? '<span class="order-item-featured">Chef\u2019s Pick</span>' : ""}
        </div>
        <div class="order-item-body">
          <div class="order-item-top">
            <h3>${escapeHtml(item.name)}</h3>
            <span class="order-item-price">${priceHtml}</span>
          </div>
          <p class="order-item-desc">${escapeHtml(item.description)}</p>
          <div class="order-item-actions">
            <div class="qty-stepper" data-role="stepper">
              <button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-value" data-role="qty">1</span>
              <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="btn-add-cart" data-action="add">
              <i class="icon" aria-hidden="true">${PLUS_ICON}</i><span>Add</span>
            </button>
          </div>
        </div>
      </div>`;
  }

  function renderMenu(categories) {
    const root = $("#orderMenuRoot");
    if (!root) return;
    root.innerHTML = categories.map((cat) => {
      const visibleItems = cat.items.filter((item) => item.available !== false);
      if (visibleItems.length === 0) return ""; // whole category hidden if every item is unavailable
      return `
      <section class="menu-section-block" id="cat-${cat.id}">
        <h2>${escapeHtml(cat.label)}</h2>
        <div class="order-grid">
          ${visibleItems.map(itemCard).join("")}
        </div>
      </section>
    `;
    }).join("");
  }

  function wireCardInteractions() {
    const root = $("#orderMenuRoot");
    if (!root) return;
    root.addEventListener("click", (e) => {
      const card = e.target.closest(".order-item-card");
      if (!card) return;
      const qtyEl = $('[data-role="qty"]', card);
      const action = e.target.closest("[data-action]") && e.target.closest("[data-action]").dataset.action;
      if (!action) return;

      if (action === "inc") {
        qtyEl.textContent = String(parseInt(qtyEl.textContent, 10) + 1);
      } else if (action === "dec") {
        const next = Math.max(1, parseInt(qtyEl.textContent, 10) - 1);
        qtyEl.textContent = String(next);
      } else if (action === "add") {
        const item = findItemById(card.dataset.itemId);
        if (!item) return;
        const qty = parseInt(qtyEl.textContent, 10) || 1;
        window.ZahraCart.addItem(item, qty);
        if (window.ZahraToast) window.ZahraToast.show(`${item.name} added to cart`);
        qtyEl.textContent = "1"; // reset the stepper for the next add
      }
    });
  }

  let flatItems = [];
  function findItemById(id) {
    return flatItems.find((i) => i.id === id);
  }

  function showLocalPreviewNotice() {
    const root = $("#orderMenuRoot");
    if (!root) return;
    root.innerHTML = `
      <div class="local-preview-notice">
        <strong>Menu preview unavailable from a local file.</strong><br>
        Your browser blocks pages opened directly from disk (a "file://" address)
        from reading data/menu.json — this is a browser security rule, not a bug.
        <br><br>
        To preview the full ordering page locally, open this folder with a local
        server (for example, VS Code's <strong>"Live Server"</strong> extension \u2014
        right-click order.html and choose "Open with Live Server"). Once this site
        is uploaded to your web hosting, the menu will load automatically.
      </div>`;
  }

  function init() {
    fetch("data/menu.json")
      .then((res) => {
        if (!res.ok) throw new Error("menu.json returned " + res.status);
        return res.json();
      })
      .then((data) => {
        const categories = data.categories || [];
        flatItems = categories.flatMap((c) => c.items);
        renderCategoryNav(categories);
        renderMenu(categories);
        wireCardInteractions();
      })
      .catch((err) => {
        console.error("Could not load menu.json:", err);
        showLocalPreviewNotice();
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
