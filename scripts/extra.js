

// Wait for DOM to be ready



  // Introduction sections animation
  const textSection = document.querySelector(
    ".introduction-to-company section:first-child"
  );
  const imageSection = document.querySelector(
    ".introduction-to-company section:last-child"
  );

  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 1,
    },
  });

  tl.fromTo(textSection, { opacity: 0, x: -50 }, { opacity: 1, x: 0 }).fromTo(
    imageSection,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0 },
    "-=0.7"
  );
  // Select all service sections
  const serviceSections = document.querySelectorAll(".service-section");

  // Create animation for each section with a stagger effect
  gsap.fromTo(
    serviceSections,
    {
      opacity: 0,
      y: 100,
    },
    {
      scrollTrigger: {
        trigger: ".services-container",
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

