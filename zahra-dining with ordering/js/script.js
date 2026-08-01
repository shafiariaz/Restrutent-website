/* ==================================================================
   ZAHRA DINING — SITE SCRIPT
   ------------------------------------------------------------------
   Vanilla JavaScript. No frameworks, no jQuery, no build step.
   Everything below reads from window.ZAHRA_CONFIG (js/config.js)
   and renders the page, then wires up interactions.

   Sections:
   1. Helpers
   2. Theme colors + meta from config
   3. Header / nav / brand / footer
   4. Hero (slides, marquee, quick-reserve)
   5. About (image + stats)
   6. Featured dishes
   7. Menu (tabs + item list)
   8. Chef
   9. Gallery + lightbox
   10. Reservation + contact info lists, social rows
   11. Forms (reservation, contact, newsletter, quick-reserve)
   12. Testimonials slider
   13. Events
   14. Catering
   15. Offers
   16. FAQ accordion
   17. Instagram grid
   18. Map embed
   19. Scroll effects (header, back-to-top, reveal-on-scroll)
   20. Init
   ================================================================== */

(function () {
  "use strict";

  const CONFIG = window.ZAHRA_CONFIG;
  if (!CONFIG) {
    console.error("ZAHRA_CONFIG not found — make sure config.js loads before script.js");
    return;
  }

  // Only now that we know JS is running do we let CSS pre-hide .reveal
  // elements for the fade-in effect. If this line never runs (script
  // blocked, error above, etc.) every section stays fully visible.
  document.documentElement.classList.add("js-anim");

  /* ---------- 1. HELPERS ---------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

const ICONS = {"star": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>", "clock": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>", "phone": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>", "calendar-check": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/><polyline points=\"9 15.5 11 17.5 15.5 13\"/></svg>", "calendar-days": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>", "magnifying-glass": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>", "magnifying-glass-plus": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"/><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"/></svg>", "user-group": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>", "arrow-up": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"5\"/><polyline points=\"5 12 12 5 19 12\"/></svg>", "tag": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"/><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"/></svg>", "plus": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>", "utensils": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2M5 11v11M15 2c-1.5 0-3 1.5-3 5s1 5 2 6v9\"/></svg>", "whatsapp": "<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2a10 10 0 0 0-8.94 14.5L2 22l5.5-1.06A10 10 0 1 0 12 2z\"/><path fill=\"#14100D\" d=\"M8.5 8.5c-.5 1 .3 2.7 1.5 4s3 2 4 1.5c.3-.15.5-.7.4-1.1l-.2-.6a.5.5 0 0 0-.6-.3l-.9.3a5 5 0 0 1-2-2l.3-.9a.5.5 0 0 0-.3-.6l-.6-.2c-.4-.1-.95.1-1.1.4z\"/></svg>", "envelope": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"M22 6l-10 7L2 6\"/></svg>", "location-dot": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>", "link": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>", "facebook-f": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M14 9h-2a2 2 0 0 0-2 2v9M9.5 13h4.5\" stroke-linecap=\"round\"/></svg>", "instagram": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4.2\"/><circle cx=\"17.3\" cy=\"6.7\" r=\"0.6\" fill=\"currentColor\" stroke=\"none\"/></svg>", "pinterest-p": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9 20c1-3 1.5-5.5 2-8M12 12c0 2 1.5 3 3 2.5 2-.7 2.5-3 2-4.7-.6-2-2.7-3-4.7-2.3-1.8.6-2.9 2.3-2.6 4\"/></svg>", "tiktok": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><path d=\"M16 3c.3 2 1.8 3.6 4 3.9v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 1 0 2 2.8V3z\"/></svg>", "x-twitter": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"4\" y1=\"4\" x2=\"20\" y2=\"20\"/><line x1=\"20\" y1=\"4\" x2=\"4\" y2=\"20\"/></svg>", "yelp": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 7v5l3.5 2\"/></svg>", "star-outline": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>"};
  function icon(name){ return ICONS[name] || ""; }

  function starIcons(count) {
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += `<i class="icon" aria-hidden="true">${icon(i < count ? "star" : "star-outline")}</i>`;
    }
    return out;
  }

  function socialIcon(name) {
    const map = {
      instagram: "instagram",
      facebook: "facebook-f",
      tiktok: "tiktok",
      yelp: "yelp",
      twitter: "x-twitter",
      pinterest: "pinterest-p"
    };
    return map[name] || "link";
  }

  /* ---------- 2. THEME COLORS + META ---------- */
  function applyTheme() {
    const root = document.documentElement.style;
    const c = CONFIG.colors;
    root.setProperty("--bg", c.bg);
    root.setProperty("--bg-alt", c.bgAlt);
    root.setProperty("--surface", c.surface);
    root.setProperty("--gold", c.gold);
    root.setProperty("--gold-light", c.goldLight);
    root.setProperty("--wine", c.wine);
    root.setProperty("--ivory", c.ivory);
    root.setProperty("--muted", c.muted);
    root.setProperty("--line", c.line);

    document.title = `${CONFIG.brand.name} — ${CONFIG.brand.tagline}`;
    const metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", CONFIG.brand.metaDescription);
    if (CONFIG.brand.favicon) {
      const favicon = $('link[rel="icon"]');
      if (favicon) favicon.setAttribute("href", CONFIG.brand.favicon);
    }
  }

  /* ---------- 3. HEADER / BRAND / FOOTER ---------- */
  function renderBrand() {
    $("#brandName").textContent = CONFIG.brand.name;
    $("#footerBrandName").textContent = CONFIG.brand.name;
    $("#footerTagline").textContent = CONFIG.brand.tagline;
    $("#footerCopyright").textContent = `© ${new Date().getFullYear()} ${CONFIG.brand.name}. All rights reserved.`;
    $("#instaHandleHeading").textContent = CONFIG.instagramHandle;

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

  function renderFooterHours() {
    const list = $("#footerHoursList");
    list.innerHTML = "";
    CONFIG.hours.forEach((h) => {
      const li = el("li", "", `${h.days}<span>${h.time}</span>`);
      list.appendChild(li);
    });
  }

  function renderFooterContact() {
    const list = $("#footerContactList");
    list.innerHTML = "";
    const rows = [
      { icon: "location-dot", text: CONFIG.contact.address.full },
      { icon: "phone", text: CONFIG.contact.phoneDisplay },
      { icon: "envelope", text: CONFIG.contact.email }
    ];
    rows.forEach((r) => {
      const li = el("li", "", `<i class="icon" aria-hidden="true" style="margin-right:8px;color:var(--gold)">${icon(r.icon)}</i>${r.text}`);
      list.appendChild(li);
    });
  }

  function renderSocialRow(containerId) {
    const wrap = $("#" + containerId);
    if (!wrap) return;
    wrap.innerHTML = "";
    CONFIG.social.forEach((s) => {
      const a = el("a", "", `<i class="icon" aria-hidden="true">${icon(socialIcon(s.icon))}</i>`);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.name);
      wrap.appendChild(a);
    });
  }

  /* ---------- 4. HERO ---------- */
  let heroIndex = 0;
  function renderHero() {
    $("#heroEyebrow").textContent = CONFIG.hero.eyebrow;
    $("#heroHeading").innerHTML = CONFIG.hero.heading;
    $("#heroSub").textContent = CONFIG.hero.subheading;

    const slidesWrap = $("#heroSlides");
    slidesWrap.style.backgroundImage = `url(${CONFIG.hero.images[0]})`;
    if (CONFIG.hero.images.length > 1) {
      setInterval(() => {
        heroIndex = (heroIndex + 1) % CONFIG.hero.images.length;
        slidesWrap.style.backgroundImage = `url(${CONFIG.hero.images[heroIndex]})`;
      }, 6000);
    }

    const track = $("#marqueeTrack");
    const items = CONFIG.hero.marquee;
    const doubled = items.concat(items); // seamless loop
    track.innerHTML = doubled.map((t) => `<span>${t}</span>`).join("");
  }

  /* ---------- 5. ABOUT ---------- */
  function renderAbout() {
    if (CONFIG.about.image) $("#aboutImage").src = CONFIG.about.image;
    const row = $("#statsRow");
    row.innerHTML = "";
    CONFIG.about.stats.forEach((s) => {
      const card = el("div", "stat-card", `<div class="stat-number" data-target="${s.number}">0</div><div class="stat-label">${s.label}</div>`);
      row.appendChild(card);
    });
    observeCounters();
  }

  function observeCounters() {
    const counters = $$(".stat-number");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
  }

  function animateCounter(node) {
    const raw = node.getAttribute("data-target");
    const numMatch = raw.match(/[\d.]+/);
    if (!numMatch) { node.textContent = raw; return; }
    const target = parseFloat(numMatch[0]);
    const suffix = raw.replace(numMatch[0], "");
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      node.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 6. FEATURED DISHES ---------- */
  function renderFeatured() {
    const grid = $("#featuredGrid");
    grid.innerHTML = "";
    CONFIG.featuredDishes.forEach((d) => {
      const card = el("article", "dish-card", `
        <div class="dish-card-media"><img src="${d.image}" alt="${d.name}" loading="lazy"></div>
        <div class="dish-card-body">
          <h3>${d.name}</h3>
          <p>${d.description}</p>
        </div>`);
      grid.appendChild(card);
    });
  }

  /* ---------- 7. MENU ---------- */
  function renderMenu() {
    const tabsWrap = $("#menuTabs");
    const panel = $("#menuPanel");
    tabsWrap.innerHTML = "";

    CONFIG.menu.forEach((cat, i) => {
      const num = String(i + 1).padStart(2, "0");
      const tab = el("button", "menu-tab" + (i === 0 ? " is-active" : ""),
        `<span class="tab-num">${num}</span> ${cat.label}`);
      tab.type = "button";
      tab.dataset.id = cat.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.addEventListener("click", () => activateTab(cat.id));
      tabsWrap.appendChild(tab);
    });

    function activateTab(id) {
      $$(".menu-tab", tabsWrap).forEach((t) => {
        const active = t.dataset.id === id;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      const cat = CONFIG.menu.find((c) => c.id === id);
      panel.innerHTML = "";

      const grid = el("div", "menu-card-grid");
      cat.items.forEach((item) => {
        const card = el("article", "menu-food-card", `
          <div class="menu-food-media">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            ${item.featured ? `<span class="menu-food-badge"><i class="icon" aria-hidden="true">${icon("star")}</i> Chef Favorite</span>` : ""}
            <button type="button" class="menu-food-quickview" aria-label="Quick view of ${item.name}"><i class="icon" aria-hidden="true">${icon("magnifying-glass-plus")}</i></button>
          </div>
          <div class="menu-food-body">
            <div class="menu-food-top">
              <h3>${item.name}</h3>
              <span class="menu-food-price">${item.price}</span>
            </div>
            <p>${item.description}</p>
          </div>`);
        card.querySelector(".menu-food-quickview").addEventListener("click", () => openQuickView(item, cat.label));
        card.querySelector(".menu-food-media").addEventListener("click", (e) => {
          if (e.target.closest(".menu-food-quickview")) return;
          openQuickView(item, cat.label);
        });
        grid.appendChild(card);
      });
      panel.appendChild(grid);
    }

    activateTab(CONFIG.menu[0].id);
  }

  /* ---------- 7b. MENU QUICK VIEW ---------- */
  function openQuickView(item, catLabel) {
    $("#qvImg").src = item.image;
    $("#qvImg").alt = item.name;
    $("#qvCategory").textContent = catLabel;
    $("#qvName").textContent = item.name;
    $("#qvDesc").textContent = item.description;
    $("#qvPrice").textContent = item.price;
    $("#menuQuickview").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeQuickView() {
    $("#menuQuickview").hidden = true;
    document.body.style.overflow = "";
  }
  function wireQuickView() {
    $("#qvClose").addEventListener("click", closeQuickView);
    $("#qvReserveBtn").addEventListener("click", closeQuickView);
    $("#menuQuickview").addEventListener("click", (e) => { if (e.target.id === "menuQuickview") closeQuickView(); });
    document.addEventListener("keydown", (e) => {
      if ($("#menuQuickview").hidden) return;
      if (e.key === "Escape") closeQuickView();
    });
  }

  /* ---------- 8. CHEF ---------- */
  function renderChef() {
    const c = CONFIG.chef;
    $("#chefName").textContent = c.name;
    $("#chefTitle").textContent = c.title;
    $("#chefQuote").innerHTML = `&ldquo;${c.quote}&rdquo;`;
    $("#chefBio").textContent = c.bio;
    if (c.image) $("#chefImage").src = c.image;
  }

  /* ---------- 9. GALLERY + LIGHTBOX ---------- */
  let lightboxIndex = 0;
  function renderGallery() {
    const grid = $("#galleryGrid");
    grid.innerHTML = "";
    CONFIG.gallery.forEach((g, i) => {
      const item = el("div", "gallery-item", `
        <img src="${g.image}" alt="${g.caption}" loading="lazy">
        <div class="gallery-item-overlay"><span>${g.caption}</span></div>`);
      item.addEventListener("click", () => openLightbox(i));
      grid.appendChild(item);
    });
  }

  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    $("#lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    $("#lightbox").hidden = true;
    document.body.style.overflow = "";
  }
  function updateLightbox() {
    const item = CONFIG.gallery[lightboxIndex];
    $("#lightboxImg").src = item.image;
    $("#lightboxImg").alt = item.caption;
    $("#lightboxCaption").textContent = item.caption;
  }
  function lightboxStep(dir) {
    lightboxIndex = (lightboxIndex + dir + CONFIG.gallery.length) % CONFIG.gallery.length;
    updateLightbox();
  }

  function wireLightbox() {
    $("#lightboxClose").addEventListener("click", closeLightbox);
    $("#lightboxPrev").addEventListener("click", () => lightboxStep(-1));
    $("#lightboxNext").addEventListener("click", () => lightboxStep(1));
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxStep(-1);
      if (e.key === "ArrowRight") lightboxStep(1);
    });
  }

  /* ---------- 10. INFO LISTS ---------- */
  function renderInfoLists() {
    const rows = [
      { icon: "location-dot", text: CONFIG.contact.address.full },
      { icon: "phone", text: CONFIG.contact.phoneDisplay },
      { icon: "envelope", text: CONFIG.contact.email },
      { icon: "clock", text: CONFIG.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") }
    ];
    ["reservationInfoList", "contactInfoList"].forEach((id) => {
      const list = $("#" + id);
      list.innerHTML = "";
      rows.forEach((r) => {
        list.appendChild(el("li", "", `<i class="icon" aria-hidden="true">${icon(r.icon)}</i><span>${r.text}</span>`));
      });
    });
  }

  /* ---------- 11. FORMS ---------- */
  function todayISO() {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }

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
    ta.focus();
    ta.select();
    try { document.execCommand("copy"); done(); } catch (err) { /* no-op */ }
    document.body.removeChild(ta);
  }

  function wireForms() {
    const minDate = todayISO();
    ["qrDate", "resDate"].forEach((id) => {
      const input = $("#" + id);
      if (input) input.min = minDate;
    });

    // Quick reserve bar -> scroll to full reservation form and prefill
    $("#quickReserveForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const date = $("#qrDate").value;
      const time = $("#qrTime").value;
      const guests = $("#qrGuests").value;
      if ($("#resDate")) $("#resDate").value = date;
      if ($("#resTime") && time) $("#resTime").value = time;
      if ($("#resGuests") && guests) $("#resGuests").value = guests;
      document.getElementById("reservation").scrollIntoView({ behavior: "smooth" });
    });

    // Full reservation form
    const resForm = $("#reservationForm");
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!resForm.checkValidity()) { resForm.reportValidity(); return; }
      const lines = [
        `New table request from the website:`, ``,
        `Name: ${$("#resName").value}`,
        `Email: ${$("#resEmail").value}`,
        `Phone: ${$("#resPhone").value}`,
        `Guests: ${$("#resGuests").value}`,
        `Date: ${$("#resDate").value}`,
        `Time: ${$("#resTime").value}`,
        `Special requests: ${$("#resNotes").value || "—"}`
      ];
      const messageText = lines.join("\n");
      const subject = encodeURIComponent(`Table Reservation Request — ${$("#resName").value}`);
      const body = encodeURIComponent(messageText);
      const mailtoLink = `mailto:${CONFIG.contact.email}?subject=${subject}&body=${body}`;

      $("#reservationSuccessText").value = messageText;
      $("#reservationMailBtn").href = mailtoLink;
      $("#reservationAltContact").textContent = `${CONFIG.contact.email} · ${CONFIG.contact.phoneDisplay}`;
      $("#reservationSuccess").hidden = false;
      window.location.href = mailtoLink;
      // Note: the form is intentionally NOT reset here — mailto can fail silently
      // (e.g. no default mail app on the visitor's computer), so their typed
      // details stay visible in the copyable box above instead of vanishing.
    });
    const resCopyBtn = $("#reservationCopyBtn");
    if (resCopyBtn) {
      resCopyBtn.addEventListener("click", () => copyToClipboard($("#reservationSuccessText").value, resCopyBtn));
    }

    // Contact form (also used for catering quote requests via the "Request a Catering Quote" button)
    const contactForm = $("#contactForm");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      const lines = [
        `New message from the website contact form:`, ``,
        `Name: ${$("#cName").value}`,
        `Email: ${$("#cEmail").value}`,
        `Subject: ${$("#cSubject").value}`, ``,
        `Message:`, `${$("#cMessage").value}`
      ];
      const messageText = lines.join("\n");
      const subject = encodeURIComponent($("#cSubject").value || "Website Contact Form");
      const body = encodeURIComponent(messageText);
      const mailtoLink = `mailto:${CONFIG.contact.email}?subject=${subject}&body=${body}`;

      $("#contactSuccessText").value = messageText;
      $("#contactMailBtn").href = mailtoLink;
      $("#contactAltContact").textContent = `${CONFIG.contact.email} · ${CONFIG.contact.phoneDisplay}`;
      $("#contactSuccess").hidden = false;
      window.location.href = mailtoLink;
      // Form intentionally not reset here — see note in the reservation handler above.
    });
    const contactCopyBtn = $("#contactCopyBtn");
    if (contactCopyBtn) {
      contactCopyBtn.addEventListener("click", () => copyToClipboard($("#contactSuccessText").value, contactCopyBtn));
    }

    // Newsletter
    const newsForm = $("#newsletterForm");
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!newsForm.checkValidity()) { newsForm.reportValidity(); return; }
      $("#newsletterSuccess").hidden = false;
      newsForm.reset();
    });
  }

  /* ---------- 12. TESTIMONIALS SLIDER ---------- */
  let testiIndex = 0;
  let testiTimer = null;
  function renderTestimonials() {
    const track = $("#testimonialTrack");
    const dots = $("#testiDots");
    track.innerHTML = "";
    dots.innerHTML = "";
    CONFIG.testimonials.forEach((t, i) => {
      const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
      const card = el("div", "testimonial-card", `
        <div class="testimonial-avatar">${initials}</div>
        <div class="testimonial-stars">${starIcons(t.rating)}</div>
        <p class="testimonial-quote">&ldquo;${t.quote}&rdquo;</p>
        <div class="testimonial-name">${t.name}</div>
        <div class="testimonial-role">${t.role}</div>`);
      track.appendChild(card);

      const dot = el("button", "slider-dot" + (i === 0 ? " is-active" : ""));
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", () => goToTestimonial(i));
      dots.appendChild(dot);
    });

    $("#testiPrev").addEventListener("click", () => goToTestimonial(testiIndex - 1));
    $("#testiNext").addEventListener("click", () => goToTestimonial(testiIndex + 1));
    startTestiAutoplay();
  }

  function goToTestimonial(index) {
    const total = CONFIG.testimonials.length;
    testiIndex = (index + total) % total;
    $("#testimonialTrack").style.transform = `translateX(-${testiIndex * 100}%)`;
    $$(".slider-dot").forEach((d, i) => d.classList.toggle("is-active", i === testiIndex));
    restartTestiAutoplay();
  }
  function startTestiAutoplay() {
    testiTimer = setInterval(() => goToTestimonialSilent(testiIndex + 1), 6000);
  }
  function goToTestimonialSilent(index) {
    const total = CONFIG.testimonials.length;
    testiIndex = (index + total) % total;
    $("#testimonialTrack").style.transform = `translateX(-${testiIndex * 100}%)`;
    $$(".slider-dot").forEach((d, i) => d.classList.toggle("is-active", i === testiIndex));
  }
  function restartTestiAutoplay() {
    clearInterval(testiTimer);
    startTestiAutoplay();
  }

  /* ---------- 13. EVENTS ---------- */
  function renderEvents() {
    const grid = $("#eventsGrid");
    grid.innerHTML = "";
    CONFIG.events.forEach((ev) => {
      const card = el("article", "event-card", `
        <div class="event-card-media"><img src="${ev.image}" alt="${ev.title}" loading="lazy"></div>
        <div class="event-card-body">
          <div class="event-date">${ev.date}</div>
          <h3>${ev.title}</h3>
          <p>${ev.description}</p>
        </div>`);
      grid.appendChild(card);
    });
  }

  /* ---------- 14. CATERING ---------- */
  function renderCatering() {
    const c = CONFIG.catering;
    $("#cateringDesc").textContent = c.description;
    if (c.image) $("#cateringImage").src = c.image;
    const list = $("#packageList");
    list.innerHTML = "";
    c.packages.forEach((p) => {
      list.appendChild(el("div", "package-item", `
        <div><div class="package-item-name">${p.name}</div><div class="package-item-detail">${p.detail}</div></div>
        <div class="package-item-price">${p.price}</div>`));
    });
  }

  /* ---------- 15. OFFERS ---------- */
  function renderOffers() {
    if (CONFIG.offersBanner) {
      $("#offersBannerText").textContent = CONFIG.offersBanner.text;
      $("#offersBannerCta").textContent = CONFIG.offersBanner.cta;
    }
    const grid = $("#offersGrid");
    grid.innerHTML = "";
    CONFIG.offers.forEach((o) => {
      grid.appendChild(el("article", "offer-card", `
        <div class="offer-tag">${o.tag}</div>
        <h3>${o.title}</h3>
        <p>${o.description}</p>
        <div class="offer-value">${o.value}</div>`));
    });
  }

  /* ---------- 16. FAQ ---------- */
  function renderFAQ() {
    const list = $("#faqList");
    list.innerHTML = "";
    CONFIG.faq.forEach((item, i) => {
      const wrap = el("div", "faq-item");
      wrap.innerHTML = `
        <button class="faq-question" type="button" aria-expanded="false">
          ${item.question} <i class="icon" aria-hidden="true">${icon("plus")}</i>
        </button>
        <div class="faq-answer"><div class="faq-answer-inner">${item.answer}</div></div>`;
      const btn = $(".faq-question", wrap);
      const answer = $(".faq-answer", wrap);
      btn.addEventListener("click", () => {
        const isOpen = wrap.classList.contains("is-open");
        $$(".faq-item", list).forEach((other) => {
          other.classList.remove("is-open");
          $(".faq-question", other).setAttribute("aria-expanded", "false");
          $(".faq-answer", other).style.maxHeight = null;
        });
        if (!isOpen) {
          wrap.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
      list.appendChild(wrap);
    });
  }

  /* ---------- 17. INSTAGRAM GRID ---------- */
  function renderInstagram() {
    const grid = $("#instaGrid");
    grid.innerHTML = "";
    CONFIG.instagram.forEach((src) => {
      const a = el("a", "insta-item", `
        <img src="${src}" alt="Zahra Dining on Instagram" loading="lazy">
        <div class="insta-item-overlay"><i class="icon" aria-hidden="true">${icon("instagram")}</i></div>`);
      a.href = (CONFIG.social.find((s) => s.icon === "instagram") || {}).url || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      grid.appendChild(a);
    });
  }

  /* ---------- 18. MAP ---------- */
  function renderMap() {
    const query = encodeURIComponent(CONFIG.contact.mapQuery);
    $("#mapEmbed").src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const fallback = $("#mapFallbackLink");
    if (fallback) {
      fallback.href = `https://maps.google.com/maps?q=${query}`;
      fallback.querySelector(".icon").innerHTML = icon("location-dot");
    }
  }

  /* ---------- 19. SCROLL EFFECTS ---------- */
  function wireHeaderScroll() {
    const header = $("#siteHeader");
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    });

    // Scroll-spy: highlight the nav link for whichever section is in view
    const navLinks = $$("#mainNav a[href^='#']");
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  function wireMobileNav() {
    const toggle = $("#navToggle");
    const nav = $("#mainNav");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    $$("#mainNav a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    }));
  }

  function wireRevealOnScroll() {
    const targets = $$(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((t) => observer.observe(t));
  }

  /* ---------- 21. SCROLL PROGRESS BAR ---------- */
  function wireScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0%";
    };
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- 22. BACK TO TOP ---------- */
  function wireBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    const toggle = () => btn.classList.toggle("is-visible", window.scrollY > 600);
    document.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    toggle();
  }

  /* ---------- 23. STICKY MOBILE ACTION BAR ---------- */
  function wireStickyMobileBar() {
    const bar = $("#mobileActionBar");
    if (!bar) return;
    const callLink = $("#mobileCallLink");
    const waLink = $("#mobileWaLink");
    if (callLink) callLink.href = `tel:${CONFIG.contact.phone}`;
    if (waLink) waLink.href = `https://wa.me/${CONFIG.contact.phone.replace(/[^0-9]/g, "")}`;
  }

  /* ---------- 20. INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    // Each render step runs independently — if one section's data has a
    // typo and throws, the rest of the page still builds instead of the
    // whole site going blank.
    const steps = [
      applyTheme, renderBrand, renderFooterHours, renderFooterContact,
      () => renderSocialRow("footerSocialRow"), () => renderSocialRow("contactSocialRow"),
      renderHero, renderAbout, renderFeatured, renderMenu, wireQuickView, renderChef,
      renderGallery, wireLightbox, renderInfoLists, wireForms,
      renderTestimonials, renderEvents, renderCatering, renderOffers,
      renderFAQ, renderInstagram, renderMap, wireHeaderScroll, wireMobileNav,
      wireBackToTop, wireScrollProgress, wireStickyMobileBar
    ];
    steps.forEach((step) => {
      try { step(); } catch (err) { console.error("Zahra Dining init step failed:", step.name, err); }
    });
    // Reveal must run after DOM population above so elements exist —
    // this always runs, even if something above failed, so nothing
    // stays permanently hidden.
    requestAnimationFrame(wireRevealOnScroll);
  });
})();
