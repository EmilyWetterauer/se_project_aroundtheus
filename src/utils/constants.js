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
const closeButtons = document.querySelectorAll(".popup__closeBox");

export {
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
};
