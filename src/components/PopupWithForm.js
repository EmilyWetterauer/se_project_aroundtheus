import PopupWithSubmit from "./PopupWithSubmit.js";

class PopupWithForm extends PopupWithSubmit {
  constructor(popupSelector, loadingButtonText, action) {
    super(popupSelector, loadingButtonText);
    this._handleFormSubmit = action;
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
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

  close() {
    super.close();
    this.popupElement.querySelector("form").reset();
  }
}

export default PopupWithForm;
