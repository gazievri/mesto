const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');  //открываем попап
  nameInput.value = profileTitle.textContent;  //подставляем данные из профиля имя в форму
  jobInput.value = profileSubtitle.textContent;  //подставляем данные из профиля работа в форму
}

function closePopup() {
  popup.classList.remove('popup_opened');  //закрытие попапа через кнопку закрыть
}

function formSubmitHandler (evt) {  //закрытие попапа с сохранением и отправкой данных из формы
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);












