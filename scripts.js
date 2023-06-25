"use strict";

// light/dark mode functionality
const body = document.querySelector('body');
const darkModeButton = document.getElementById('darkModeBtn');

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
  }
  darkModeButton.addEventListener('click', darkMode);

// Cost calculator functionality 
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartTotalElement = document.getElementById('cartTotal');
const totalAmountElement = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
let cartTotal = 0;

// adding event listener and function to add amount when item button is clicked
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    let productPrice = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
    cartTotal += productPrice;
    cartTotalElement.textContent = cartTotal.toFixed(2); //rounding to two decimal places since it's currency
    updateTotalAmount();
  });
});
// update total after adding 8% tax
function updateTotalAmount() {
  const taxRate = .08;
  let taxAmount = cartTotal * taxRate;
  let totalAmount = cartTotal + taxAmount;
  totalAmountElement.textContent = totalAmount.toFixed(2); //rounding to two decimal places since it's currency
}

//adding event listener and logic to checkout button 
// makes sure cart is not empty
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

// form validation and submission
// get every form input
const contactForm = document.getElementById('contactForm');
const fullNameInput = document.getElementById('fullName');
const phoneNumberInput = document.getElementById('phoneNumber');
const emailInput = document.getElementById('email');
const commentsInput = document.getElementById('comments');
const contactMethodInputs = document.querySelectorAll('input[name="contactMethod"]');
const thankYouMessage = document.getElementById('thankYouMessage');
const submittedFullName = document.getElementById('submittedFullName');
const submittedPhoneNumber = document.getElementById('submittedPhoneNumber');
const submittedEmail = document.getElementById('submittedEmail');
const submittedComments = document.getElementById('submittedComments');
const submittedContactMethod = document.getElementById('submittedContactMethod');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Reset error messages
  resetErrorMessages();

  // Validate form fields
  let isValid = validateForm();

  if (isValid) {
    // Create customer object
    let customer = {
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      email: emailInput.value,
      comments: commentsInput.value,
      contactMethod: document.querySelector('input[name="contactMethod"]:checked').value
    };

    // Display thank you message with submitted details
    displayThankYouMessage(customer);

    // Reset the form
    contactForm.reset();
  }
});

function resetErrorMessages() {
  let errorElements = document.querySelectorAll('.error');
  errorElements.forEach((error) => {
    error.textContent = '';
  });
}

// Validates each input
function validateForm() {
  let isValid = true;

  let fullNameRegex = /^[a-zA-Z\s]+$/;
  if (!fullNameRegex.test(fullNameInput.value)) {
    displayErrorMessage(fullNameInput, 'Please enter a valid full name (letters and spaces only).');
    isValid = false;
  }

  let phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(phoneNumberInput.value)) {
    displayErrorMessage(phoneNumberInput, 'Please enter a valid 10-digit phone number.');
    isValid = false;
  }

  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(emailInput.value)) {
    displayErrorMessage(emailInput, 'Please enter a valid email address.');
    isValid = false;
  }

  if (commentsInput.value.trim() === '') {
    displayErrorMessage(commentsInput, 'Please enter your comments.');
    isValid = false;
  }

  let selectedContactMethod = document.querySelector('input[name="contactMethod"]:checked');
  if (!selectedContactMethod) {
    displayErrorMessage(contactMethodInputs[0], 'Please select a preferred contact method.');
    isValid = false;
  }

  return isValid;
}
//displays error message in the empty div
function displayErrorMessage(inputElement, errorMessage) {
  let errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
}
//display the thank you message and customer object
function displayThankYouMessage(customer) {
  thankYouMessage.classList.remove('hidden');
  submittedFullName.textContent = customer.fullName;
  submittedPhoneNumber.textContent = customer.phoneNumber;
  submittedEmail.textContent = customer.email;
  submittedComments.textContent = customer.comments;
  submittedContactMethod.textContent = customer.contactMethod;
}