import FormValidator from "./modules/FormValidator.js";
import Card from "./modules/Card.js";
import {
  closePopup,
  openPopup,
  openProfilePopup,
  handleProfileFormSubmit,
  handleNewCardFormSubmit,
  cardSelectors,
} from "./modules/utils.js";

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__saveButton",
  inactiveButtonClass: "popup__saveButton-inactive",
  inputErrorClass: "popup__form-input-type-error",
  errorClass: "popup__form-input-error-active",
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

// DOM ELEMENTS
const addNewCardButtonElement = document.querySelector(".author__plus-sign");
const newCardPopupElement = document.querySelector("#newCardPopup");
const newCardFormElement = document.querySelector("#newCardForm");
const cardListElement = document.querySelector(".cards__list");
const pencilButtonElement = document.querySelector(".author__pencil");
const editProfileFormElement = document.querySelector("#profileForm");

const newCardFormValidator = new FormValidator(selectors, newCardFormElement);
const editProfileFormValidator = new FormValidator(
  selectors,
  editProfileFormElement
);

//UNIVERSAL CLOSE BUTTON--CONST//
const closeButtons = document.querySelectorAll(".popup__closeBox");

//UNIVERSAL CLOSE BUTTON--FOREACH FUNCTION
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");

  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

//FUNCTION --INITIAL CARDS ARRAY

initialCards.forEach(function (cardData) {
  // create an instance with keyword new Card
  const card = new Card(cardData, cardSelectors, openPopup);
  //fill the card with all the card stuff
  const cardElement = card.generateCard();
  //add the card at the beginning or the end of the card list
  cardListElement.append(cardElement);
});

// EVENT LISTENERS
pencilButtonElement.addEventListener("click", function () {
  openProfilePopup(editProfileFormValidator);
});
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", function (evt) {
  handleNewCardFormSubmit(evt, newCardFormValidator);
});
addNewCardButtonElement.addEventListener("click", function () {
  openPopup(newCardPopupElement);
});

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
