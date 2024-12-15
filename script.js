const cart = []; // Initialize cart-------------------------

// Update Cart display----------------
function updateCart() {
    const cartTable = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td><button data-index="${index}" class="remove-item">Remove</button></td>
        `;
        cartTable.appendChild(row);
    });

    totalPrice.textContent = total.toFixed(2); // Update total price--------------------------

    // Remove item from cart-----------------
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            cart.splice(index, 1);  // Remove from cart-------------
            updateCart();  // Refresh cart display--------------
        });
    });
}

// Add item to cart------------
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const quantity = parseInt(button.closest(".medicine").querySelector(".quantity").value);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;  // Increase quantity if item exists------------
        } else {
            cart.push({ name, price, quantity });  // Add item to cart------------
        }
        updateCart();  // Update cart display-----------
    });
});

// Save and Apply Favorites to LocalStorage---------
document.getElementById("add-to-favorites").addEventListener("click", () => {
    localStorage.setItem("favorites", JSON.stringify(cart));  // Save to favorites---------
    alert("Favorites Saved!");
});

document.getElementById("apply-favorites").addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    cart.length = 0;  // Clear current cart--------
    favorites.forEach(item => cart.push(item));  // Load favorites into cart---------
    updateCart();  // Update cart display-----------
});

// Proceed to Checkout----------
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        localStorage.setItem("order", JSON.stringify(cart));  // Save order to LocalStorage------------
        window.location.href = "checkout.html";  // Navigate to checkout page------------
    }
});








