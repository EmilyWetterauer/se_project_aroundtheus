import PopupWithConfirmation from "./PopupWithConfirmation.js";

class PopupWithForm extends PopupWithConfirmation {
  constructor(popupSelector, loadingButtonText) {
    super(popupSelector, loadingButtonText);
  }

  getInputValues() {
    const inputFields =
      this.popupElement.querySelectorAll(".popup__form-input");

    const inputObject = {};
    inputFields.forEach(function (currentItem) {
      inputObject[currentItem.name] = currentItem.value;
    });
    return inputObject;
  }

  close() {
    super.close();
    this.popupElement.querySelector("form").reset();
  }
}

export default PopupWithForm;
