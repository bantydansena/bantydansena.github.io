document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");

    const menuItems = [
        { id: 1, name: "Margherita Pizza", price: 250, image: "Assets/Resturents/Donino Pizza.jpeg" },
        { id: 2, name: "Veg Burger", price: 150, image: "Assets/Resturents/Menu 1.jpg" },
        { id: 3, name: "Pasta Alfredo", price: 220, image: "Assets/Resturents/pasta.jpeg" },
        { id: 4, name: "Caesar Salad", price: 180, image: "Assets/Resturents/Salat.jpeg" },
    ];

    function showCartPopup() {
        const popup = document.getElementById("cart-popup");

        if (!popup) {
            console.error("Cart popup element not found!");
            return;
        }

        popup.style.display = "flex";
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
            popup.style.display = "none";
        }, 3000);
    }

    function updateCart(item, quantityDisplay, control) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        const updated = cart.find(i => i.id === item.id);
        quantityDisplay.textContent = updated.quantity;
        showCartPopup();
    }

    function createQuantityControls(item) {
        const control = document.createElement("div");
        control.className = "quantity-control";

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";

        const qtyDisplay = document.createElement("span");
        qtyDisplay.className = "quantity-number";
        qtyDisplay.textContent = "1";

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";

        control.appendChild(minusBtn);
        control.appendChild(qtyDisplay);
        control.appendChild(plusBtn);

        // Save to cart initially
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(i => i.id === item.id);
        if (!existing) {
            cart.push({ ...item, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        plusBtn.addEventListener("click", () => {
            updateCart(item, qtyDisplay, control);
        });

        minusBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const found = cart.find(i => i.id === item.id);
            if (found) {
                found.quantity -= 1;
                if (found.quantity <= 0) {
                    cart = cart.filter(i => i.id !== item.id);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    control.replaceWith(createAddButton(item));
                } else {
                    qtyDisplay.textContent = found.quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            }
        });

        return control;
    }

    function createAddButton(item) {
        const addBtn = document.createElement("button");
        addBtn.textContent = "Add to Cart";

        addBtn.addEventListener("click", () => {
            const control = createQuantityControls(item);
            addBtn.replaceWith(control);
            showCartPopup();
        });

        return addBtn;
    }

    menuItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
            </div>
        `;

        const detailsDiv = card.querySelector(".details");
        const buttonContainer = document.createElement("div");
        buttonContainer.appendChild(createAddButton(item));
        detailsDiv.appendChild(buttonContainer);

        menuContainer.appendChild(card);
    });
});
