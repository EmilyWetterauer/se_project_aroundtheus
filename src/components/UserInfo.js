class UserInfo {
  constructor(authorNameSelector, authorDescriptionSelector) {
    this.nameElement = document.querySelector(authorNameSelector);
    this.descriptionElement = document.querySelector(authorDescriptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this.nameElement.textContent,
      userDescription: this.descriptionElement.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, description }) {
    if (name) this.nameElement.textContent = name;
    if (description) this.descriptionElement.textContent = description;
  }
}

export default UserInfo;
