import { apiToken, yandexMestoApiURL } from './utils';

class Api {
  constructor({apiURL, headers}){
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res, text) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`${text} - ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._apiURL}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка получения информации о пользователе с сервера');
    })
  }

  getInitialCards() {
    return fetch(this._apiURL + '/cards/', {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения карточек с сервера');
      })
  }

  addNewPlace(data) {
    return fetch(this._apiURL + '/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка добавления карточки на сервер');
      })
  }

  removeCard(id) {
    return fetch(this._apiURL + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка удаления карточки с сервера');
      })
  }

  changeLikeCardStatus(id, isLiked) {
    const url = this._apiURL + '/cards/likes/' + id
    const methodName = isLiked ? 'PUT' : 'DELETE';
    return fetch(url, {
      method: methodName,
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка изменения лайка для карточки');
    })
  }

  editAvatar(url) {
    return fetch(this._apiURL + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url
      }),
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка изменения аватара пользователя');
    })
  }

  editUserInfo(data) {
    return fetch(this._apiURL + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка изменения информации пользователя');
    })
  }
}
const api = new Api({ apiURL:yandexMestoApiURL, headers: {
  authorization: apiToken,
  'Content-Type': 'application/json; charset=UTF-8'
} });
export default api;
