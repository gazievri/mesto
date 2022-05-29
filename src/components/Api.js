export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  //метод загружает данные пользователя с сервера и возвращает их как объект
  getInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  //метод запрашивает данные с карточками с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  //Метод отправляет данные пользователя на сервер
  sendNewProfileData(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //Метод отправляет данные новой карточки на сервер
  sendNewCardData(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  sendLike(data) {
    return fetch(`${this._url}cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  deleteLike(data) {
    return fetch(`${this._url}cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`)
}

}




