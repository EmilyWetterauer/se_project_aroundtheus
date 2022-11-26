import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, popupWithFormSubmit) {
    super(popupSelector);
    this.popupWithFormSubmit = popupWithFormSubmit.bind(this);
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
    this.popupElement.addEventListener("submit", this.popupWithFormSubmit);
  }

  close() {
    super.close();
    this.popupElement.querySelector("form").reset();
    debugger;
    this.popupElement.removeEventListener("submit", this.popupWithFormSubmit);
  }
}

export default PopupWithForm;
