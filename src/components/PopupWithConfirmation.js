import PopupWithSubmit from "./PopupWithSubmit";

class PopupWithConfirmation extends PopupWithSubmit {
  constructor(popupSelector, loadingButtonText) {
    super(popupSelector, loadingButtonText);
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  open(action) {
    super.open();
    this._handleFormSubmit = action;
  }
}

export default PopupWithConfirmation;
