import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { cardSelectors } from "../utils/utils.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
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

  userInfo.setUserInfo(profileFormInstance.getInputValues());
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

  const cardElement = createCard(newCardFormInstance.getInputValues());
  cardList.addItem(cardElement);

  newCardFormInstance.close(newCardPopupElement);

  newCardFormValidator.resetValidation();
}

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
