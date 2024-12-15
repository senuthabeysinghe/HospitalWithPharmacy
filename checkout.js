document.addEventListener("DOMContentLoaded", () => {
    // Get the saved order from localStorage-----------
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    const summaryItems = document.getElementById("summary-items");
    const summaryTotal = document.getElementById("summary-total");
    let total = 0;

    // Loop through the order to display order summary------------
    order.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
        `;
        summaryItems.appendChild(row);
    });

    // Update the total amount-----------
    summaryTotal.textContent = total.toFixed(2);

    // Show/Hide credit card form based on payment method selection-------------
    const paymentSelect = document.getElementById("payment");
    const creditCardSection = document.getElementById("credit-card-section");

    paymentSelect.addEventListener("change", () => {
        if (paymentSelect.value === "credit-card") {
            creditCardSection.style.display = "block"; // Show credit card form----------
        } else {
            creditCardSection.style.display = "none"; // Hide credit card form--------
        }
    });

    // Handle form submission---------
    document.getElementById("checkout-form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate form fields-----------
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const paymentMethod = document.getElementById("payment").value;
        let cardNumber, expiryDate, cvv;

        if (paymentMethod === "credit-card") {
            cardNumber = document.getElementById("card-number").value;
            expiryDate = document.getElementById("expiry-date").value;
            cvv = document.getElementById("cvv").value;
        }

        // Basic validation-------------
        if (!name || !address || !paymentMethod) {
            alert("Please fill in all fields.");
            return;
        }

        if (paymentMethod === "credit-card" && (!cardNumber || !expiryDate || !cvv)) {
            alert("Please fill in your credit card details.");
            return;
        }

        // Simulate payment confirmation-----------
        alert(`Thank you, ${name}! Your order will be delivered soon.`);

        // Clear the order from localStorage------------
        localStorage.removeItem("order");

        // Redirect to home page or another page after successful checkout-------------
        window.location.href = "index.html"; // You can redirect to a success page if desired-----------
    });
});
