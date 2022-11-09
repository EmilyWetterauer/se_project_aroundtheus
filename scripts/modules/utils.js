import Card from "./Card.js";

// function closePopup(popupElement) {
//   document.removeEventListener("keydown", closePopupOnEscapeButton);
//   popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
//   popupElement.classList.remove("popup_opened");
// }

// function closePopupOnEscapeButton(event) {
//   if (event.key === "Escape") {
//     const popupElement = document.querySelector(".popup_opened");
//     closePopup(popupElement);
//   }
// }

// function closePopupOnRemoteClick(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.currentTarget);
//   }
// }

// function openPopup(popupElement) {
//   popupElement.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupOnEscapeButton);
//   popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
// }

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

// const profileNameElement = document.querySelector(".author__name");
// const inputNameElement = document.querySelector(".popup__name");
// const profileDescriptionElement = document.querySelector(
//   ".author__description"
// );
// const inputDescriptionElement = document.querySelector(".popup__description");
// const profilePopupElement = document.querySelector("#profilePopup");
// const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
// const newCardImageInputElement = document.querySelector("#popup__newCardImage");
// const cardListElement = document.querySelector(".cards__list");
// const newCardPopupElement = document.querySelector("#newCardPopup");
// const newCardFormElement = document.querySelector("#newCardForm");

//handlers//
// function openProfilePopup(editProfileFormValidator) {
//   inputNameElement.value = profileNameElement.textContent;
//   inputDescriptionElement.value = profileDescriptionElement.textContent;
//   editProfileFormValidator.resetValidation();
//   openPopup(profilePopupElement);
// }

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileNameElement.textContent = inputNameElement.value;
//   profileDescriptionElement.textContent = inputDescriptionElement.value;

//   closePopup(profilePopupElement);
// }

// function handleNewCardFormSubmit(evt, newCardFormValidator) {
//   evt.preventDefault();

//   const newCardObject = {
//     name: newCardTitleInputElement.value,
//     link: newCardImageInputElement.value,
//   };
//   const card = new Card(newCardObject, cardSelectors, openPopup);
//   const cardElement = card.generateCard();

//   cardListElement.prepend(cardElement);

//   closePopup(newCardPopupElement);
//   newCardFormElement.reset();
//   newCardFormValidator.resetValidation();
// }

// export {
//   closePopup,
//   openPopup,
//   openProfilePopup,
//   handleProfileFormSubmit,
//   handleNewCardFormSubmit,
//   cardSelectors,
// };

export { cardSelectors };
