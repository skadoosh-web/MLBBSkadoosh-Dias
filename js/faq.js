

/*faq */
const menuItems = document.querySelectorAll("#faqMenu li");
  const categories = document.querySelectorAll(".faq-category");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active from all
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      let category = item.dataset.category;

      categories.forEach(cat => {
        if (cat.classList.contains(category)) {
          cat.classList.remove("d-none");
        } else {
          cat.classList.add("d-none");
        }
      });
    });
  });

  // Show first category by default
  menuItems[0].classList.add("active");


  document.getElementById("signInBtn").addEventListener("click", function(event) {
  event.preventDefault(); // prevent going to #
  alert("🚀 Coming soon... For now, please use Direct Top Up.");
});


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

