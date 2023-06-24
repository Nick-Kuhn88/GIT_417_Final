"use strict";

// light/dark mode functionality
const body = document.querySelector('body');
const darkModeButton = document.getElementById('darkModeBtn');

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
  const taxRate = .08;
  const taxAmount = cartTotal * taxRate;
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

// JavaScript for form validation and submission
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
  const isValid = validateForm();

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

function validateForm() {
  let isValid = true;

  const fullNameRegex = /^[a-zA-Z\s]+$/;
  if (!fullNameRegex.test(fullNameInput.value)) {
    displayErrorMessage(fullNameInput, 'Please enter a valid full name (letters and spaces only).');
    isValid = false;
  }

  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(phoneNumberInput.value)) {
    displayErrorMessage(phoneNumberInput, 'Please enter a valid 10-digit phone number.');
    isValid = false;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(emailInput.value)) {
    displayErrorMessage(emailInput, 'Please enter a valid email address.');
    isValid = false;
  }

  if (commentsInput.value.trim() === '') {
    displayErrorMessage(commentsInput, 'Please enter your comments.');
    isValid = false;
  }

  const selectedContactMethod = document.querySelector('input[name="contactMethod"]:checked');
  if (!selectedContactMethod) {
    displayErrorMessage(contactMethodInputs[0], 'Please select a preferred contact method.');
    isValid = false;
  }

  return isValid;
}

function displayErrorMessage(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
}

function displayThankYouMessage(customer) {
  thankYouMessage.classList.remove('hidden');
  submittedFullName.textContent = customer.fullName;
  submittedPhoneNumber.textContent = customer.phoneNumber;
  submittedEmail.textContent = customer.email;
  submittedComments.textContent = customer.comments;
  submittedContactMethod.textContent = customer.contactMethod;
}