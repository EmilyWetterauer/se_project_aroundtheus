import FormValidator from "./modules/FormValidator.js";
import Card from "./modules/Card.js";
import {
  // closePopup,
  // openPopup,
  // openProfilePopup,
  // handleProfileFormSubmit,
  // handleNewCardFormSubmit,
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

//$$from utils.js//
const profileNameElement = document.querySelector(".author__name");
const inputNameElement = document.querySelector(".popup__name");
const profileDescriptionElement = document.querySelector(
  ".author__description"
);
const inputDescriptionElement = document.querySelector(".popup__description");
const profilePopupElement = document.querySelector("#profilePopup");
const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
const newCardImageInputElement = document.querySelector("#popup__newCardImage");
// const cardListElement = document.querySelector(".cards__list");
// const newCardPopupElement = document.querySelector("#newCardPopup");
// const newCardFormElement = document.querySelector("#newCardForm");
//$$from utils.js//

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
  const cardElement = createCard(cardData);

  cardListElement.append(cardElement);
});

//$$$ MOVED FROM UTILS$$$///
function closePopup(popupElement) {
  document.removeEventListener("keydown", closePopupOnEscapeButton);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
  popupElement.classList.remove("popup_opened");
}

function closePopupOnEscapeButton(event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
}

function closePopupOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscapeButton);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

//HANDLERS//
function openProfilePopup(editProfileFormValidator) {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  editProfileFormValidator.resetValidation();
  openPopup(profilePopupElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;

  closePopup(profilePopupElement);
}

function createCard(newCardObject) {
  const card = new Card(newCardObject, cardSelectors, openPopup);
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

  closePopup(newCardPopupElement);
  newCardFormElement.reset();
  newCardFormValidator.resetValidation();
}

//$$$ MOVED FROM UTILS$$$///

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
