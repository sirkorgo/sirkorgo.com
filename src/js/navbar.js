document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("links");
  const navbar = document.getElementById("nav");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      if (navbar) navbar.classList.toggle("combinedNav");
    });
  }

  const site = location.hostname.replace(/^www\./, "");
  const visitorsEl = document.getElementById("visitors");

  fetch(`https://stats.sirkorgo.com/count?site=${site}`)
    .then((r) => r.json())
    .then((d) => {
      if (visitorsEl) visitorsEl.innerHTML = "# " + d.count;
    })
    .catch((err) => console.error("Stats count error:", err));
});

const site = location.hostname.replace(/^www\./, "");

fetch("https://stats.sirkorgo.com/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    site,
    page: location.pathname,
    referrer: document.referrer,
  }),
}).catch((err) => console.error("Track error:", err));
