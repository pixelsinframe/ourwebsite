document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonial-container");
  if (!container) return;

  const items = Array.from(container.children);

  // Duplicate for seamless loop
  const clones = items.map((el) => el.cloneNode(true));
  clones.forEach((clone) => container.appendChild(clone));

  let scrollSpeed = 0.5;

  function loopScroll() {
    container.scrollLeft += scrollSpeed;
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }
    requestAnimationFrame(loopScroll);
  }

  loopScroll();
});

