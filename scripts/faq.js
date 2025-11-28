// Frequently Asked Questions

const faqElements = document.querySelectorAll(".unique-faq");

faqElements.forEach((faq) => {
  faq.addEventListener("click", () => {
    // Close all FAQs first
    faqElements.forEach((el) => {
      if (el !== faq) {
        el.classList.remove("active"); // Ensure CSS for .active is defined
      }
    });

    // Toggle the active class on the clicked FAQ
    faq.classList.toggle("active");
  });
});
