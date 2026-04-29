const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");

  if (current === "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

/* Load saved theme */
window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
};