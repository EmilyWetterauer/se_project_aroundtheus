import Card from "./Card.js";
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupWithImage = this.popupElement.querySelector(".popup__image");
    this._popupTitleElement = this.popupElement.querySelector(".popup__title");
  }

  open(cardImageSource, cardAltSource) {
    this.popupWithImage.src = cardImageSource;
    this.popupWithImage.alt = cardAltSource;
    this._popupTitleElement.textContent = cardAltSource;
    super.open();
  }
}

export default PopupWithImage;
