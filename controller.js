//Get the entire form div
const form = document.getElementById('userForm');

//Get each input element and store in a NodeList
const inputs = document.querySelectorAll('input');
const errorMsg = document.getElementById('error');

//Loop through each input to add an eventListener
inputs.forEach((input) => {
  input.addEventListener('blur', () => {
    // If there is currently an error message visible from any past error checks, we remove it by changing the class and inner text
    if (input.checkValidity()) {
      errorMsg.textContent = "";
      errorMsg.className = "error"
      input.classList.remove('invalid');
    }
    else {
      // If there is an error, we pass it to our show error method
      showError(input);
    }
  })
})

//checks all fields on clicking the submit button for errors
form.addEventListener('submit', (e) => {
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      showError(input);
    }
  })
  e.preventDefault();
})

function showError(input) {
  const field = input.id;
  let errorText;
  if (input.validity.valueMissing) {
     // Missing an input in a field
    errorText = `You need to enter a valid ${input.getAttribute('data-name')}`
  } else if (input.validity.typeMismatch) {
    // Doesn't match the required type
    errorText = `Entered value needs to match the required type: ${input.getAttribute('data-name')}`
    } else if (input.validity.tooShort) {
      // The input is shorter than the minlength
    errorText = `Your ${input.getAttribute('data-name')} is too short. It should be at least ${input.minLength}`
  }
  
  //Change the text content and add a class to the error div to display it
  errorMsg.textContent = errorText;
  errorMsg.className = "error active";
}