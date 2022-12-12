import Popup from "./Popup.js";

class PopupWithSubmitButton extends Popup {
  constructor(popupSelector, popupWithFormSubmit) {
    super(popupSelector);
    this.popupWithFormSubmit = popupWithFormSubmit.bind(this);
  }

  open(card) {
    this.setEventListeners(card);
    this.popupElement.classList.add("popup_opened");
  }

  setEventListeners(card) {
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.popupWithFormSubmit(card);
    });
    super.setEventListeners();
  }
}

export default PopupWithSubmitButton;
