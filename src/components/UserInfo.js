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
    };
    return userInfo;
  }

  setUserInfo({ name, description, avatar }) {
    if (name) this.nameElement.textContent = name;
    if (description) this.descriptionElement.textContent = description;
    if (avatar) this._authorImageElement.src = avatar;
  }
}

export default UserInfo;
