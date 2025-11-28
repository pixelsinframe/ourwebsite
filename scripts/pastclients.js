gsap.registerPlugin(ScrollTrigger);

const pastClients = document.querySelector(".past-clients");
const totalWidth = pastClients.scrollWidth - pastClients.offsetWidth;

gsap.to(".past-clients-logo", {
  x: `-=${totalWidth}`, // Move each logo to the left by the total width
  ease: "none",
  modifiers: {
    x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Loop back to start when reaching the end
  },
  repeat: -1,
  duration: 60, // Adjust duration for smoother animation
  yoyo: false, // Disable yoyo for continuous loop
  repeatRefresh: false, // Disable repeatRefresh for better performance
});
