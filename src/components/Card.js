export default class Card {

  constructor(infoCard, templateCard, handleCardClick, openF, sendLikeApi, deleteLikeApi) {
    this._infoCard = infoCard
    this._name = infoCard.name;
    this._link = infoCard.link;
    this._templateCard = templateCard;
    this._pic = infoCard;
    this._handleCardClick = handleCardClick;
    this._openF = openF;
    this._likes = infoCard.likes;
    this._ownerId = this._infoCard.ownerId//'ae85c4ef997f01f33f113af7' //Мой userID
    this._userLiked = this._likes.some(like => like._id === this._ownerId)// Будет true если есть мой лайк
    this._cardId = infoCard._id//ID карточки
    this._sendLikeApi = sendLikeApi;
    this._deleteLikeApi = deleteLikeApi
  }

  createCard() {
    this._card = this._templateCard.content.firstElementChild.cloneNode(true);
    this._card.querySelector('.element__pic').src = this._link;
    this._card.querySelector('.element__title-text').textContent = this._name;
    this._card.querySelector('.element__pic').alt = this._name;
    this._likeBtn = this._card.querySelector('.element__title-like');
    this._likeNum = this._card.querySelector('.element__title-like-num');
    this._likeNum.textContent = this._likes.length;

    //Удаляет ведерко если карточка не моя
    if (!this._isUserOwner()) {
      this._card.querySelector('.element__bin').remove();
    };

    //Закрашивает сердечко если лайк мой
    if (this._userLiked) {
      this._likeBtn.classList.add('element__title-like_active');
    };

    this._addListeners();
    return this._card;
  }

  //Вернет true если среди лайков есть мой лайк
  _isCardLiked() {
   this._userLiked = this._likes.some(like => {
     return like._id === this._ownerId;
   })
  }

  _isUserOwner() {
    if (this._infoCard.owner._id === this._ownerId) {
      return true;
    }
  }

  //Добавление слушателей к карточке
  _addListeners() {

    this._likeBtn.addEventListener('click', () => {
      if (!this._userLiked) {
        this._sendLikeApi(this._infoCard)
      } else {
        this._deleteLikeApi(this._infoCard)
      }
    });

    if (this._isUserOwner()) {
      this._card.querySelector('.element__bin').addEventListener('click', () => this._openF(this._infoCard, this._card));
    }
    this._card.querySelector('.element__pic').addEventListener('click', () => {
      this._handleCardClick(this._pic)
    })
  }

  handlerLike(res) {
    this._likeBtn.classList.toggle('element__title-like_active');
    this._likeNum.textContent = res.likes.length
    this._userLiked = !this._userLiked;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  sendLikeApi(sendLike) {
    this._sendLikeApi = sendLike;
  }

  deleteLikeApi(deleteLike) {
    this._deleteLikeApi = deleteLike;
  }

}


