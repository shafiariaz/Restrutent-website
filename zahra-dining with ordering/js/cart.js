/* ==================================================================
   ZAHRA DINING — CART & CUSTOMER STORAGE
   ------------------------------------------------------------------
   Vanilla JS, no dependencies. This file has no UI of its own — it's
   the shared data layer that every ordering page (order.html,
   cart.html, checkout.html) and the cart drawer (cart-widget.js)
   read from and write to.

   Everything is persisted to localStorage so the cart and the
   customer's details survive a page refresh or navigating between
   pages, as required by the brief.

   Exposes two globals:
   - window.ZahraCart      -> shopping cart (items + quantities)
   - window.ZahraCustomer  -> last-used customer/delivery details

   Whenever the cart changes, a "zahra-cart-updated" event is
   dispatched on window so any page can re-render (badge count, drawer,
   cart page, checkout summary) without these modules needing to know
   about each other.
   ================================================================== */

(function () {
  "use strict";

  const CART_KEY = "zahra_cart_v1";
  const CUSTOMER_KEY = "zahra_customer_v1";
  const LAST_ORDER_KEY = "zahra_last_order_v1";

  function readJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error("Zahra storage: failed to read", key, err);
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      // Most likely localStorage is disabled (private browsing, etc.)
      console.error("Zahra storage: failed to write", key, err);
      return false;
    }
  }

  function notifyCartChanged() {
    window.dispatchEvent(new CustomEvent("zahra-cart-updated"));
  }

  /* ---------- CART ---------- */
  const ZahraCart = {

    /** Returns the array of cart line items: {id,name,price,unit,image,qty} */
    getItems() {
      return readJSON(CART_KEY, []);
    },

    /** Adds `qty` of an item. If it's already in the cart, increases its quantity. */
    addItem(item, qty) {
      qty = Math.max(1, parseInt(qty, 10) || 1);
      const items = this.getItems();
      const existing = items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += qty;
      } else {
        items.push({
          id: item.id,
          name: item.name,
          price: Number(item.price) || 0,
          unit: item.unit || null,
          image: item.image || "",
          qty
        });
      }
      writeJSON(CART_KEY, items);
      notifyCartChanged();
    },

    /** Sets the exact quantity for a line item. Removes it if qty <= 0. */
    updateQty(id, qty) {
      qty = parseInt(qty, 10) || 0;
      let items = this.getItems();
      if (qty <= 0) {
        items = items.filter((i) => i.id !== id);
      } else {
        const line = items.find((i) => i.id === id);
        if (line) line.qty = qty;
      }
      writeJSON(CART_KEY, items);
      notifyCartChanged();
    },

    /** Increases/decreases a line item's quantity by a delta (e.g. +1 / -1). */
    changeQty(id, delta) {
      const items = this.getItems();
      const line = items.find((i) => i.id === id);
      if (!line) return;
      this.updateQty(id, line.qty + delta);
    },

    removeItem(id) {
      const items = this.getItems().filter((i) => i.id !== id);
      writeJSON(CART_KEY, items);
      notifyCartChanged();
    },

    clear() {
      writeJSON(CART_KEY, []);
      notifyCartChanged();
    },

    /** Total number of individual units in the cart (for the header badge). */
    getCount() {
      return this.getItems().reduce((sum, i) => sum + i.qty, 0);
    },

    /** Subtotal of all line items, before delivery fee / tax. */
    getSubtotal() {
      return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    isEmpty() {
      return this.getItems().length === 0;
    },

    /**
     * Full price breakdown used on the cart drawer, cart page and
     * checkout page, so all three always agree on the numbers.
     * `deliveryOption` is "delivery" or "pickup".
     */
    getTotals(deliveryOption) {
      const cfg = window.ZAHRA_ORDER_CONFIG || {};
      const subtotal = this.getSubtotal();
      const isDelivery = deliveryOption !== "pickup";
      let deliveryFee = 0;
      if (isDelivery && subtotal > 0) {
        const freeAt = typeof cfg.freeDeliveryThreshold === "number" ? cfg.freeDeliveryThreshold : Infinity;
        deliveryFee = subtotal >= freeAt ? 0 : (cfg.deliveryFee || 0);
      }
      const taxRate = cfg.taxRate || 0;
      const tax = Math.round(subtotal * taxRate * 100) / 100;
      const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;
      return {
        subtotal: Math.round(subtotal * 100) / 100,
        deliveryFee: Math.round(deliveryFee * 100) / 100,
        tax,
        total
      };
    }
  };

  /* ---------- CUSTOMER INFO ---------- */
  const ZahraCustomer = {
    get() {
      return readJSON(CUSTOMER_KEY, {});
    },
    save(data) {
      const current = this.get();
      writeJSON(CUSTOMER_KEY, Object.assign({}, current, data));
    },
    clear() {
      writeJSON(CUSTOMER_KEY, {});
    }
  };

  /* ---------- LAST ORDER (for the confirmation screen) ---------- */
  const ZahraLastOrder = {
    save(order) {
      writeJSON(LAST_ORDER_KEY, order);
    },
    get() {
      return readJSON(LAST_ORDER_KEY, null);
    },
    clear() {
      try { window.localStorage.removeItem(LAST_ORDER_KEY); } catch (err) { /* ignore */ }
    }
  };

  window.ZahraCart = ZahraCart;
  window.ZahraCustomer = ZahraCustomer;
  window.ZahraLastOrder = ZahraLastOrder;
})();
