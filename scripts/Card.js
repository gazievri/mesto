import { openImagePopup } from './index.js';

class Card {

  constructor(infoCard, templateCard) {
    this._name = infoCard.name;
    this._link = infoCard.link;
    this._templateCard = templateCard;
    this._pic = infoCard;
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
    this._card.querySelector('.element__title-like').addEventListener('click', event => {
      event.target.classList.toggle('element__title-like_active'); //Слушатель события Поставить и убрать лайк
    });
    this._card.querySelector('.element__bin').addEventListener('click', () => {
      this._card.remove(); //Слушатель события Удалить карточку
    });
    this._card.querySelector('.element__pic').addEventListener('click', () => {
      openImagePopup(this._pic) //Слушатель события Открыть картинку побольше
    })
  }
}

export { Card };
