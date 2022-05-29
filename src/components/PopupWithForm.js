import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor( popupSelector, apiCallBack) {
    super(popupSelector);
    this._inputsList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._apiCallBack = apiCallBack;
    this._submitBtn = this._popup.querySelector('.popup__save-button')
  }

  //метод который собирает данные всех полей формы
  _getInputValues() {
    this._data = {}
    this._inputsList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  //Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this.submitHandler);
  }

  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }

  //Метод, который отправляет собранные данные на сервер
  submitHandler = () => {
    const info = this._getInputValues(); //берем собранные данные и сохраняем в переменную
    this._apiCallBack(info); //Вызываю метод apiCallBack
  }

  loadingInProcess() {
    this._submitBtn.textContent = 'Сохранение...';
  }

  loadingDone(text) {
    this._submitBtn.textContent = text;
  }

}



