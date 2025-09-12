// js/menu-loader.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("/menu.html")
    .then(response => {
      if (!response.ok) throw new Error("Menu file not found");
      return response.text();
    })
    .then(data => {
      document.getElementById("menu-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Menu load error:", err));
});