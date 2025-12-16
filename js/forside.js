const track = document.querySelector(".carousel_track");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const cardWidth = track.querySelector(".category").offsetWidth;

rightArrow.addEventListener("click", () => {
  track.scrollBy({ left: cardWidth, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
  track.scrollBy({ left: -cardWidth, behavior: "smooth" });
});
