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

// HEADER CHANGE COLOR

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const slideshow = document.querySelector(".slideshow") || document;
  const slides = document.querySelectorAll(".slide");

  function createObserver() {
    const headerHeight = header.offsetHeight || 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const mode = entry.target.dataset.header || "light";
          header.classList.toggle("dark", mode === "dark");
          header.classList.toggle("light", mode !== "dark");
        });
      },
      {
        root: slideshow,
        threshold: 0.55,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      }
    );

    slides.forEach((s) => io.observe(s));
    return io;
  }

  let observer = createObserver();
  window.addEventListener("resize", () => {
    observer.disconnect();
    observer = createObserver();
  });

  // set initial state
  if (
    document
      .querySelector('.slide[data-header="dark"]')
      ?.classList.contains("slide")
  ) {
    header.classList.add("light");
  }
});
