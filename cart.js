document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cart-container");
    const summary = document.getElementById("cart-summary");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        container.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <p><strong>${item.name}</strong> (x${item.quantity})</p>
                <p>₹${itemTotal}</p>
            `;
            container.appendChild(div);
        });
        summary.innerHTML = `Total: ₹${total}`;
    }

    renderCart();
    function renderCart() {
        const container = document.getElementById("cart-container");
        const checkout = document.getElementById("checkout-section");
      
        container.innerHTML = "";
        checkout.innerHTML = "";
      
        let total = 0;
      
        // Cart Items Display
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
      
          const div = document.createElement("div");
          div.className = "cart-item";
          div.innerHTML = `<p><strong>${item.name}</strong> (x${item.quantity})</p><p>₹${itemTotal}</p>`;
          container.appendChild(div);
        });
      
        // Checkout Sidebar
        const section = document.createElement("div");
        section.innerHTML = `
          <h3>Order Summary</h3>
          ${cart.map(item => `
            <div class="item">
              <span>${item.name} x${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>`).join("")}
          <div class="subtotal">Subtotal: ₹${total.toFixed(2)}</div>
          <div class="note">Extra charges may apply</div>
          <button class="checkout-btn">CHECKOUT</button>
        `;

        // Add click event to checkout button
function addCheckoutListener() {
    const checkoutButton = document.querySelector(".checkout-btn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            localStorage.setItem("cartData", JSON.stringify(cart));
            window.location.href = "checkout.html";
        });
    }
}
        checkout.appendChild(section);
        addCheckoutListener();
        
        
      }
      
    
});
