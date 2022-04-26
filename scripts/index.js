//Импорт переменных
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
//Переменные
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_profile-edit');
const formElementProfile = document.querySelector('.popup__form-profile');
const formNewPlace = document.querySelector('.popup__form-place');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const cardTemplate = document.querySelector('#element-template');
const popupImage = document.querySelector('.popup_type_view-image');
const popupImagePic = document.querySelector('.popup__img');
const popupImageTitle = document.querySelector('.popup__img-title');
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
const placeInput = document.querySelector('.popup__input_field_place');
const linkInput = document.querySelector('.popup__input_field_link');
//Формы из класса FormValidator
const addFromValidationProfile = new FormValidator(settings, formElementProfile);
const addFromValidationNewCard = new FormValidator(settings, formNewPlace);

//Функции
//Функция закрытия попапа при нажатии Esc
function closePressEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//Открытие попапа (универсальная функция)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePressEsc);
}

//Закрытие попапа (универсальная функция)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePressEsc);
}

//Открытие попапа "Профайл (имя и работа)"
function openPopupProfile() {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;  //подставляем данные из профиля имя в форму
  jobInput.value = profileSubtitle.textContent;  //подставляем данные из профиля работа в форму
  addFromValidationProfile.resetTextError();
}

//Закрытие попапа "Профайл" с отправкой данных из формы
function saveProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Открытие попапа "Добавление новой карточки"
function openPopupAddNewCard() {
  openPopup(popupAddNewCard);
  placeInput.value = '';  // !!!Для ревьюера: Использую логику, что если карточку начали заполнять, но потом передумали, при очередном добавление карточки поля должны быть пыстыми, так скорее всего пользователь будет добавлять другие параметры
  linkInput.value = '';
  addFromValidationNewCard.resetTextError();
}

//Добавляем начальные карточки

//Создание единичной карточки из класса Card
function createCard(item) {
  const card = new Card(item, cardTemplate, openImagePopup);
  return card.createCard();
}

//Создание и помещение созданной карточки на страницу
function renderCard(item) {
  // Создаем карточку на основе данных
  const card = createCard(item);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(card);
}

// Функция запускает цикл для функции "Создание карточки" для каждого элемента массива
function renderInitialCards() {
  initialCards.forEach(renderCard);
}

//Добавление новой карточки
function addNewCard (evt) {
  evt.preventDefault();
  renderCard({ name: placeInput.value, link: linkInput.value });
  closePopup(popupAddNewCard);
  addFromValidationNewCard.disableButton();
  placeInput.value = '';
  linkInput.value = '';
}

//Подстановка данных для Картинки побольше
export function openImagePopup (cardPic) {
  popupImagePic.src = cardPic.link;
  popupImagePic.alt = cardPic.name;
  popupImageTitle.textContent = cardPic.name;

  openPopup(popupImage);
}

renderInitialCards();

//Слушатели

//Слушатель на кнопку "Открыть профайл"
profileOpenBtn.addEventListener('click', openPopupProfile);
cardAddBtn.addEventListener('click', openPopupAddNewCard);
formElementProfile.addEventListener('submit', saveProfile);

//Функция прикрепляет слушателя с функцией "закрыть" на кнопку закрыть для всех попапов,
//а также закрытие по оверлею
popups.forEach(function (item) {
  item.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup(item);
  });
  item.addEventListener('mousedown', function(evt) {
    if (evt.currentTarget === evt.target) {// Функция закрытия по оверлею
      closePopup(item);
    }
  });
});

//Слушатель на кнопку сохранить формы добавления новой карточки
formNewPlace.addEventListener('submit', addNewCard);

addFromValidationProfile.enableValidation();
addFromValidationNewCard.enableValidation();



