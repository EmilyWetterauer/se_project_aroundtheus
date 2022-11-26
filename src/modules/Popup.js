import Card from "./Card.js";

class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.closeButton = this.popupElement.querySelector(".popup__closeBox");
  }
  open() {
    this.setEventListeners();
    this.popupElement.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this.closeButton.removeEventListener("click", this.close);
    this.popupElement.removeEventListener(
      "click",
      this._closePopupOnRemoteClick
    );
    this.popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close(this.popupElement);
    }
  }

  _closePopupOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close(this.popupElement);
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this.closeButton.addEventListener("click", this.close.bind(this));
    this.popupElement.addEventListener(
      "click",
      this._closePopupOnRemoteClick.bind(this)
    );
  }
}

export default Popup;
