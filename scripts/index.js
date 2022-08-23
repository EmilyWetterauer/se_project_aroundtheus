const initialCards = [
  (object1 = {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  }),
  (object2 = {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  }),
  (object3 = {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  }),
  (object4 = {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  }),
  (object5 = {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  }),
  (object6 = {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  }),
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
const saveButtonElement = document.querySelector(".popup__saveButton");

// Declare a getCardElement() function with one parameter named data.
//You’ll be passing objects of the array to it. The function should:
function getCardElement(data) {
  // clone the template element with all its content and store it in
  //a cardElement variable
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // access the card title and image and store them in variables
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  // set the path to the image to the link field of the object
  cardImageElement.src = data.link;
  // set the image alt text to the name field of the object
  cardImageElement.alt = data.name;
  // set the card title to the name field of the object, too
  cardTitleElement.textContent = data.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}
//Iterate over the cards array using a loop and run your new function upon each iteration to render the card one by one.

for (const card of initialCards) {
  const cardLink = card.link;
  const cardName = card.name;
  const cardData = {
    name: cardName,
    link: cardLink,
  };
  const cardDataElement = getCardElement(cardData);

  cardListElement.append(cardDataElement);
}

// EVENT LISTENERS
pencilButtonElement.addEventListener("click", setInputValues);
xButtonElement.addEventListener("click", togglePopupWindow);
saveButtonElement.addEventListener("click", saveInputValues);

//EVENT HANDLERS
function setInputValues() {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  togglePopupWindow();
}

function togglePopupWindow() {
  popupElement.classList.toggle("popup__opened");
}

function saveInputValues(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;
  togglePopupWindow();
}
