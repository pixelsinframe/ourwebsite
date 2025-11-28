// Navigation
const menuBtn = document.querySelector(".menu");
const navList = document.querySelector(".nav-list");
const body = document.body;
let scrollPosition = 0;

// Null check for safety
if (!menuBtn || !navList) return;

function toggleMenu() {
  const isOpening = !menuBtn.classList.contains("active");

  if (isOpening) {
    scrollPosition = window.pageYOffset;
    body.classList.add("menu-open"); // Rely on CSS for positioning (no more inline styles—see CSS below)
    // Removed console.log for production
  } else {
    body.classList.remove("menu-open");
    window.scrollTo(0, scrollPosition);
    // Removed console.log
  }

  menuBtn.classList.toggle("active");
  navList.classList.toggle("active");
  // Enhanced ARIA: Sync expanded state (set to "false" initially in HTML)
  menuBtn.setAttribute(
    "aria-expanded",
    menuBtn.classList.contains("active").toString()
  );
}

// Click toggle
menuBtn.addEventListener("click", toggleMenu);

// Keyboard toggle (Enter/Space) - unchanged, good as is
menuBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

// Close on Esc key - unchanged
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.classList.contains("active")) {
    toggleMenu();
  }
});

// Optimized: Event delegation for nav links (one listener instead of many)
navList.addEventListener("click", (e) => {
  if (e.target.matches(".list-item a")) {
    toggleMenu();
  }
});

// Enhanced focus trapping (now queries for buttons too, not just <a>)
navList.addEventListener("keydown", (e) => {
  if (!navList.classList.contains("active")) return;

  const focusableElements = navList.querySelectorAll(
    "a, button, [tabindex]:not([tabindex='-1'])"
  );
  if (focusableElements.length === 0) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Prevent touch scrolling - unchanged, but add passive: false for reliability
body.addEventListener(
  "touchmove",
  (e) => {
    if (body.classList.contains("menu-open") && !navList.contains(e.target)) {
      e.preventDefault();
    }
  },
  { passive: false }
);
