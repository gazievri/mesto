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

  submit() {
    this._submit.addEventListener('submit', this._handleSubmitCallback);
    console.log(this._handleSubmitCallback)
  }


}




