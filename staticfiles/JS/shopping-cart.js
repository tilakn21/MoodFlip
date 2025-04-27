let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>₹${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '₹' + countTheSumPrice();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();

// --- Cart Drawer Logic ---
function toggleCartDrawer() {
	const drawer = document.getElementById('cart-drawer');
	const overlay = document.getElementById('cart-drawer-overlay');
	drawer.classList.toggle('open');
	overlay.classList.toggle('open');
}

// --- Quantity Selector Logic & Cart ---
let cart = JSON.parse(localStorage.getItem('moodflip_cart') || '{}');

function updateCartBadge() {
	const badge = document.getElementById('cart-badge');
	let count = 0;
	for (const id in cart) count += cart[id].qty;
	badge.textContent = count;
}

function changeQty(btn, delta) {
	const card = btn.closest('.choco-card');
	const qtyNum = card.querySelector('.qty-num');
	let qty = parseInt(qtyNum.textContent);
	let stock = parseInt(card.getAttribute('data-choco-qty'));
	qty = Math.max(0, Math.min(qty + delta, stock));
	qtyNum.textContent = qty;
	// Update cart live
	const chocoId = card.getAttribute('data-choco-id');
	const name = card.getAttribute('data-choco-name');
	const price = parseFloat(card.getAttribute('data-choco-price'));
	const img = card.getAttribute('data-choco-img');
	if (!cart[chocoId]) cart[chocoId] = { name, price, img, qty: 0 };
	cart[chocoId].qty = qty;
	if (qty === 0) delete cart[chocoId];
	localStorage.setItem('moodflip_cart', JSON.stringify(cart));
	updateCartBadge();
	renderCartDrawer();
}

function renderCartDrawer() {
	const content = document.getElementById('cart-drawer-content');
	content.innerHTML = '';
	let total = 0, hasItems = false;
	for (const id in cart) {
		if (cart[id].qty > 0) {
			hasItems = true;
			total += cart[id].qty * cart[id].price;
			content.innerHTML += `
			<div class="cart-item">
				<img src="${cart[id].img}" class="cart-item-img" alt="${cart[id].name}">
				<div class="cart-item-info">
					<div class="cart-item-name">${cart[id].name}</div>
					<div class="cart-item-price">₹${cart[id].price} × ${cart[id].qty}</div>
				</div>
				<button class="cart-item-remove" onclick="removeFromCart('${id}')"><i class="ri-delete-bin-6-line"></i></button>
			</div>`;
		}
	}
	if (!hasItems) content.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
	document.getElementById('cart-total').textContent = '₹' + total;
}

function removeFromCart(id) {
	if (cart[id]) { delete cart[id]; localStorage.setItem('moodflip_cart', JSON.stringify(cart)); updateCartBadge(); renderCartDrawer(); document.querySelector(`.choco-card[data-choco-id='${id}'] .qty-num`).textContent = 0; }
}

function proceedToCheckout() {
	alert('Checkout functionality coming soon!');
}

// --- On Load ---
updateCartBadge();
renderCartDrawer();

// Sync card quantities with cart
document.addEventListener('DOMContentLoaded', function() {
	for (const id in cart) {
		const card = document.querySelector(`.choco-card[data-choco-id='${id}']`);
		if (card) card.querySelector('.qty-num').textContent = cart[id].qty;
	}
});