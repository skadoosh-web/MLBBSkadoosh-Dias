 /*HOME PAGE */
 
 
 function updateDateTime() {
    const now = new Date();

    // Format date: MM/DD/YYYY
    const date = now.toLocaleDateString("en-US");

    // Format time: HH:MM:SS
    const time = now.toLocaleTimeString("en-US");

    document.getElementById("current-date").textContent = date;
    document.getElementById("current-time").textContent = time;
  }

  // Update every second
  setInterval(updateDateTime, 1000);
  // Call once on load
  updateDateTime();


  document.addEventListener('DOMContentLoaded', function () {
  if (typeof bootstrap === 'undefined') {
    console.error('Bootstrap not found. Make sure bootstrap.bundle.min.js is loaded before this script.');
    return;
  }

  var carouselEl = document.getElementById('carouselExample');
  if (!carouselEl) return;

  // Optional: remove conflicting data attributes to avoid double-init
  carouselEl.removeAttribute('data-bs-ride');
  carouselEl.removeAttribute('data-bs-interval');

  // Dispose existing instance if any (prevents conflicts)
  var existing = bootstrap.Carousel.getInstance(carouselEl);
  if (existing) existing.dispose();

  // Initialize with 4000ms interval and don't pause on hover
  var myCarousel = new bootstrap.Carousel(carouselEl, {
    interval: 4000,   // 4 seconds
    pause: false,     // set to 'hover' if you want to pause on mouse hover
    wrap: true,
    touch: true
  });

  // Ensure the carousel is actively cycling
  myCarousel.cycle();
});


document.addEventListener("DOMContentLoaded", function () {
  // find only nav links that are in-page anchors (#...)
  const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"))
    .filter(link => {
      const h = link.getAttribute("href");
      return h && h.startsWith("#");
    });

  // Map each link to its target element (if exists)
  const linkToSection = navLinks.map(link => {
    const selector = link.getAttribute("href");
    const el = document.querySelector(selector);
    return { link, selector, el };
  }).filter(item => item.el); // keep only those with existing targets

  if (linkToSection.length === 0) return; // nothing to do

  const OFFSET = 90; // adjust if navbar height differs

  // smooth scroll when links are clicked
  linkToSection.forEach(({ link, el }) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // update history hash without jumping
      history.pushState(null, "", "#" + el.id);
      // immediately update active class
      setActiveLink("#" + el.id);
    });
  });

  // helper to set the active class
  function setActiveLink(hash) {
    navLinks.forEach(l => l.classList.remove("active"));
    if (!hash) return;
    const active = navLinks.find(l => l.getAttribute("href") === hash);
    if (active) active.classList.add("active");
  }

  // scroll handler: find the section whose top is closest but <= OFFSET
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      let currentHash = "";
      // find the section with largest top <= OFFSET
      let bestTop = -Infinity;
      linkToSection.forEach(({ el }) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= OFFSET && rect.top > bestTop) {
          bestTop = rect.top;
          currentHash = "#" + el.id;
        }
      });

      // if nothing matched (scrolled above first section), pick the first section if near top
      if (!currentHash) {
        // If the very top of page, set to the first anchor (optional)
        const first = linkToSection[0].el.getBoundingClientRect();
        if (first.top > OFFSET) {
          currentHash = linkToSection[0].selector; // first section
        }
      }

      setActiveLink(currentHash);
      ticking = false;
    });
  }

  // initialize active state on load
  onScroll();

  // update on scroll + on resize (layout changes)
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

document.getElementById("signInBtn").addEventListener("click", function(event) {
  event.preventDefault(); // prevent going to #
  alert("🚀 Coming soon... For now, please use Direct Top Up.");
});



document.addEventListener('DOMContentLoaded', function () {
  var reviewEl = document.getElementById('reviewCarousel');
  var reviewCarousel = new bootstrap.Carousel(reviewEl, {
    interval: 4000,
    pause: 'hover',
    wrap: true
  });
});



