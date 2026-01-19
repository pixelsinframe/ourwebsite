document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin once
  gsap.registerPlugin(ScrollTrigger);
  // Select all service sections
  const serviceSections = document.querySelectorAll(
    ".studio-photo-container figure"
  );

  // Create animation for each section with a stagger effect
  gsap.fromTo(
    serviceSections,
    {
      opacity: 0,
      y: 100,
    },
    {
      scrollTrigger: {
        trigger: ".studio-photo-container",
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".faq-track");
  const items = Array.from(document.querySelectorAll(".faq-item"));

  if (!track || items.length === 0) return;

  // Duplicate items to ensure continuous scrolling
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // Start scrolling
  const loop = gsap.to(track, {
    x: () => `-=${track.scrollWidth / 2}`,
    duration: 30,
    ease: "linear",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % (track.scrollWidth / 2)),
    },
  });

  // On hover — pause scroll and scale the item
  track.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      loop.pause();
      gsap.to(item, { scale: 1.05, duration: 0.3 });
    });

    item.addEventListener("mouseleave", () => {
      loop.play();
      gsap.to(item, { scale: 1, duration: 0.3 });
    });
  });
});
