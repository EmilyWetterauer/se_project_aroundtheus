import "./index.css";
//////*****ALL-IMPORTS*****//////
import FormValidator from "../modules/FormValidator.js";
import Card from "../modules/Card.js";
import { cardSelectors } from "../modules/utils.js";
import Section from "../modules/Section.js";
import Popup from "../modules/Popup.js";
import PopupWithForm from "../modules/PopupWithForm.js";
import PopupWithImage from "../modules/PopupWithImage.js";
import UserInfo from "../modules/UserInfo.js";

//////*****ALL-CONSTANTS*****//////
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__saveButton",
  inactiveButtonClass: "popup__saveButton-inactive",
  inputErrorClass: "popup__form-input-type-error",
  errorClass: "popup__form-input-error-active",
  profilePopupSelector: "#profilePopup",
  newCardPopupSelector: "#newCardPopup",
  popupImageWrapperSelector: "#popupImageWrapper",
  authorNameSelector: ".author__name",
  authorDescriptionSelector: ".author__description",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//CONST-DOM-ELEMENTS//
const inputNameElement = document.querySelector(".popup__name");
const inputDescriptionElement = document.querySelector(".popup__description");

const addNewCardButtonElement = document.querySelector(".author__plus-sign");
const newCardPopupElement = document.querySelector("#newCardPopup");
const newCardFormElement = document.querySelector("#newCardForm");
const cardListElement = document.querySelector(".cards__list");
const pencilButtonElement = document.querySelector(".author__pencil");
const editProfileFormElement = document.querySelector("#profileForm");
const profileNameElement = document.querySelector(".author__name");
const profileDescriptionElement = document.querySelector(
  ".author__description"
);
const profilePopupElement = document.querySelector("#profilePopup");
const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
const newCardImageInputElement = document.querySelector("#popup__newCardImage");
//UNIVERSAL CLOSE BUTTON--CONST//
const closeButtons = document.querySelectorAll(".popup__closeBox");

//CONST-INSTANCES//
const popupWithImageInstance = new PopupWithImage(
  selectors.popupImageWrapperSelector
);
popupWithImageInstance.setEventListeners();

// const userInfo = new UserInfo(
//   selectors.authorNameSelector,
//   selectors.authorDescriptionSelector
// );

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
profileFormInstance.setEventListeners();

const newCardFormInstance = new PopupWithForm(
  selectors.newCardPopupSelector,
  handleNewCardFormSubmit
);
newCardFormInstance.setEventListeners();

//////*****EVENT-LISTENERS*****//////
pencilButtonElement.addEventListener("click", function () {
  openProfilePopup(editProfileFormValidator);
});
// editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
// newCardFormElement.addEventListener("submit", function (evt) {
// handleNewCardFormSubmit(evt, newCardFormValidator);
// });
addNewCardButtonElement.addEventListener("click", function () {
  newCardFormInstance.open(newCardPopupElement);
});

//////*****FUNCTIONS*****//////
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  // document.addEventListener("keydown", closePopupOnEscapeButton);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

const userInfo = new UserInfo(
  selectors.authorNameSelector,
  selectors.authorDescriptionSelector
);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileFormValidator.resetValidation();

  userInfo.setUserInfo({
    name: inputNameElement.value,
    description: inputDescriptionElement.value,
  });
  profileFormInstance.close(profilePopupElement);
}

function openProfilePopup(editProfileFormValidator) {
  const userInformation = userInfo.getUserInfo();
  console.log("user information variable here", userInformation);
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

function handleNewCardFormSubmit(evt, newCardFormValidator) {
  evt.preventDefault();

  const newCardObject = {
    name: newCardTitleInputElement.value,
    link: newCardImageInputElement.value,
  };

  const cardElement = createCard(newCardObject);
  cardListElement.prepend(cardElement);

  newCardFormInstance.close(newCardPopupElement);

  /////////////////what is this closePopup connected to??
  closePopup(newCardPopupElement);
  newCardFormElement.reset();
  newCardFormValidator.resetValidation();
}

//////*****FORM-VALIDATOR-STUFF*****//////
newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
