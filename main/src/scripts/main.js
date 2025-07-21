const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

window.addEventListener("load", function() {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  preloader.style.display = "none";
  content.style.display = "block";
});