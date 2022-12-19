import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super(popupSelector);
    this._submitButton = this.popupElement.querySelector(".popup__saveButton");
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
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
