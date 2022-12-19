import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
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
}

export default PopupWithSubmit;
