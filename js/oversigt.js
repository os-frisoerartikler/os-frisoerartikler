// JS/headermenu.js
document.addEventListener("DOMContentLoaded", () => {
  const actions = document.querySelector(".actions");
  if (!actions) return;

  const searchBtn = document.getElementById("searchBtn");
  const accountBtn = document.getElementById("accountBtn");
  const favBtn = document.getElementById("favBtn");
  const cartBtn = document.getElementById("cartBtn");

  const searchPanel = actions.querySelector(".search-panel");
  const accountPanel = actions.querySelector(".account-panel");
  const favPanel = actions.querySelector(".fav-panel");
  const cartPanel = actions.querySelector(".cart-panel");

  function closeAll() {
    if (searchPanel) searchPanel.hidden = true;
    if (accountPanel) accountPanel.hidden = true;
    if (favPanel) favPanel.hidden = true;
    if (cartPanel) cartPanel.hidden = true;
  }

  function toggle(panel) {
    if (!panel) return;
    const isOpen = !panel.hidden;
    closeAll();
    panel.hidden = isOpen;
  }

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(searchPanel);
      if (!searchPanel.hidden) {
        const input = searchPanel.querySelector("input");
        if (input) input.focus();
      }
    });
  }

  if (accountBtn && accountPanel) {
    accountBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(accountPanel);
    });
  }

  if (favBtn && favPanel) {
    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(favPanel);
    });
  }

  if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(cartPanel);
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".actions")) closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
});
