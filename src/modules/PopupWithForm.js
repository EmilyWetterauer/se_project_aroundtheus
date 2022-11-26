import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, popupWithFormSubmit) {
    super(popupSelector);
    this.popupWithFormSubmit = popupWithFormSubmit;
  }

  _getInputValues() {
    const inputFields =
      this.popupElement.querySelectorAll(".popup__form-input");

    const inputObject = {};
    inputFields.forEach(function (currentItem) {
      inputObject[currentItem.name] = currentItem.value;
    });
    return inputObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener(
      "submit",
      this.popupWithFormSubmit.bind(this)
    );
  }

  close() {
    super.close();
    this.popupElement.querySelector("form").reset();
  }
}

export default PopupWithForm;
