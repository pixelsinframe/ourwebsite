// Function to dynamically change the date

// Navigation

const menuBtn = document.querySelector(".menu");
const navList = document.querySelector(".nav-list");
const body = document.body;
let scrollPosition = 0; // Store the scroll position

menuBtn.addEventListener("click", () => {
  if (!menuBtn.classList.contains("active")) {
    // Menu is being opened
    scrollPosition = window.pageYOffset; // Store current scroll position
    body.style.top = `-${scrollPosition}px`; // Set body position
    body.classList.add("menu-open");
  } else {
    // Menu is being closed
    body.classList.remove("menu-open");
    body.style.top = "";
    window.scrollTo(0, scrollPosition); // Restore scroll position
  }
  menuBtn.classList.toggle("active");
  navList.classList.toggle("active");
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll(".list-item a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navList.classList.remove("active");
    body.classList.remove("menu-open");
    body.style.top = "";
    window.scrollTo(0, scrollPosition); // Restore scroll position
  });
});

const footerYears = document.getElementsByClassName("year");
Array.from(footerYears).forEach((footerYear) => {
  footerYear.innerHTML = new Date().getFullYear();
});

// Back to top button

//Get the button
var backToTopBtn = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Wait for DOM to be ready

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin once
  gsap.registerPlugin(ScrollTrigger);

  // Featured works animation
  const featuredSections = document.querySelectorAll(".featured-works");
  gsap.fromTo(
    featuredSections,
    {
      opacity: 0,
      y: 100,
    },
    {
      scrollTrigger: {
        trigger: ".featured-work-container",
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        grid: [2, 2],
        from: "start",
      },
      ease: "power2.out",
    }
  );

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
