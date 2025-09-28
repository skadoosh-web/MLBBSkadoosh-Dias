let selectedRecharge = null, selectedPayment = null, totalPrice = 0, rating = 0;

// Recharge selection
document.querySelectorAll("#rechargeOptions .card, .row.mt-3 .card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll("#rechargeOptions .card, .row.mt-3 .card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedRecharge = card;
    computeTotal();
  });
});

// Payment selection
document.querySelectorAll("#paymentOptions .card, .row.mt-3 .card").forEach(card => {
  if (card.closest("#paymentOptions") || card.parentElement.parentElement.id === "") {
    card.addEventListener("click", () => {
      if (card.dataset.method) {
        document.querySelectorAll("#paymentOptions .card, .row.mt-3 .card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        if (card.dataset.coming === "true") {
          alert(card.dataset.method + " is Coming Soon!");
          selectedPayment = null;
        } else {
          selectedPayment = card;
        }
      }
    });
  }
});

// Quantity change
document.getElementById("quantity").addEventListener("input", computeTotal);

function computeTotal() {
  if (selectedRecharge) {
    let price = parseFloat(selectedRecharge.dataset.price);
    let qty = parseInt(document.getElementById("quantity").value) || 1;
    totalPrice = price * qty;

    // Update global total
    document.getElementById("totalPrice").textContent = "₱" + totalPrice.toFixed(2);

    // Update each payment card total
    document.querySelectorAll(".payment-total").forEach(el => {
      el.textContent = "Pay ₱" + totalPrice.toFixed(2);
    });
  }
}


// Confirm button
document.getElementById("confirmBtn").addEventListener("click", () => {
  let userId = document.getElementById("userId").value.trim();
  let zoneId = document.getElementById("zoneId").value.trim();
  let errorBox = document.getElementById("error");

  if (!userId || !zoneId) {
    errorBox.textContent = "Your User ID or Zone ID is empty!";
    return;
  }
  if (!selectedRecharge) {
    errorBox.textContent = "Please select a Recharge option!";
    return;
  }
  if (!selectedPayment) {
    errorBox.textContent = "Please select a Payment method!";
    return;
  }
// Ask for number (max 11 digits)
  let phone = prompt("Enter your 11-digit Mobile Number:");
  if (!phone || !/^[0-9]{11}$/.test(phone)) {
    alert("Invalid number! Please enter exactly 11 digits.");
    return;
  }

  // Success then show review modal
  alert("Top-up Successful!");
  let modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();
});

// Rating stars
document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    rating = star.dataset.value;
    document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));
    for (let i = 0; i < rating; i++) {
      document.querySelectorAll(".star")[i].classList.add("selected");
    }
  });
});
// Save Review
document.getElementById("saveReview").addEventListener("click", () => {
  let fullname = document.getElementById("fullname").value.trim();
  let comments = document.getElementById("comments").value.trim();
  if (!fullname || rating == 0) {
    alert("Please enter Full Name and select a rating!");
    return;
  }

  let review = { 
    fullname, 
    rating, 
    comments, 
    recharge: selectedRecharge.dataset.name, 
    total: totalPrice 
  };

  // ✅ Get existing reviews or empty array
  let reviews = JSON.parse(sessionStorage.getItem("reviews")) || [];

  // ✅ Add new review
  reviews.push(review);

  // ✅ Save back
  sessionStorage.setItem("reviews", JSON.stringify(reviews));

  alert("Thank you for your review! Top up again");
  location.reload();
});

document.getElementById("signInBtn").addEventListener("click", function(event) {
  event.preventDefault(); // prevent going to #
  alert("🚀 Coming soon... For now, please use Direct Top Up.");
});
