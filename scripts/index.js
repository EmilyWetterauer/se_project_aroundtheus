import { enableValidation, resetValidation } from "./modules/validate.js"; 

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__saveButton",
  inactiveButtonClass: "popup__saveButton-inactive",
  inputErrorClass: "popup__form-input-type-error",
  errorClass: "popup__form-input-error-active"
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
const cardListElement = document.querySelector(".cards__list");
const pencilButtonElement = document.querySelector(".author__pencil");
const profilePopupElement = document.querySelector("#profilePopup");
const profileNameElement = document.querySelector(".author__name");
const profileDescriptionElement = document.querySelector(".author__description");
const inputDescriptionElement = document.querySelector(".popup__description");
const inputNameElement = document.querySelector(".popup__name");
const editProfileFormElement = document.querySelector(".popup__form");
const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
const newCardImageInputElement = document.querySelector("#popup__newCardImage");
const popupImageWrapperElement = document.querySelector("#popupImageWrapper");
const popupImageElement = document.querySelector(".popup__image");
const popupTitleElement = document.querySelector(".popup__imageTitle");


function closePopupOnRemoteClick (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

function closePopupOnEscapeButton (event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  };
};

//UNIVERSAL CLOSE BUTTON--CONST//
const closeButtons = document.querySelectorAll(".popup__closeBox");

//UNIVERSAL CLOSE BUTTON--FOREACH FUNCTION
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");

  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscapeButton);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
};


function closePopup(popupElement) {
  popupElement.removeEventListener("keydown", closePopupOnEscapeButton);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
  popupElement.classList.remove("popup_opened");
resetValidation(selectors, popupElement);
  
}

//FUNCTION FOREACH INITIAL CARD in the ARRAY

initialCards.forEach(function (card) {
  const cardDataElement = getCardElement(card);
  cardListElement.append(cardDataElement);
});

// EVENT LISTENERS
pencilButtonElement.addEventListener("click", openProfilePopup);
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardPopupElement.addEventListener("submit", handleNewCardFormSubmit);

addNewCardButtonElement.addEventListener("click", function () {
  openPopup(newCardPopupElement);
});

//FUNCTIONS

function getCardElement(data) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__name");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  //FIRST//
  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");

  cardLikeButtonElement.addEventListener("click", function () {
    cardLikeButtonElement.classList.toggle("card__like-button-clicked");
  });

  //SECOND//
  const cardTrashCanButtonElement = cardElement.querySelector(
    ".card__trashCanButton"
  );

  cardTrashCanButtonElement.addEventListener("click", function () {
    cardElement.remove();
  });

  //THIRD//

  cardImageElement.addEventListener("click", function (event) {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupTitleElement.textContent = data.name;
    openPopup(popupImageWrapperElement);
  });

  return cardElement;
}

//FUNCTIONS--EVENT HANDLERS
function openProfilePopup() {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  openPopup(profilePopupElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;
  evt.target.reset();
  closePopup(profilePopupElement);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: newCardTitleInputElement.value,
    link: newCardImageInputElement.value,
  };
  const cardDataElement = getCardElement(newCardObject);

  cardListElement.prepend(cardDataElement);
  evt.target.reset();

  closePopup(newCardPopupElement);
}

enableValidation(selectors);