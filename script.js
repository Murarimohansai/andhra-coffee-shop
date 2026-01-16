/* =========================
   SHOP STATUS
========================= */
function updateStatus() {
    const h = new Date().getHours();
    statusBadge.innerText = h >= 7 && h <= 21 ? "🟢 OPEN NOW" : "🔴 CLOSED";
}
updateStatus();

/* =========================
   MENU DATA
========================= */
let menu = JSON.parse(localStorage.getItem("menu")) || [
    { name: "Filter Coffee", price: 40 },
    { name: "Strong Coffee", price: 50 },
    { name: "Tea", price: 30 },
    { name: "Masala Tea", price: 35 },
    { name: "Punugulu", price: 60 },
    { name: "Bajji", price: 50 },
    { name: "Idli (2)", price: 40 },
    { name: "Dosa", price: 60 },
    { name: "Poori", price: 70 },
    { name: "Mysore Pak", price: 45 }
];

let cart = [];

/* =========================
   RENDER MENU
========================= */
function renderMenu() {
    menuList.innerHTML = "";
    menu.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `
            ${m.name} – ₹${m.price}
            <button onclick="addToCart(${i})">Add</button>
        `;
        menuList.appendChild(div);
    });
}
renderMenu();

/* =========================
   CART
========================= */
function addToCart(i) {
    cart.push(menu[i]);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let sum = 0;

    cart.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.name} – ₹${c.price}`;
        cartItems.appendChild(li);
        sum += c.price;
    });

    document.getElementById("total").innerText = sum;
}

/* =========================
   PAYMENTS
========================= */
function paymentSuccess(method) {
    alert(`✅ Payment Successful\nMethod: ${method}`);
    cart = [];
    renderCart();
}

/* Razorpay Demo */
function payNow() {
    if (!cart.length) return alert("Cart is empty");

    const amount = cart.reduce((s, i) => s + i.price, 0);

    const options = {
        key: "rzp_test_DEMO_KEY",
        amount: amount * 100,
        currency: "INR",
        name: "Andhra Coffee House",
        handler: function () {
            paymentSuccess("Razorpay");
        }
    };

    new Razorpay(options).open();
}

/* Other Demo Payments */
function payUPI() {
    if (!cart.length) return alert("Cart is empty");
    paymentSuccess("UPI");
}

function payCard() {
    if (!cart.length) return alert("Cart is empty");
    paymentSuccess("Card");
}

function payCOD() {
    if (!cart.length) return alert("Cart is empty");
    paymentSuccess("Cash on Delivery");
}

/* =========================
   SECURITY
========================= */
const ADMIN_USER = "Mohan";
const ADMIN_HASH =
"1a89bc3b27e7dd2af925c071d7de9dd7b0c842f8b2f309e59ab7d5d423e3178c";

async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/* =========================
   LOGIN
========================= */
async function login() {
    const user = loginUser.value;
    const pass = loginPass.value;
    const msg = loginMsg;

    const hashed = await sha256(pass);

    if (user === ADMIN_USER && hashed === ADMIN_HASH) {
        sessionStorage.setItem("role", "admin");
        msg.innerText = "✅ Admin login successful";
        msg.style.color = "green";
        checkAccess();
    } else {
        msg.innerText = "❌ Invalid credentials";
        msg.style.color = "red";
    }
}

/* =========================
   ACCESS CONTROL
========================= */
function checkAccess() {
    if (sessionStorage.getItem("role") === "admin") {
        login.style.display = "none";
        admin.style.display = "block";
        renderAdminMenu();
    } else {
        login.style.display = "block";
        admin.style.display = "none";
    }
}
checkAccess();

/* =========================
   LOGOUT
========================= */
function logout() {
    sessionStorage.removeItem("role");
    alert("Logged out");
    checkAccess();
}

/* =========================
   ADMIN CRUD
========================= */
function addMenuItem() {
    const name = itemName.value.trim();
    const price = Number(itemPrice.value);
    if (!name || price <= 0) return alert("Invalid input");

    menu.push({ name, price });
    saveMenu();
}

function editItem(i) {
    const p = prompt("New price:", menu[i].price);
    if (p) {
        menu[i].price = Number(p);
        saveMenu();
    }
}

function deleteItem(i) {
    if (confirm("Delete item?")) {
        menu.splice(i, 1);
        saveMenu();
    }
}

function saveMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
    renderMenu();
    renderAdminMenu();
}

function renderAdminMenu() {
    adminMenuList.innerHTML = "";
    menu.forEach((m, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${m.name} – ₹${m.price}
            <button onclick="editItem(${i})">Edit</button>
            <button onclick="deleteItem(${i})">Delete</button>
        `;
        adminMenuList.appendChild(li);
    });
}
