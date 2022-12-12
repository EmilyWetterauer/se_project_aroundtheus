import { addNewCardButtonElement } from "../utils/constants";

class Card {
  constructor(
    data,
    cardSelectors,
    openPopup,
    openPopupConfirmDeleteCard,
    addLikes,
    removeLikes
  ) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._cardId = data._id;
    this._cardTemplateSelector = cardSelectors.cardTemplateSelector;
    this._cardElementSelector = cardSelectors.cardElementSelector;
    this._cardNameSelector = cardSelectors.cardNameSelector;
    this._cardImageSelector = cardSelectors.cardImageSelector;
    this._cardLikeButtonSelector = cardSelectors.cardLikeButtonSelector;
    this._cardLikeButtonClickedSelector =
      cardSelectors.cardLikeButtonClickedSelector;
    this._cardLikeButtonAmountSelector =
      cardSelectors.cardLikeButtonAmountSelector;
    this._likes = data.likes;
    this._numberOfLikes = 0;
    this._addLikes = addLikes;
    this._removeLikes = removeLikes;
    this._cardTrashCanButtonSelector = cardSelectors.cardTrashCanButtonSelector;
    this._openPopup = openPopup;
    this._cardPopupImageWrapperSelector =
      cardSelectors.cardPopupImageWrapperSelector;
    this._cardPopupImageSelector = cardSelectors.cardPopupImageSelector;
    this._cardPopupTitleSelector = cardSelectors.cardPopupTitleSelector;
    this._openPopupConfirmDeleteCard = openPopupConfirmDeleteCard;
  }

  setLikes() {
    const HeartAmountElement = this._cardElement.querySelector(
      this._cardLikeButtonAmountSelector
    );
    HeartAmountElement.textContent = this._likes.length;
    const heartLikeButtonElement = this._cardElement.querySelector(
      this._cardLikeButtonSelector
    );
    let hasId = false;
    this._likes.forEach((like) => {
      if (like._id === "786ca0d426e82fd2313561d9") {
        hasId = true;
      }
    });
    if (hasId === true) {
      heartLikeButtonElement.classList.add(this._cardLikeButtonClickedSelector);
    } else {
      heartLikeButtonElement.classList.remove(
        this._cardLikeButtonClickedSelector
      );
    }
  }

  getId() {
    return this._cardId;
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
    this.setLikes();
  }

  _handleLike() {
    const heartLikeButtonElement = this._cardElement.querySelector(
      this._cardLikeButtonSelector
    );

    if (heartLikeButtonElement.classList.length === 1) {
      this._addLikes(this);
    } else {
      this._removeLikes(this);
    }
  }

  handleDeleteCard() {
    this._cardElement.remove(this._cardId);
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
        console.log("thisss", this);
        this._openPopupConfirmDeleteCard(this);
      });
    this._cardElement
      .querySelector(this._cardImageSelector)
      .addEventListener("click", () => {
        this._openPopup(this._src, this._alt);
      });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._populateCard();
    this._addEventListeners();
    return this._cardElement;
  }
}

export default Card;
