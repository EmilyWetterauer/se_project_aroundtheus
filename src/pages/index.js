import "./index.css";
import FormValidator from "../modules/FormValidator.js";
import Card from "../modules/Card.js";
import { cardSelectors } from "../utils/utils.js";
import Section from "../modules/Section.js";
import Popup from "../modules/Popup.js";
import PopupWithForm from "../modules/PopupWithForm.js";
import PopupWithImage from "../modules/PopupWithImage.js";
import UserInfo from "../modules/UserInfo.js";
import {
  selectors,
  initialCards,
  inputNameElement,
  inputDescriptionElement,
  addNewCardButtonElement,
  newCardPopupElement,
  newCardFormElement,
  cardListElement,
  pencilButtonElement,
  editProfileFormElement,
  profileNameElement,
  profileDescriptionElement,
  profilePopupElement,
  newCardTitleInputElement,
  newCardImageInputElement,
  closeButtons,
} from "../utils/constants.js";

const popupWithImageInstance = new PopupWithImage(
  selectors.popupImageWrapperSelector
);
const cardList = new Section(
  { items: initialCards, renderer: createCard },
  cardSelectors.cardElementListSelector
);
cardList.renderItems();
const newCardFormValidator = new FormValidator(selectors, newCardFormElement);
const editProfileFormValidator = new FormValidator(
  selectors,
  editProfileFormElement
);
const profileFormInstance = new PopupWithForm(
  selectors.profilePopupSelector,
  handleProfileFormSubmit
);
const newCardFormInstance = new PopupWithForm(
  selectors.newCardPopupSelector,
  handleNewCardFormSubmit
);

pencilButtonElement.addEventListener("click", function () {
  openProfilePopup(editProfileFormValidator);
});
addNewCardButtonElement.addEventListener("click", function () {
  newCardFormInstance.open(newCardPopupElement);
});
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

const userInfo = new UserInfo(
  selectors.authorNameSelector,
  selectors.authorDescriptionSelector
);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileFormValidator.resetValidation();

  console.log("profile form instance...", profileFormInstance._getInputValues);
  userInfo.setUserInfo(profileFormInstance._getInputValues());
  profileFormInstance.close(profilePopupElement);
}

function openProfilePopup(editProfileFormValidator) {
  const userInformation = userInfo.getUserInfo();
  inputNameElement.value = userInformation.userName;
  inputDescriptionElement.value = userInformation.userDescription;
  editProfileFormValidator.resetValidation();
  profileFormInstance.open(profilePopupElement);
}

function handleCardClick(cardImageSource, cardAltSource) {
  popupWithImageInstance.open(cardImageSource, cardAltSource);
}

function createCard(newCardObject) {
  const card = new Card(newCardObject, cardSelectors, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = createCard(newCardFormInstance._getInputValues());
  cardList.addItem(cardElement);

  newCardFormInstance.close(newCardPopupElement);

  newCardFormValidator.resetValidation();
}

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
