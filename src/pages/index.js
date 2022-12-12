import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { cardSelectors } from "../utils/utils.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  selectors,
  initialCards,
  inputNameElement,
  inputDescriptionElement,
  addNewCardButtonElement,
  newCardPopupElement,
  newCardFormElement,
  cardListElement,
  pencilButtonElement,
  authorImagePopupElement,
  authorImagepencilButtonElement,
  authorImageFormElement,
  authorImageUrlElement,
  editProfileFormElement,
  profileNameElement,
  profileDescriptionElement,
  profilePopupElement,
  newCardTitleInputElement,
  newCardImageInputElement,
  closeButtons,
  authorImageSaveButtonElement,
  editProfileSaveButtonElement,
  newCardSaveButtonElement,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import { data } from "autoprefixer";
import PopupWithSubmitButton from "../components/popupWithSubmitButton";

//MY OWNER ID ON SERVER FOR CARDS//
//"786ca0d426e82fd2313561d9"
const api = new Api({
  groupIdFormat: "https://around.nomoreparties.co/v1/group-12",
  tokenFormat: "858fdc35-1a69-4429-9930-7fbd511db204",
});

const popupWithImageInstance = new PopupWithImage(
  selectors.popupImageWrapperSelector
);

const cardList = new Section(
  { items: [], renderer: createCard },
  cardSelectors.cardElementListSelector
);

api.getCardList().then((cards) => {
  cardList.items = cards;

  cardList.renderItems();
});

const newCardFormValidator = new FormValidator(selectors, newCardFormElement);
const editProfileFormValidator = new FormValidator(
  selectors,
  editProfileFormElement
);
const editAuthorImageFormValidator = new FormValidator(
  selectors,
  authorImageFormElement
);

const profileFormInstance = new PopupWithForm(
  selectors.profilePopupSelector,
  handleProfileFormSubmit
);

const confirmDeleteCardInstance = new PopupWithSubmitButton(
  selectors.confirmCardClosePopupSelector,
  handleConfirmDeleteSubmit
);

const newCardFormInstance = new PopupWithForm(
  selectors.newCardPopupSelector,
  handleNewCardFormSubmit
);

const editAuthorImageInstance = new PopupWithForm(
  selectors.editAuthorImageSelector,
  handleEditAuthorImageFormSubmit
);

authorImagepencilButtonElement.addEventListener("click", function () {
  openAuthorImagePopup(editAuthorImageFormValidator);
});

pencilButtonElement.addEventListener("click", function () {
  openProfilePopup(editProfileFormValidator);
});
addNewCardButtonElement.addEventListener("click", function () {
  newCardFormInstance.open(newCardPopupElement);
});
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

const userInfo = new UserInfo(
  selectors.authorNameSelector,
  selectors.authorDescriptionSelector,
  selectors.editAuthorImageSelector
);

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
});

function handleProfileFormSubmit(evt) {
  editProfileSaveButtonElement.innerText = "Saving...";
  evt.preventDefault();
  const nameAbout = profileFormInstance.getInputValues();
  api
    .setServerUserInfo({
      name: nameAbout.name,
      about: nameAbout.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });
      editProfileFormValidator.resetValidation();
      profileFormInstance.close(profilePopupElement);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      editProfileSaveButtonElement.innerText = "Save";
    });
}

function handleEditAuthorImageFormSubmit(evt) {
  authorImageSaveButtonElement.innerText = "Saving...";
  evt.preventDefault();
  const authorImage = editAuthorImageInstance.getInputValues();
  api
    .addAuthorImage({
      avatar: authorImage.authorImageLink,
    })
    .then((res) => {
      editAuthorImageInstance.close();
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      authorImageSaveButtonElement.innerText = "Save";
    });
}

function openAuthorImagePopup(editAuthorImageFormValidator) {
  editAuthorImageFormValidator.resetValidation();
  editAuthorImageInstance.open(authorImagePopupElement);
}

function openProfilePopup(editProfileFormValidator) {
  const userInformation = userInfo.getUserInfo();
  inputNameElement.value = userInformation.userName;
  inputDescriptionElement.value = userInformation.userDescription;
  editProfileFormValidator.resetValidation();
  profileFormInstance.open(profilePopupElement);
}

function handleCardClick(cardImageSource, cardAltSource) {
  popupWithImageInstance.open(cardImageSource, cardAltSource);
}

function openPopupConfirmDeleteCard(card) {
  console.log("card", card);
  confirmDeleteCardInstance.open(card);
}

function addLikes(card) {
  api.addLikes(card._cardId).then((res) => {
    card._likes = res.likes;
    card.setLikes();
  });
  console.log("addLikes");
}

function removeLikes(card) {
  api.removeLikes(card._cardId).then((res) => {
    card._likes = res.likes;
    card.setLikes();
  });
}

function createCard(newCardObject) {
  const card = new Card(
    newCardObject,
    cardSelectors,
    handleCardClick,
    openPopupConfirmDeleteCard,
    addLikes,
    removeLikes
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handleConfirmDeleteSubmit(card) {
  api
    .removeCard(card._cardId)
    .then((data) => {
      card._cardElement.remove(this._cardId);

      confirmDeleteCardInstance.close();
      console.log("data", data);
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function handleNewCardFormSubmit(evt) {
  newCardSaveButtonElement.innerText = "Saving...";
  evt.preventDefault();
  api
    .addCard(newCardFormInstance.getInputValues())
    .then((data) => {
      const cardElement = createCard(data);

      cardList.addItem(cardElement);

      newCardFormInstance.close(newCardPopupElement);

      newCardFormValidator.resetValidation();
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      newCardSaveButtonElement.innerText = "Save";
    });
}

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAuthorImageFormValidator.enableValidation();
