const showInputError = (selectors, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};
  
export const hideInputError = (selectors, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};
  
const checkInputValidity = (selectors, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
};
  
// const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid)const hasInvalidInput = (inputList) => {
  const hasInvalidInput = (inputList) => { 
return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 
const toggleButtonState = (selectors, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
  
const setEventListeners = (selectors, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(selectors, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(selectors, inputList, buttonElement);
    });
  });
};
  
export const enableValidation = (selectors) => {
  const formList = [...document.querySelectorAll(selectors.formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(selectors, formElement);
  });
};

export const resetValidation = (selectors, popupElement) => {
const formElement = popupElement.querySelector(selectors.formSelector);
   if (formElement !== null) {
    formElement.reset();
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
    inputList.forEach((input) => {
       hideInputError(selectors, formElement, input);
      });
       const buttonElement = popupElement.querySelector(".popup__saveButton");
       toggleButtonState(selectors, inputList, buttonElement);
      
       }
      
    }
  