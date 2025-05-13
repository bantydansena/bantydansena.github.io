const TAX_RATE = 0.056;

function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartDetails");

  let subtotal = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} - ₹${item.price * item.quantity}`;
    container.appendChild(div);
    subtotal += item.price * item.quantity;
  });

  const tax = (subtotal * TAX_RATE).toFixed(2);
  let total = subtotal + parseFloat(tax);

  document.getElementById("taxes").textContent = tax;
  document.getElementById("total").textContent = total.toFixed(2);

  const donateCheckbox = document.getElementById("donate");
  if (donateCheckbox) {
    donateCheckbox.addEventListener("change", function () {
      const finalTotal = this.checked ? total + 1 : total;
      document.getElementById("total").textContent = finalTotal.toFixed(2);
    });
  }

  const profile = JSON.parse(localStorage.getItem("foodFrenzyUser")) || {};
  document.getElementById("name").value = profile.username || "";
  document.getElementById("email").value = profile.email || "";
}

function makePayment() {
  const method = document.getElementById("paymentMethod").value;
  alert(`Order placed using: ${method}`);

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const orders = JSON.parse(localStorage.getItem("cart")) || [];
  const amount = document.getElementById("total").textContent;

  if (!name || !email || orders.length === 0 || !amount) {
    alert("Missing required information to generate receipt.");
    return;
  }

  const orderDetails = orders.map(
    item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
  ).join("\n");

  const content = 
    `--- Payment Receipt ---\n\n` +
    `Name: ${name}\n` +
    `Gmail: ${email}\n\n` +
    `Orders:\n${orderDetails}\n\n` +
    `Total Amount Paid: ₹${amount}\n` +
    `Payment Method: ${method}\n` +
    `Date: ${new Date().toLocaleString()}`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt_${name.replace(/\s+/g, '_')}.txt`;
  link.click();

  URL.revokeObjectURL(url);
}

window.onload = loadCheckout;
