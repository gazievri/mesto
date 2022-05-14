import './pages/index.css';

//Импорт переменных
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { initialCards } from './components/initialCards.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

//Переменные
const formElementProfile = document.querySelector('.popup__form-profile');
const formNewPlace = document.querySelector('.popup__form-place');
const cardTemplate = document.querySelector('#element-template');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__error-text_status_active'
};
// Кнопки
const profileOpenBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
// Поля ввода в форме
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');
//const placeInput = document.querySelector('.popup__input_field_place');
//const linkInput = document.querySelector('.popup__input_field_link');

//Формы из класса FormValidator
const addFromValidationProfile = new FormValidator(settings, formElementProfile);
const addFromValidationNewCard = new FormValidator(settings, formNewPlace);

//*****Popup edit*****
//Объявляю класс для информации о пользователе
const user = new UserInfo ({
  nameSelector: '.profile__title',
  occupationSelector: '.profile__subtitle'
})

//Объявляю класс для попапа редактирования профиля
const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit', {
  callbackSubmitForm: () => {
    const userInfo = popupProfileEdit._getInputValues()
    user.setUserInfo(userInfo);
    popupProfileEdit.close();
  }
});
popupProfileEdit.setEventListeners();

//Popup addNewCard
//Объявляю класс для попапа добавления новой карточки
const popupAddNewCard = new PopupWithForm ('.popup_type_new-card', {
  callbackSubmitForm: () => {
    popupAddNewCard._getInputValues(); //Запустил метод, который собрал данные из всех полей форм
    const card = new Card(popupAddNewCard._data, cardTemplate, handleCardClick ) //создал новый класс с использованием ранее собранных данных из формы
    const cardElement = card.createCard(); // запустил метод класса для создания новой карточки
    initialCardsList.addItem(cardElement); // запустил метод класса для добавления новой карточки в секцию
    popupAddNewCard.close() //запустил метод класса закрывающий
  }
});
popupAddNewCard.setEventListeners();

const imagePreview = new PopupWithImage('.popup_type_view-image');

//Отрисовка и добавление карточек в секцию
const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardClick);
    const cardElement = card.createCard();
    initialCardsList.addItem(cardElement);
  },
}, '.elements'
)

initialCardsList.rendererCards();

export function handleCardClick(cardPic) {
  imagePreview.open(cardPic);
};

//Слушатели со ссылкой на классы
profileOpenBtn.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.occupation;
  popupProfileEdit.open();
});
cardAddBtn.addEventListener('click', popupAddNewCard.open);

addFromValidationProfile.enableValidation();
addFromValidationNewCard.enableValidation();
