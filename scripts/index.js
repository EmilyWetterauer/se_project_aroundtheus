import FormValidator from "./modules/FormValidator.js";
import Card from "./modules/Card.js";

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__saveButton",
  inactiveButtonClass: "popup__saveButton-inactive",
  inputErrorClass: "popup__form-input-type-error",
  errorClass: "popup__form-input-error-active",
};

const cardSelectors = {
  cardTemplateSelector: "#cardTemplate",
  cardElementSelector: ".card",
  cardNameSelector: ".card__name",
  cardImageSelector: ".card__image",
  cardLikeButtonSelector: ".card__like-button",
  cardLikeButtonClickedSelector: "card__like-button-clicked",
  cardTrashCanButtonSelector: ".card__trashCanButton",
  cardPopupImageWrapperSelector: "#popupImageWrapper",
  cardPopupImageSelector: ".popup__image",
  cardPopupTitleSelector: ".popup__imageTitle",
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
const profilePopupElement = document.querySelector("#profilePopup");
const profileNameElement = document.querySelector(".author__name");
const profileDescriptionElement = document.querySelector(
  ".author__description"
);
const inputDescriptionElement = document.querySelector(".popup__description");
const inputNameElement = document.querySelector(".popup__name");
const editProfileFormElement = document.querySelector("#profileForm");
const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
const newCardImageInputElement = document.querySelector("#popup__newCardImage");
const popupImageWrapperElement = document.querySelector("#popupImageWrapper");
const popupImageElement = document.querySelector(".popup__image");
const popupTitleElement = document.querySelector(".popup__imageTitle");

const newCardFormValidator = new FormValidator(selectors, newCardFormElement);
const editProfileFormValidator = new FormValidator(
  selectors,
  editProfileFormElement
);

function closePopupOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closePopupOnEscapeButton(event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
}

//UNIVERSAL CLOSE BUTTON--CONST//
const closeButtons = document.querySelectorAll(".popup__closeBox");

//UNIVERSAL CLOSE BUTTON--FOREACH FUNCTION
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");

  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

//FUNCTIONS--OPEN AND CLOSE POPUP
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscapeButton);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closePopup(popupElement) {
  popupElement.removeEventListener("keydown", closePopupOnEscapeButton);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
  popupElement.classList.remove("popup_opened");
}

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
pencilButtonElement.addEventListener("click", openProfilePopup);
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
addNewCardButtonElement.addEventListener("click", function () {
  openPopup(newCardPopupElement);
});

//FUNCTIONS

//FUNCTIONS--EVENT HANDLERS
function openProfilePopup() {
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

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: newCardTitleInputElement.value,
    link: newCardImageInputElement.value,
  };
  const card = new Card(newCardObject, cardSelectors, openPopup);
  const cardElement = card.generateCard();

  cardListElement.prepend(cardElement);

  closePopup(newCardPopupElement);
  newCardFormElement.reset();
  newCardFormValidator.resetValidation();
}

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
