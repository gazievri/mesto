import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__save-button');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  close(){
    super.close();
    this._submit.removeEventListener('click', this._handleSubmitCallback);
  }

  submit() {
    this._submit.addEventListener('click', this._handleSubmitCallback);
  }

  loadingInProcess() {
    this._submit.textContent = 'Удаление...'
  }

  loadingDone() {
    this._submit.textContent = 'Да';
  }

  disableSubmitBtn() {
    this._submit.disabled = true;
  }

  enableSubmitBtn() {
    this._submit.disabled = false;
  }
}




