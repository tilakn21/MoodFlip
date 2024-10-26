window.addEventListener('load', () => {
	document.body.classList.add('loaded');
  });
const responsiveNavbar = (function () {
	const button = document.querySelector("#menuButton");
	const navbar = document.querySelector("#navbar")
	button.addEventListener("click", function () {
		if (navbar.className === "navbar") {
			navbar.className += " navbarResponsive";
		}
		else {
			navbar.className = "navbar";
		}
	});
})();

if (document.getElementById('hearderSlide')) {
	$('#hearderSlide').multislider();
	$('#hearderSlide').multislider('pause');
}


function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

const textElement = document.getElementById("typed-text");
const textToType = "Moodflip";
let currentIndex = 0;

function typeText() {
  if (currentIndex < textToType.length) {
    textElement.textContent += textToType[currentIndex];
    currentIndex++;
    setTimeout(typeText, 200); // Adjust typing speed here
  } else {
    // Hide loading overlay and show content when typing animation is complete
    document.querySelector('.loading-overlay').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
  }
}

window.onload = typeText;
/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	loop: true,
	spaceBetween: 32,
	coverflowEffect: {
		rotate: 0,
	},
  })


  