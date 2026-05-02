document.addEventListener("DOMContentLoaded", function () {

    let cart = [];

    const productCards = document.querySelectorAll(".product-card");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const cartItems = document.getElementById("cart-items");

    // 🛒 ADD TO CART (click on product)
    productCards.forEach(card => {

        card.addEventListener("click", function () {

            const name = card.querySelector("h3").innerText;
            const price = parseInt(card.querySelector("p").innerText.replace("₹", ""));
            const image = card.querySelector("img").src;

            cart.push({ name, price, image });
            updateCart();
        });

    });

    // 🔄 UPDATE CART
    function updateCart() {
        cartCount.innerText = cart.length;

        let total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPrice.innerText = total;

        cartItems.innerHTML = cart.map((item, index) => `
            <div style="display:flex; align-items:center; gap:10px; margin:5px 0;">
                <img src="${item.image}" width="40">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `).join("");
    }

    // ❌ REMOVE ITEM
    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCart();
    }

    // 🔍 SEARCH FUNCTION
    document.getElementById("searchInput").addEventListener("keyup", function () {
        let value = this.value.toLowerCase();

        productCards.forEach(card => {
            let name = card.querySelector("h3").innerText.toLowerCase();

            if (name.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 🛍️ BUY NOW BUTTON
    document.getElementById("buyNowBtn").addEventListener("click", function () {

        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        document.getElementById("order-overlay").style.display = "block";
    });

    // ❌ CLOSE ORDER FORM
    window.closeOrderForm = function () {
        document.getElementById("order-overlay").style.display = "none";
    }

    // 📲 WHATSAPP ORDER
    window.submitOrder = function () {

        const name = document.getElementById("cust-name").value;
        const mobile = document.getElementById("cust-mobile").value;
        const address = document.getElementById("cust-address").value;

        if (!name || !mobile || !address) {
            alert("Please fill all details!");
            return;
        }

        let message = `🧾 New Order\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n📍 Address: ${address}\n\n🛒 Items:\n`;

        cart.forEach((item, i) => {
            message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
        });

        let total = cart.reduce((sum, item) => sum + item.price, 0);
        message += `\n💰 Total: ₹${total}`;

        // 👉 Your WhatsApp number
        window.open("https://wa.me/918980948396?text=" + encodeURIComponent(message), "_blank");
    }

});