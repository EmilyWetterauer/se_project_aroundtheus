class Api {
  constructor({ groupIdFormat, tokenFormat }) {
    this._groupIdFormat = groupIdFormat;
    this._tokenFormat = tokenFormat;
  }

  getCardList() {
    return fetch(`${this._groupIdFormat}/cards`, {
      headers: {
        authorization: this._tokenFormat,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("ressssss", res);
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
    // .catch((err) => {
    //     console.log(err); // log the error to the console
    //   });
  }

  getUserInfo() {
    return fetch(`${this._groupIdFormat}/users/me`, {
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
    // .catch((err) => {
    //     console.log(err); // log the error to the console
    //   });
  }

  async setServerUserInfo({ name, about }) {
    return fetch(`${this._groupIdFormat}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._groupIdFormat}/cards`, {
      method: "POST",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  removeCard(_id) {
    // console.log("_id", "638d2c27d058f41a9cea8f05");
    return fetch(`${this._groupIdFormat}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addLikes(_id) {
    console.log("_id", _id);
    return fetch(`${this._groupIdFormat}/cards/likes/${_id}`, {
      method: "PUT",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  removeLikes(_id) {
    // console.log("_id", "638d2c27d058f41a9cea8f05");
    return fetch(`${this._groupIdFormat}/cards/likes/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addAuthorImage({ avatar }) {
    return fetch(`${this._groupIdFormat}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._tokenFormat,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

export default Api;
