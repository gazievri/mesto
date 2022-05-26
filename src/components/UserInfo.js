export default class UserInfo {
  constructor ({nameSelector, occupationSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._occupation.textContent
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._occupation.textContent = userInfo.about;
  }

  setUserAvatar(userInfo) {
    this._avatar.src = userInfo.avatar
  }
}




