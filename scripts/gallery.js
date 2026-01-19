function initInfiniteGallery(trackId, options = {}) {
  const galleryTrack = document.getElementById(trackId);
  if (!galleryTrack) {
    console.warn(`Gallery track not found for ID: ${trackId}`);
    return;
  }

  // Prevent multiple inits
  if (galleryTrack.dataset.initialized) return;
  galleryTrack.dataset.initialized = "true";

  let isPaused = false;
  let animationId;
  const duration = options.duration || 30;

  const items = Array.from(galleryTrack.children);
  if (items.length === 0) {
    console.warn("No gallery items found");
    return;
  }

  function calculateWidths() {
    let totalWidth = 0;
    items.forEach((item, index) => {
      const style = getComputedStyle(item);
      const marginRight = parseFloat(style.marginRight) || 32;
      totalWidth +=
        item.offsetWidth + (index < items.length - 1 ? marginRight : 0);
    });
    return totalWidth;
  }

  // Clone twice
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    galleryTrack.appendChild(clone);
  });
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    galleryTrack.appendChild(clone);
  });

  // Initial width
  let totalWidth = calculateWidths();
  if (totalWidth <= 0) {
    console.warn("Total width is 0 - images may not have loaded. Check URLs.");
    return;
  }
  galleryTrack.style.width = `${totalWidth * 3}px`;

  // Animation vars
  let currentTranslate = 0;
  let speed = totalWidth / (duration * 1000); // px/ms
  let lastTime = performance.now();
  let lastLogTime = lastTime;

  function animate(currentTime) {
    if (!isPaused && speed > 0) {
      const deltaTime = Math.min(currentTime - lastTime, 16.7);
      currentTranslate -= speed * deltaTime;

      // Seamless reset: when we pass one full set, jump to start
      if (currentTranslate <= -totalWidth) {
        currentTranslate += totalWidth; // Reset to start of next clone set
        //console.log(`Reset at translate=${currentTranslate.toFixed(1)}px`);
      }

      galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
      lastLogTime = currentTime;
    }

    lastTime = currentTime;
    animationId = requestAnimationFrame(animate);
  }

  // Start after load
  function startAnimation() {
    totalWidth = calculateWidths();
    if (totalWidth <= 0) {
      console.warn("Total width is 0 post-load. Check image URLs.");
      return;
    }
    galleryTrack.style.width = `${totalWidth * 3}px`;
    speed = totalWidth / (duration * 1000);
    animationId = requestAnimationFrame(animate);
  }

  if (document.readyState === "complete") {
    startAnimation();
  } else {
    window.addEventListener("load", startAnimation, { once: true });
  }

  // Pause/resume: Hover
  galleryTrack.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  galleryTrack.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Touch (immediate)
  galleryTrack.addEventListener(
    "touchstart",
    () => {
      isPaused = true;
    },
    { passive: true }
  );
  galleryTrack.addEventListener(
    "touchend",
    () => {
      isPaused = false;
    },
    { passive: true }
  );
  galleryTrack.addEventListener(
    "touchcancel",
    () => {
      isPaused = false;
    },
    { passive: true }
  );

  // Context menu disable
  galleryTrack.addEventListener("contextmenu", (e) => e.preventDefault());

  // Debounced resize
  let resizeTimeout;
  let lastWidth = totalWidth;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newWidth = calculateWidths();
      if (Math.abs(newWidth - lastWidth) > 10) {
        isPaused = true;
        lastWidth = newWidth;
        totalWidth = newWidth;
        galleryTrack.style.width = `${totalWidth * 3}px`;
        const isMobile = window.innerWidth <= 768;
        const newDuration = isMobile ? 40 : duration;
        speed = totalWidth / (newDuration * 1000);
        currentTranslate = 0;
        console.log(
          `Resized: totalWidth=${totalWidth}px, speed=${speed.toFixed(4)}px/ms`
        );
        isPaused = false;
      }
    }, 250);
  });

  // Cleanup
  window.addEventListener(
    "beforeunload",
    () => {
      if (animationId) cancelAnimationFrame(animationId);
    },
    { once: true }
  );
}

// Init on load
window.addEventListener(
  "load",
  () => {
    initInfiniteGallery("galleryTrack", { duration: 30 });
  },
  { once: true }
);
if (document.readyState === "complete") {
  initInfiniteGallery("galleryTrack", { duration: 30 });
}
