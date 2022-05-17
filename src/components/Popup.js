//отвечает за открытие и закрытие попапа

export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this.close = this.close.bind(this); // Павел, если не привязывать контекст, то функционал перестает работать
    this.open = this.open.bind(this); // Павел, если не привязывать контекст, то функционал перестает работать
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _closePressOverlay(evt) {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', this.close);
    this._popup.addEventListener('mousedown', (evt)=>{this._closePressOverlay(evt)});
  }

}





