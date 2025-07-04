// Add to Cart functionality
document.addEventListener("DOMContentLoaded", function () {
  const cartItemDiv = document.querySelector(".cart-item");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartTotal = document.getElementById("total-price");
  let cart = [];

  function updateCartDisplay() {
    cartItemDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, idx) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-product";
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="product-image" style="width:40px; height:40px; margin-bottom:0;">
        <span class="item-name">${item.name}</span>
        <span class="price">Ksh ${item.price}</span>
        <button class="minus-btn" data-idx="${idx}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="plus-btn" data-idx="${idx}">+</button>
      `;
      cartItemDiv.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
    // Animate total price
    cartTotal.classList.add("animated");
    cartTotal.textContent = `Ksh ${total.toFixed(2)}`;
    setTimeout(() => {
      cartTotal.classList.remove("animated");
    }, 500);

    // Add event listeners for plus and minus buttons
    cartItemDiv.querySelectorAll(".plus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(btn.getAttribute("data-idx"));
        cart[idx].quantity += 1;
        updateCartDisplay();
      });
    });
    cartItemDiv.querySelectorAll(".minus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(btn.getAttribute("data-idx"));
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        } else {
          cart.splice(idx, 1);
        }
        updateCartDisplay();
      });
    });
  }

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const block = btn.closest(".product-block");
      const name = block.getAttribute("data-name");
      const price = parseFloat(block.getAttribute("data-price"));
      const img = block.getAttribute("data-img");
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, img, quantity: 1 });
      }
      updateCartDisplay();
    });
  });
});
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  updateTotal();

  // Like buttons
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.classList.toggle("liked");
    });
  });

  // Delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".cart-item");
      item.remove();
      updateTotal();
    });
  });

  // Quantity buttons (+ / -)
  const plusButtons = document.querySelectorAll(".plus-btn");
  const minusButtons = document.querySelectorAll(".minus-btn");

  plusButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const quantityElement = btn.parentElement.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotal();
    });
  });

  minusButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const quantityElement = btn.parentElement.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotal();
      }
    });
  });

  // Function to update total price
  function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-item");
    let total = 0;

    cartItems.forEach((item) => {
      const price = parseFloat(
        item.querySelector(".price").textContent.replace("$", "")
      );
      const quantity = parseInt(item.querySelector(".quantity").textContent);
      total += price * quantity;
    });

    document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
  }
});
