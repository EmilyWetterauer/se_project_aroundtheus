import { addNewCardButtonElement } from "../utils/constants";

class Card {
  constructor(
    data,
    cardSelectors,
    handleCardImageClick,
    handleDeleteCard,
    // openPopup,
    // openPopupConfirmDeleteCard,
    addLikes,
    removeLikes,
    userId
  ) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
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
    // this._openPopup = openPopup;
    this.handleCardImageClick = handleCardImageClick;
    this._cardPopupImageWrapperSelector =
      cardSelectors.cardPopupImageWrapperSelector;
    this._cardPopupImageSelector = cardSelectors.cardPopupImageSelector;
    this._cardPopupTitleSelector = cardSelectors.cardPopupTitleSelector;
    // this._openPopupConfirmDeleteCard = openPopupConfirmDeleteCard;
    this.handleDeleteCard = handleDeleteCard;
  }

  _renderLikes() {
    const heartAmountElement = this._cardElement.querySelector(
      this._cardLikeButtonAmountSelector
    );
    heartAmountElement.textContent = this._likes.length;
    const heartLikeButtonElement = this._cardElement.querySelector(
      this._cardLikeButtonSelector
    );
    if (this._isLiked()) {
      heartLikeButtonElement.classList.add(this._cardLikeButtonClickedSelector);
    } else {
      heartLikeButtonElement.classList.remove(
        this._cardLikeButtonClickedSelector
      );
    }
  }

  _isLiked() {
    let hasId = false;
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        hasId = true;
      }
    });
    return hasId;
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
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
    this._renderLikes();
    this._renderTrashCan();
  }

  _renderTrashCan() {
    if (this._userId !== this._ownerId) {
      this._cardElement
        .querySelector(this._cardTrashCanButtonSelector)
        .classList.add("card__trashCanButton_hidden");
    }
  }

  _handleLike() {
    if (!this._isLiked()) {
      this._addLikes(this);
    } else {
      this._removeLikes(this);
    }
  }

  deleteCard() {
    this._cardElement.remove();
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
        this.handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(this._cardImageSelector)
      .addEventListener("click", () => {
        this.handleCardImageClick(this._src, this._alt);
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
