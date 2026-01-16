/* ===============================
   BASIC INTERACTIONS
================================ */

// Order button alert
function showMessage() {
    alert("☕ Thank you for your order!\nYour fresh filter coffee is being prepared ❤️");
}

// WhatsApp contact button
function openWhatsApp() {
    window.open("https://wa.me/919876543210", "_blank");
}

/* ===============================
   DARK MODE TOGGLE
================================ */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

/* ===============================
   CUSTOMER REVIEWS
================================ */

function addReview(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || message === "") {
        alert("Please enter your name and review.");
        return;
    }

    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review-box";

    reviewDiv.innerHTML = `
        <p class="review-text">"${message}"</p>
        <p class="review-author">– ${name} ⭐⭐⭐⭐⭐</p>
    `;

    document.getElementById("newReviews").prepend(reviewDiv);

    // Clear form
    nameInput.value = "";
    messageInput.value = "";

    alert("🙏 Thank you for your review!");
}

/* ===============================
   GREETING MESSAGE (ON LOAD)
================================ */

window.onload = function () {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "☀️ Good Morning! Start your day with a hot coffee.";
    } else if (hour < 18) {
        greeting = "🌤️ Good Afternoon! Take a coffee break.";
    } else {
        greeting = "🌙 Good Evening! Relax with our filter coffee.";
    }

    console.log(greeting); // visible in browser console
};
