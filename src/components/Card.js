export default class Card {

  constructor(infoCard, templateCard, handleCardClick, openF, ownerId) {
    this._infoCard = infoCard
    this._name = infoCard.name;
    this._link = infoCard.link;
    this._templateCard = templateCard;
    this._pic = infoCard;
    this._handleCardClick = handleCardClick;
    this._openF = openF;
    this._likes = infoCard.likes;
    this._ownerId = ownerId
    this._cardId = infoCard._id
  }

  createCard() {
    this._card = this._templateCard.content.firstElementChild.cloneNode(true);
    this._card.querySelector('.element__pic').src = this._link;
    this._card.querySelector('.element__title-text').textContent = this._name;
    this._card.querySelector('.element__pic').alt = this._name;
    this._card.querySelector('.element__title-like-num').textContent = this._likes.length;
    if (!this._isUserOwner()) {
      this._card.querySelector('.element__bin').remove()
    };
    this._addListeners();
    return this._card;
  }

  _isUserOwner() {
    if (this._infoCard.owner._id === this._ownerId) {
      return true;
    }
  }

  //Добавление слушателей к карточке
  _addListeners() {
    this._card.querySelector('.element__title-like').addEventListener('click', this.handlerLike);
    if (this._isUserOwner()) {
      this._card.querySelector('.element__bin').addEventListener('click', () => this._openF(this._infoCard, this._card));
    }
    this._card.querySelector('.element__pic').addEventListener('click', () => {
      this._handleCardClick(this._pic)
    })
  }

  handlerLike(event) {
    event.target.classList.toggle('element__title-like_active');
    
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

}


