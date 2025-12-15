const burger = document.querySelector(".burger");
const drawer = document.querySelector(".drawer");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".close");

const searchBtn = document.querySelector('[aria-label="Søg"]');
const cartBtn = document.querySelector('[aria-label="Kurv"]');

const searchPanel = document.querySelector(".search-panel");
const cartPanel = document.querySelector(".cart-panel");

function closeAll() {
  drawer.hidden = true;
  backdrop.hidden = true;
  searchPanel.hidden = true;
  cartPanel.hidden = true;
  burger.setAttribute("aria-expanded", "false");
}

function openDrawer() {
  closeAll();
  drawer.hidden = false;
  backdrop.hidden = false;
  burger.setAttribute("aria-expanded", "true");
}

function toggleSearch() {
  const isOpen = !searchPanel.hidden;
  closeAll();
  searchPanel.hidden = isOpen;
}

function toggleCart() {
  const isOpen = !cartPanel.hidden;
  closeAll();
  cartPanel.hidden = isOpen;
}

burger.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeAll);
backdrop.addEventListener("click", closeAll);

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleSearch();
});

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCart();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
});
