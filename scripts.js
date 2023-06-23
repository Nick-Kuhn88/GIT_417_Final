"use strict";

// light/dark mode functionality
// const body = document.querySelector('body');
// const darkModeButton = document.getElementById('darkModeBtn');

// darkModeButton.addEventListener('click', () => {
//   body.classList.toggle('dark-mode');
// });

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
  }

// Cost calculator functionality 
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartTotalElement = document.getElementById('cartTotal');
const totalAmountElement = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
let cartTotal = 0;

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productPrice = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
    cartTotal += productPrice;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    updateTotalAmount();
  });
});

function updateTotalAmount() {
  const taxRate = 8;
  const taxAmount = (cartTotal * taxRate) / 100;
  const totalAmount = cartTotal + taxAmount;
  totalAmountElement.textContent = totalAmount.toFixed(2);
}

checkoutBtn.addEventListener('click', () => {
  if (cartTotal === 0) {
    alert('Please add something to the cart before checking out.');
  } else {
    alert('Thank you for your order! Your total cost is $' + totalAmountElement.textContent);
    cartTotal = 0;
    cartTotalElement.textContent = '0.00';
    totalAmountElement.textContent = '0.00';
  }
});

darkModeButton.addEventListener('click', darkMode);