//// Import ScrollTrigger
//gsap.registerPlugin(ScrollTrigger);
//
//// Animate each image with a stagger effect on scroll
//const images = document.querySelectorAll(".image");
//
//gsap.from(images, {
//  opacity: 0,
//  y: 50,
//  duration: 1,
//  stagger: 0.5, // Time delay between each image animation
//  scrollTrigger: {
//    trigger: ".image",
//    start: "top 60%",
//    end: "top 20%",
//    toggleActions: "play none none reverse",
//    
//  },
//});



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

