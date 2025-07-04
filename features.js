// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  updateTotal();

  // Like buttons
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      btn.classList.toggle('liked');
    });
  });

  // Delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = btn.closest('.cart-item');
      item.remove();
      updateTotal();
    });
  });

  // Quantity buttons (+ / -)
  const plusButtons = document.querySelectorAll('.plus-btn');
  const minusButtons = document.querySelectorAll('.minus-btn');

  plusButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const quantityElement = btn.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotal();
    });
  });

  minusButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const quantityElement = btn.parentElement.querySelector('.quantity');
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
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
      const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      total += price * quantity;
    });

    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
  }
});
