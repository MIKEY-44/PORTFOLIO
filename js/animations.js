/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  /* Apply to elements */
  document.querySelectorAll(
    ".project-card, .blog-card, .contact-form, .hero-content"
  ).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

});