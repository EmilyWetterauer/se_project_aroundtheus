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
  authorImageElement,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "858fdc35-1a69-4429-9930-7fbd511db204",
});

const popupWithImageInstance = new PopupWithImage(
  selectors.popupImageWrapperSelector
);

const cardList = new Section(
  { items: [], renderer: createCard },
  cardSelectors.cardElementListSelector
);

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
  "Saving..."
);

const confirmDeleteCardInstance = new PopupWithConfirmation(
  selectors.confirmCardClosePopupSelector,
  "Saving..."
);

const newCardFormInstance = new PopupWithForm(
  selectors.newCardPopupSelector,
  "Creating..."
);

const editAuthorImageInstance = new PopupWithForm(
  selectors.editAuthorImageSelector,
  "Saving..."
);

authorImagepencilButtonElement.addEventListener("click", function () {
  openAuthorImagePopup(editAuthorImageFormValidator);
});

pencilButtonElement.addEventListener("click", function () {
  openProfilePopup(editProfileFormValidator);
});
addNewCardButtonElement.addEventListener("click", function () {
  newCardFormInstance.open(() => {
    debugger;
    api
      .addCard(newCardFormInstance.getInputValues())
      .then((data) => {
        newCardFormInstance.showLoading();
        const cardElement = createCard(data);

        cardList.addItem(cardElement);

        newCardFormInstance.close(newCardPopupElement);

        newCardFormValidator.resetValidation();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        newCardFormInstance.hideLoading();
      });
  });
});

const userInfo = new UserInfo(
  selectors.authorNameSelector,
  selectors.authorDescriptionSelector,
  selectors.authorImageSelector
);

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
    cardList.items = cards;
    cardList.renderItems();
  })
  .catch((err) => {
    console.log("err", err);
  });

function openAuthorImagePopup(editAuthorImageFormValidator) {
  editAuthorImageFormValidator.resetValidation();
  editAuthorImageInstance.open(() => {
    const authorImage = editAuthorImageInstance.getInputValues();
    debugger;
    api
      .addAuthorImage({
        avatar: authorImage.authorImageLink,
      })
      .then((res) => {
        debugger;
        editAuthorImageInstance.showLoading();
        authorImageElement.src = res.avatar;
        editAuthorImageInstance.close();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        editAuthorImageInstance.hideLoading();
      });
  });
}

function openProfilePopup(editProfileFormValidator) {
  const userInformation = userInfo.getUserInfo();
  inputNameElement.value = userInformation.userName;
  inputDescriptionElement.value = userInformation.userDescription;
  editProfileFormValidator.resetValidation();
  profileFormInstance.open(() => {
    const nameAbout = profileFormInstance.getInputValues();
    api
      .setServerUserInfo({
        name: nameAbout.name,
        about: nameAbout.description,
      })
      .then((userData) => {
        profileFormInstance.showLoading();
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
        profileFormInstance.hideLoading();
      });
  });
}

function handleCardImageClick(cardImageSource, cardAltSource) {
  popupWithImageInstance.open(cardImageSource, cardAltSource);
}

function handleDeleteCard(card) {
  confirmDeleteCardInstance.open(() => {
    api
      .removeCard(card._cardId)
      .then((data) => {
        confirmDeleteCardInstance.showLoading();
        card.deleteCard();

        confirmDeleteCardInstance.close();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        confirmDeleteCardInstance.hideLoading();
      });
  });
}

function addLikes(card) {
  api.addLikes(card._cardId).then((res) => {
    card.setLikes(res.likes);
  });
}

function removeLikes(card) {
  api.removeLikes(card._cardId).then((res) => {
    card.setLikes(res.likes);
  });
}

function createCard(newCardObject) {
  const card = new Card(
    newCardObject,
    cardSelectors,
    handleCardImageClick,
    handleDeleteCard,
    addLikes,
    removeLikes,
    userInfo.userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

newCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAuthorImageFormValidator.enableValidation();
