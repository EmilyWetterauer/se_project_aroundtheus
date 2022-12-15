import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(action) {
    this._handleFormSubmit = action;
    super.open();
  }

  setEventListeners() {
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}

export default PopupWithConfirmation;
