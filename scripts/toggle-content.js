document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pricing-container").forEach((container) => {
    const contentElements = container.querySelectorAll(".content-one");
    const toggleBtns = container.querySelectorAll(".toggle-btn");

    function showContent(index) {
      contentElements.forEach((content, idx) => {
        content.style.display = index === idx ? "block" : "none";
      });

      toggleBtns.forEach((btn, idx) => {
        if (index === idx) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    toggleBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => showContent(index));
    });

    // Initially show the first content of each set
    showContent(0);
  });
});
