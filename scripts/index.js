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
const cardListElement = document.querySelector(".cards__list");
const pencilButtonElement = document.querySelector(".author__pencil");
const popupElement = document.querySelector(".popup");
const xButtonElement = document.querySelector(".popup__xButton");
const profileNameElement = document.querySelector(".author__name");
const profileDescriptionElement = document.querySelector(
  ".author__description"
);
const inputDescriptionElement = document.querySelector(".popup__description");
const inputNameElement = document.querySelector(".popup__name");
const editProfileFormElement = document.querySelector(".popup__form");

function getCardElement(data) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  return cardElement;
}

  initialCards.forEach(function(card, index, array) {
  const cardDataElement = getCardElement(card);

  cardListElement.append(cardDataElement);
});

// EVENT LISTENERS
pencilButtonElement.addEventListener("click", setInputValues);
xButtonElement.addEventListener("click", togglePopupWindow);
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

//EVENT HANDLERS
function setInputValues() {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  togglePopupWindow();
}

function togglePopupWindow() {
  popupElement.classList.toggle("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;
  togglePopupWindow();
}
