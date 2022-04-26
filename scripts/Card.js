class Card {

  constructor(infoCard, templateCard, openImagePopup) {
    this._name = infoCard.name;
    this._link = infoCard.link;
    this._templateCard = templateCard;
    this._pic = infoCard;
    this._openImagePopup = openImagePopup
  }

  createCard() {
    this._card = this._templateCard.content.firstElementChild.cloneNode(true);
    this._card.querySelector('.element__pic').src = this._link;
    this._card.querySelector('.element__title-text').textContent = this._name;
    this._card.querySelector('.element__pic').alt = this._name;
    this._addListeners();
    return this._card;
  }

  //Добавление слушателей к карточке
  _addListeners() {
    this._card.querySelector('.element__title-like').addEventListener('click', this.handlerLike);
    this._card.querySelector('.element__bin').addEventListener('click', () => this.handlerCardRemove());
    this._card.querySelector('.element__pic').addEventListener('click', () => {
      this._openImagePopup(this._pic) //Слушатель события Открыть картинку побольше
    })
  }

  handlerLike(event) {
    event.target.classList.toggle('element__title-like_active');
  }

  handlerCardRemove(event) {
    this._card.remove();
    this._card = null;
  }

}

export { Card };
