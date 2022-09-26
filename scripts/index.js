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
const profileXButtonElement = document.querySelector("#profileXButton");
const newCardXButtonElement = document.querySelector("#newCardXButton");

const profileNameElement = document.querySelector(".author__name");
const profileDescriptionElement = document.querySelector(".author__description");
const inputDescriptionElement = document.querySelector(".popup__description");
const inputNameElement = document.querySelector(".popup__name");
const editProfileFormElement = document.querySelector(".popup__form");
const newCardTitleInputElement = document.querySelector("#popup__newCardTitle");
const newCardImageInputElement = document.querySelector("#popup__newCardImage");
const popupImageWrapperElement = document.querySelector("#popupImageWrapper");
const imageXButtonElement = document.querySelector("#imageOpenedXButton");
const popupImageElement = document.querySelector(".popup__image");
const popupTitleElement = document.querySelector(".popup__imageTitle");

//FUNCTION FOR EACH--INITIAL CARD in the ARRAY

initialCards.forEach(function(card, index, array) {
  const cardDataElement = getCardElement(card);
  
  cardListElement.append(cardDataElement);
  const cardLikeButtonElement = cardDataElement.querySelector(".card__like-button");
  
  cardLikeButtonElement.addEventListener("click", function() {
    cardLikeButtonElement.classList.toggle("card__like-button-clicked")

  });

  const cardTrashCanButtonElement = cardDataElement.querySelector(".card__trashCanButton");
  cardTrashCanButtonElement.addEventListener("click", function() {
    cardDataElement.remove();
  });
  
  
  const cardImageElement = cardDataElement.querySelector(".card__image");
  cardImageElement.addEventListener("click", function(event) {
    
    toggleCardImageOpenedWindow()
    popupImageElement.src = event.target.src
   popupTitleElement.textContent = event.target.alt
  });
  
  
});


// EVENT LISTENERS
pencilButtonElement.addEventListener("click", setInputValues);
profileXButtonElement.addEventListener("click", togglePopupWindow);
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardPopupElement.addEventListener("submit", handleNewCardFormSubmit);

addNewCardButtonElement.addEventListener("click", toggleCardPopupWindow);
newCardXButtonElement.addEventListener("click", toggleCardPopupWindow);
imageXButtonElement.addEventListener("click", toggleCardImageOpenedWindow);


//FUNCTIONS

function getCardElement(data) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
  const cardTitleElement = cardElement.querySelector(".card__name");
  const cardImageElement = cardElement.querySelector(".card__image");
  
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  
  
  return cardElement;
}


//FUNCTIONS--EVENT HANDLERS
function setInputValues() {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  togglePopupWindow();
}

function toggleCardImageOpenedWindow() {
   popupImageWrapperElement.classList.toggle("popup_opened");
   
 };

function togglePopupWindow() {
  profilePopupElement.classList.toggle("popup_opened");
}
function toggleCardPopupWindow() {
  newCardPopupElement.classList.toggle("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;
  togglePopupWindow();
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardObject = 
    {
      name: newCardTitleInputElement.value,
      link: newCardImageInputElement.value,
    }
    const cardDataElement = getCardElement(newCardObject);

    cardListElement.prepend(cardDataElement);
    
    const cardLikeButtonElement = cardDataElement.querySelector(".card__like-button");
    
    cardLikeButtonElement.addEventListener("click", function() {
      cardLikeButtonElement.classList.toggle("card__like-button-clicked")
    });
const cardTrashCanButtonElement = cardDataElement.querySelector(".card__trashCanButton");
cardTrashCanButtonElement.addEventListener("click", function(card) {
  cardDataElement.remove();
});

const cardImageElement = cardDataElement.querySelector(".card__image");
  cardImageElement.addEventListener("click", function(event) {
    
    toggleCardImageOpenedWindow()
    popupImageElement.src = event.target.src
   popupTitleElement.textContent = event.target.alt
  });

    toggleCardPopupWindow();
}





