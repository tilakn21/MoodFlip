function toggleCart(event) {
  event.stopPropagation();
  document.querySelector('.cart').classList.toggle('open');
  updateEmptyMessage();
  updateCartTotal();
}

function closeCartOnClick(event) {
  if (!document.querySelector('.cart').contains(event.target) && !document.querySelector('.cart-icon').contains(event.target)) {
      document.querySelector('.cart').classList.remove('open');
  }
}

function increaseQuantity(button) {
  let quantityElement = button.previousElementSibling;
  quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
}

function decreaseQuantity(button) {
  let quantityElement = button.nextElementSibling;
  let currentQuantity = parseInt(quantityElement.textContent);
  if (currentQuantity > 0) {
      quantityElement.textContent = currentQuantity - 1;
  }
}

function addToCart(button) {
  let card = button.parentElement;
  let name = card.querySelector('h2').textContent;
  let price = parseFloat(card.querySelector('p').textContent.replace('₹', ''));
  let quantity = parseInt(card.querySelector('.quantity').textContent);
  if (quantity > 0) {
      let cartItems = document.querySelector('.cart-items');
      let existingCartItem = Array.from(cartItems.children).find(item => {
          return item.querySelector('.cart-item-details h3') && item.querySelector('.cart-item-details h3').textContent === name;
      });

      if (existingCartItem) {
          let existingQuantity = existingCartItem.querySelector('.cart-item-quantity .quantity');
          existingQuantity.textContent = parseInt(existingQuantity.textContent) + quantity;
      } else {
          let cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <img src="${card.querySelector('img').src}" alt="${name}">
              <div class="cart-item-details">
                  <h3>${name}</h3>
                  <p>₹${price.toFixed(2)}</p>
              </div>
              <div class="cart-item-quantity">
                  <button onclick="changeCartQuantity(this, -1)">-</button>
                  <span class="quantity">${quantity}</span>
                  <button onclick="changeCartQuantity(this, 1)">+</button>
              </div>
          `;
          cartItems.appendChild(cartItem);
      }

      // Reset quantity
      card.querySelector('.quantity').textContent = 0;

      // Show modal
      showModal();

      updateEmptyMessage();
      updateCartTotal();
  }
}

function changeCartQuantity(button, change) {
  let quantityElement = button.parentElement.querySelector('.quantity');
  let newQuantity = parseInt(quantityElement.textContent) + change;

  if (newQuantity > 0) {
      quantityElement.textContent = newQuantity;
  } else {
      button.closest('.cart-item').remove();
  }

  updateEmptyMessage();
  updateCartTotal();
}

function emptyCart() {
  document.querySelector('.cart-items').innerHTML = '';
  updateEmptyMessage();
  updateCartTotal();
}

function updateEmptyMessage() {
  let cartItems = document.querySelector('.cart-items');
  let emptyMessage = document.querySelector('.empty-message');

  if (cartItems.children.length === 0) {
      emptyMessage.style.display = 'block';
  } else {
      emptyMessage.style.display = 'none';
  }
}

function updateCartTotal() {
  let cartItems = document.querySelectorAll('.cart-item');
  let total = 0;
  cartItems.forEach(item => {
      let price = parseFloat(item.querySelector('.cart-item-details p').textContent.replace('₹', ''));
      let quantity = parseInt(item.querySelector('.cart-item-quantity .quantity').textContent);
      total += price * quantity;
  });
  document.getElementById('cart-total-amount').textContent = total.toFixed(2);
}

function proceedToCheckout() {
  alert('Proceeding to checkout...');
}

function showModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'flex';
}

function closeModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
  let modal = document.getElementById('modal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}
