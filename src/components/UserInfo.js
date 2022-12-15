class UserInfo {
  constructor(
    authorNameSelector,
    authorDescriptionSelector,
    editAuthorImageSelector
  ) {
    this.nameElement = document.querySelector(authorNameSelector);
    this.descriptionElement = document.querySelector(authorDescriptionSelector);
    this._authorImageElement = document.querySelector(editAuthorImageSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this.nameElement.textContent,
      userDescription: this.descriptionElement.textContent,
      userAuthorImage: this._authorImageElement.src,
      userId: this.userId,
    };
    return userInfo;
  }

  setUserInfo({ name, description }) {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }

  setAvatar(avatar) {
    this._authorImageElement.src = avatar;
  }

  setUserId(userId) {
    this.userId = userId;
  }
}

export default UserInfo;
