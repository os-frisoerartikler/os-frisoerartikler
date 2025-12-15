const burger = document.querySelector(".burger");
const drawer = document.querySelector(".drawer");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".close");

const actions = document.querySelector(".actions");

const searchBtn =
  document.getElementById("searchBtn") ||
  document.querySelector('[aria-label="Søg"]');
const accountBtn =
  document.getElementById("accountBtn") ||
  document.querySelector('[aria-label="Konto"]');
const favBtn =
  document.getElementById("favBtn") ||
  document.querySelector('[aria-label="Favoritter"]');
const cartBtn =
  document.getElementById("cartBtn") ||
  document.querySelector('[aria-label="Kurv"]');

const searchPanel = document.querySelector(".search-panel");
const accountPanel = document.querySelector(".account-panel");
const favPanel = document.querySelector(".fav-panel");
const cartPanel = document.querySelector(".cart-panel");

function closePanels() {
  if (searchPanel) searchPanel.hidden = true;
  if (accountPanel) accountPanel.hidden = true;
  if (favPanel) favPanel.hidden = true;
  if (cartPanel) cartPanel.hidden = true;
}

function closeAll() {
  if (drawer) drawer.hidden = true;
  if (backdrop) backdrop.hidden = true;
  closePanels();
  if (burger) burger.setAttribute("aria-expanded", "false");
}

function openDrawer() {
  closeAll();
  if (drawer) drawer.hidden = false;
  if (backdrop) backdrop.hidden = false;
  if (burger) burger.setAttribute("aria-expanded", "true");
}

function togglePanel(panel) {
  if (!panel) return;
  const isOpen = !panel.hidden;
  closeAll();
  panel.hidden = isOpen;
}

if (burger) burger.addEventListener("click", openDrawer);
if (closeBtn) closeBtn.addEventListener("click", closeAll);
if (backdrop) backdrop.addEventListener("click", closeAll);

if (searchBtn) {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePanel(searchPanel);
    if (searchPanel && !searchPanel.hidden) {
      const input = searchPanel.querySelector("input");
      if (input) input.focus();
    }
  });
}

if (accountBtn) {
  accountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePanel(accountPanel);
  });
}

if (favBtn) {
  favBtn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePanel(favPanel);
  });
}

if (cartBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePanel(cartPanel);
  });
}

document.addEventListener("click", (e) => {
  if (actions && !actions.contains(e.target)) closePanels();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
});
function getCartCount() {
  return Number(localStorage.getItem("cartCount") || "0");
}

function setCartCount(n) {
  localStorage.setItem("cartCount", String(n));
}

function updateBadge() {
  const badge = document.querySelector("#cartBtn .badge");
  if (!badge) return;
  badge.textContent = String(getCartCount());
}

function updateCartPanel() {
  const panel = document.querySelector(".cart-panel");
  if (!panel) return;

  const count = getCartCount();
  const p = panel.querySelector("p");
  if (!p) return;

  p.textContent =
    count === 0
      ? "Du har ikke puttet noget i din kurv endnu."
      : `Du har ${count} vare${count === 1 ? "" : "r"} i din kurv.`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateBadge();
  updateCartPanel();

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const count = getCartCount() + 1;
      setCartCount(count);
      updateBadge();
      updateCartPanel();
    });
  });
});
const CART_KEY = "cartItems";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function cartCount(items) {
  return items.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
}

function updateCartUI() {
  const items = getCart();

  const badge = document.querySelector("#cartBtn .badge");
  if (badge) badge.textContent = String(cartCount(items));

  const panel = document.querySelector(".cart-panel");
  if (!panel) return;

  const empty = panel.querySelector(".cart-empty");
  const list = panel.querySelector(".cart-items");
  const footer = panel.querySelector(".cart-footer");
  const totalEl = panel.querySelector(".cart-total-value");

  if (!list || !empty || !footer || !totalEl) return;

  if (items.length === 0) {
    empty.hidden = false;
    list.hidden = true;
    footer.hidden = true;
    list.innerHTML = "";
    totalEl.textContent = "0";
    return;
  }

  empty.hidden = true;
  list.hidden = false;
  footer.hidden = false;

  list.innerHTML = items
    .map(
      (item, i) => `
      <li class="cart-item">
        <img src="${item.img}" alt="">
        <div>
          <p class="name">${item.name}</p>
          <p class="meta">${item.qty} stk • ${item.price},00 kr</p>
        </div>
        <button class="remove" type="button" data-remove="${i}" aria-label="Fjern">Fjern</button>
      </li>
    `
    )
    .join("");

  totalEl.textContent = String(cartTotal(items));

  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-remove"));
      const next = getCart();
      next.splice(index, 1);
      setCart(next);
      updateCartUI();
    });
  });
}

function addToCartFromCard(card) {
  const name =
    card.dataset.name ||
    card.querySelector("h4")?.textContent?.trim() ||
    "Produkt";
  const price = Number(card.dataset.price || "0");
  const img = card.querySelector("img")?.getAttribute("src") || "";

  const items = getCart();
  const existing = items.find((x) => x.name === name && x.price === price);

  if (existing) existing.qty = (existing.qty || 1) + 1;
  else items.push({ name, price, img, qty: 1 });

  setCart(items);
  updateCartUI();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".produkt-kort");
      if (card) addToCartFromCard(card);
    });
  });

  const clearBtn = document.querySelector(".cart-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      setCart([]);
      updateCartUI();
    });
  }
});
