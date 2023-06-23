"use strict";

// Cost calculator functionality 
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
let cartTotal = 0;
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productPrice = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
        cartTotal += productPrice;
        totalAmount.textContent = '$' + cartTotal.toFixed(2);
      });
    });
    
    checkoutBtn.addEventListener('click', () => {
      if (cartTotal === 0) {
        alert('Please add something to the cart before checking out.');
      } else {
        alert('Thank you for your order! Your total cost is $' + cartTotal.toFixed(2));
        cartTotal = 0;
        totalAmount.textContent = '$' + cartTotal.toFixed(2);
      }
    );