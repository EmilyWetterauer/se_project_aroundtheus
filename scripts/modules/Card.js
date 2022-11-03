class Card {
  constructor(data, cardSelectors, openPopup) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._cardTemplateSelector = cardSelectors.cardTemplateSelector;
    this._cardElementSelector = cardSelectors.cardElementSelector;
    this._cardNameSelector = cardSelectors.cardNameSelector;
    this._cardImageSelector = cardSelectors.cardImageSelector;
    this._cardLikeButtonSelector = cardSelectors.cardLikeButtonSelector;
    this._cardLikeButtonClickedSelector =
      cardSelectors.cardLikeButtonClickedSelector;
    this._cardTrashCanButtonSelector = cardSelectors.cardTrashCanButtonSelector;
    this._openPopup = openPopup;
    this._cardPopupImageWrapperSelector =
      cardSelectors.cardPopupImageWrapperSelector;
    this._cardPopupImageSelector = cardSelectors.cardPopupImageSelector;
    this._cardPopupTitleSelector = cardSelectors.cardPopupTitleSelector;
  }

  _getTemplate() {
    const getCardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(this._cardElementSelector)
      .cloneNode(true);

    return getCardElement;
  }

  _populateCard() {
    this._cardElement.querySelector(this._cardImageSelector).src = this._src;
    this._cardElement.querySelector(this._cardImageSelector).alt = this._alt;
    this._cardElement.querySelector(this._cardNameSelector).textContent =
      this._textContent;
  }

  _handleLike() {
    this._cardElement
      .querySelector(this._cardLikeButtonSelector)
      .classList.toggle(this._cardLikeButtonClickedSelector);
  }

  _handleTrashCan() {
    this._cardElement.remove();
  }

  _handlePopup() {
    this._popupImageElement = document.querySelector(
      this._cardPopupImageSelector
    );
    this._popupImageElement.src = this._src;
    this._popupImageElement.alt = this._alt;
    this._popupTitleElement = document.querySelector(
      this._cardPopupTitleSelector
    );
    this._popupTitleElement.textContent = this._textContent;
    this._openPopup(
      document.querySelector(this._cardPopupImageWrapperSelector)
    );
  }

  _addEventListeners() {
    this._cardElement
      .querySelector(this._cardLikeButtonSelector)
      .addEventListener("click", () => {
        this._handleLike();
      });
    this._cardElement
      .querySelector(this._cardTrashCanButtonSelector)
      .addEventListener("click", () => {
        this._handleTrashCan();
      });
    this._cardElement
      .querySelector(this._cardImageSelector)
      .addEventListener("click", () => {
        this._handlePopup();
      });
  }

  generateCard() {
    // Store the markup in the private field _element
    // so that other elements can access it
    this._cardElement = this._getTemplate();

    this._populateCard();
    this._addEventListeners();

    // Return the element
    return this._cardElement;
  }
}

export default Card;
