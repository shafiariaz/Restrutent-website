/* ==================================================================
   ZAHRA DINING — SHARED PAGE CHROME (ordering pages only)
   ------------------------------------------------------------------
   Vanilla JS. Powers the header/footer on order.html, cart.html and
   checkout.html: brand name/logo, footer content, mobile nav, header
   scroll state, back-to-top, and the mobile call/WhatsApp bar.

   This is intentionally separate from js/script.js (which only runs
   on index.html and expects that page's specific sections) so the
   homepage's existing behaviour is never touched. Both files read
   from the same window.ZAHRA_CONFIG, so editing config.js updates
   every page at once.

   Every lookup below is null-safe: if a page doesn't include a given
   element, that step is simply skipped instead of throwing.
   ================================================================== */

(function () {
  "use strict";

  const CONFIG = window.ZAHRA_CONFIG;
  if (!CONFIG) {
    console.error("ZAHRA_CONFIG not found — make sure config.js loads before site-chrome.js");
    return;
  }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function setText(sel, value) { const n = $(sel); if (n && value != null) n.textContent = value; }
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M14 9h-2a2 2 0 0 0-2 2v9M9.5 13h4.5" stroke-linecap="round"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 3c.3 2 1.8 3.6 4 3.9v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 1 0 2 2.8V3z"/></svg>',
    yelp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3.5 2"/></svg>'
  };

  /* ---------- BRAND (header + footer) ---------- */
  function renderBrand() {
    setText("#brandName", CONFIG.brand.name);
    setText("#footerBrandName", CONFIG.brand.name);
    setText("#footerTagline", CONFIG.brand.tagline);
    setText("#footerCopyright", `\u00A9 ${new Date().getFullYear()} ${CONFIG.brand.name}. All rights reserved.`);

    if (CONFIG.brand.logoImage) {
      $$(".brand-mark").forEach((mark) => {
        mark.innerHTML = `<img src="${CONFIG.brand.logoImage}" alt="${CONFIG.brand.name} logo">`;
        mark.classList.add("brand-mark-image");
      });
    }
    if (CONFIG.brand.favicon) {
      const favEl = document.querySelector('link[rel="icon"]');
      if (favEl) favEl.href = CONFIG.brand.favicon;
    }
  }

  /* ---------- FOOTER HOURS / CONTACT / SOCIAL ---------- */
  function renderFooterHours() {
    const list = $("#footerHoursList");
    if (!list) return;
    list.innerHTML = "";
    CONFIG.hours.forEach((h) => list.appendChild(el("li", "", `${h.days}<span>${h.time}</span>`)));
  }

  function renderFooterContact() {
    const list = $("#footerContactList");
    if (!list) return;
    list.innerHTML = "";
    const rows = [
      { text: CONFIG.contact.address.full },
      { text: CONFIG.contact.phoneDisplay },
      { text: CONFIG.contact.email }
    ];
    rows.forEach((r) => list.appendChild(el("li", "", r.text)));
  }

  function renderSocialRow() {
    const wrap = $("#footerSocialRow");
    if (!wrap) return;
    wrap.innerHTML = "";
    CONFIG.social.forEach((s) => {
      const a = el("a", "", `<i class="icon" aria-hidden="true">${SOCIAL_ICONS[s.icon] || SOCIAL_ICONS.instagram}</i>`);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.name);
      wrap.appendChild(a);
    });
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  function wireScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? `${(h.scrollTop / max) * 100}%` : "0%";
    };
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- HEADER SCROLL STATE ---------- */
  function wireHeaderScroll() {
    const header = $("#siteHeader");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
    update();
    document.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  function wireMobileNav() {
    const toggle = $("#navToggle");
    const nav = $("#mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    $$("#mainNav a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- BACK TO TOP ---------- */
  function wireBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    const toggle = () => btn.classList.toggle("is-visible", window.scrollY > 500);
    toggle();
    document.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- MOBILE STICKY CALL / WHATSAPP BAR ---------- */
  function wireStickyMobileBar() {
    const callLink = $("#mobileCallLink");
    const waLink = $("#mobileWaLink");
    if (callLink) callLink.href = `tel:${CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`;
    if (waLink) waLink.href = `https://wa.me/${CONFIG.contact.phone.replace(/[^0-9]/g, "")}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const steps = [
      renderBrand, renderFooterHours, renderFooterContact, renderSocialRow,
      wireScrollProgress, wireHeaderScroll, wireMobileNav, wireBackToTop, wireStickyMobileBar
    ];
    steps.forEach((step) => {
      try { step(); } catch (err) { console.error("site-chrome init step failed:", step.name, err); }
    });
  });
})();
