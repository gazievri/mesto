import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__img');
    this._caption = this._popup.querySelector('.popup__img-title');

  }
  //Наследует метод от родителя и добавляет подстановку ссылки картинки и имя картинки
  open(cardPic) {
    super.open();
    this._caption.textContent = cardPic.name;
    this._image.src = cardPic.link;
    this._image.alt = cardPic.name;
  }
}







