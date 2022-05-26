import './pages/index.css';

//Импорт переменных
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import PopupWithSubmit from './components/PopupWithSubmit.js';

//Переменные
const formElementProfile = document.querySelector('.popup__form-profile');
const formNewPlace = document.querySelector('.popup__form-place');
const formAvatarEdit = document.querySelector('.popup__form-avatar');

const cardTemplate = document.querySelector('#element-template');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__error-text_status_active'
};
const myToken = '6f7d4ee2-1133-493f-8dc5-cde7a586dd12';
// Кнопки
const profileOpenBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const avatarEditBtn = document.querySelector('.profile__avatar-edit');
// Поля ввода в форме
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');

//Формы из класса FormValidator
const formValidationProfile = new FormValidator(settings, formElementProfile);
const formValidationNewCard = new FormValidator(settings, formNewPlace);
const formValidationAvatar = new FormValidator(settings, formAvatarEdit);

//Создаю новый класс для использования api
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

const card = (...arg) => new Card(...arg);

//Popup delete confirmation
const submitPopup = new PopupWithSubmit('.popup_type_delete-confirm');
submitPopup.setEventListeners();

//Popup avatar edit
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', sendNewAvatarApi)
popupAvatarEdit.setEventListeners()

function sendNewAvatarApi(item) {
  api.changeAvatar(item)
  .then(res => {
    user.setUserAvatar(res);
    popupAvatarEdit.close();
  })
  .catch(err => console.log(err));
}

//*****Popup edit*****
//Объявляю класс для информации о пользователе
const user = new UserInfo ({
  nameSelector: '.profile__title',
  occupationSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
})

//Popup profile edit
const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit', newProfileDataApi);
popupProfileEdit.setEventListeners();

function newProfileDataApi(item) {
  api.sendNewProfileData(item)
  .then(res => {
    user.setUserInfo(res);
    popupProfileEdit.close();
  })
  .catch(err => console.log(err))
}

//Popup new card add
const popupAddNewCard = new PopupWithForm ('.popup_type_new-card', addNewCardApi);
popupAddNewCard.setEventListeners();

function deleteCardApi(item, card) {
  submitPopup.setSubmitAction(submitAction(item, card));
  submitPopup.open();
  submitPopup.submit();
}

function submitAction(item, card) {
  api.deleteCard(item, card)
    .then(() => {
      card.remove();
      card = null;
      submitPopup.close();
    })
    .catch(err => console.log(err))
}

function addNewCardApi(item) {
  api.sendNewCardData(item)
  .then(value => {
    const card = new Card(value, cardTemplate, handleCardClick, deleteCardApi, ownerId)
    const cardElement = card.createCard();
    initialCardsList.addItem(cardElement);
    popupAddNewCard.close()
  })
  .catch(err => console.log(err))
}

const imagePreview = new PopupWithImage('.popup_type_view-image');

//Отрисовка и добавление карточек в секцию
const initialCardsList = new Section({
  renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardClick, deleteCardApi, ownerId);
    const cardElement = card.createCard();
    initialCardsList.addItem(cardElement);
  },
}, '.elements', api
)

initialCardsList.rendererCards();

function handleCardClick(cardPic) {
  imagePreview.open(cardPic);
};

//Слушатели со ссылкой на классы
profileOpenBtn.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  popupProfileEdit.open();
  formValidationProfile.resetTextError();
});

avatarEditBtn.addEventListener('click', () => {
  popupAvatarEdit.open();

})

cardAddBtn.addEventListener('click', () => {
  popupAddNewCard.open();
  formValidationNewCard.resetTextError();
});

formValidationProfile.enableValidation();
formValidationNewCard.enableValidation();
formValidationAvatar.enableValidation();

let ownerId

//Подставляю данные пользователя с сервера на страницу в профиль пользователя
const items = api.getInfo();
items.then((data) => {
    const userInfo = {
      name: data.name,
      about: data.about,
      avatar: data.avatar
    }
    ownerId = data._id;
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo);
  })
.catch((err) => console.log(err));





