const showInputError = (selectors, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };
  
  const hideInputError = (selectors, formElement, inputElement) => {
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
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(selectors, formElement, inputElement);
        toggleButtonState(selectors, inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListeners(selectors, formElement);
    });
  };
  
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".form__input",
    submitButtonSelector: ".popup__saveButton",
    inactiveButtonClass: "popup__saveButton-inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
  }); 