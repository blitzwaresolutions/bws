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

// menu-loader.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    // Toggle nav open/close
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('is-open');
    });

    // Close nav if clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('is-open');
        }
    });

    // Add icons dynamically (Font Awesome)
    const iconMap = {
        "Home": "fas fa-home",
        "BlitzWeather": "fas fa-bolt",
        "Solutions": "fas fa-gears",
        "Support BWS": "fas fa-coffee",
        "About": "fas fa-info-circle",
        "Privacy": "fas fa-user-secret",
        "Terms": "fas fa-file-contract",
        "Email": "fas fa-envelope"
    };

    navLinks.querySelectorAll('a').forEach(link => {
        const text = link.textContent.trim();
        const iconClass = iconMap[text];
        if (iconClass) {
            // Clear existing <i> if any
            const existingIcon = link.querySelector('i');
            if (existingIcon) existingIcon.remove();

            const icon = document.createElement('i');
            icon.className = iconClass;
            link.prepend(icon);
            icon.style.marginRight = "8px";
        }
    });
});