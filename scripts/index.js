
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
  popup.classList.remove('popup_opened');  //закрытие попапа
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


// Добавляем в автозагрузку шесть карточек из массива (карточки по умолчанию)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const elementList = document.querySelector('.elements'); //Объявляю переменную контейнер для новых карточек

function renderInitialCards (item) {
  const elementTemplate = document.querySelector('#element-template').content.firstElementChild.cloneNode(true); //Нахожу макет карточки и клонирую его
  const elementImage = elementTemplate.querySelector('.element__pic');
  elementTemplate.querySelector('.element__title-text').textContent = item.name; //Вставляю в макет название карточки
  elementImage.src = item.link; //Вставляю в элемент картинка ссылку на изображение
  elementImage.alt = item.name; //Вставляю в alt текст из названия карточки

  elementTemplate.querySelector('.element__bin').addEventListener('click', removeCard); //Добавляю вызов функции removeCard по событию нажатия на кнопку корзина

  elementTemplate.querySelector('.element__title-like').addEventListener('click', getLike); //Добавляю вызов функции openImagePopup при нажатие на картинку карточки

  elementTemplate.querySelector('.element__pic').addEventListener('click', openImagePopup);

  elementList.append(elementTemplate); //Вставляю заполненный макет карточки в контейнер для новых карточек

  return elementTemplate;
}

//Создаю функцию удаления карточки
function removeCard(event) {
  const card = event.currentTarget.closest('.element'); //Ищем карточку ближайщую к событию (нажатие на кнопку)
  card.remove(); //Удаление карточки
}

//Создаем функцию поставить лайк
function getLike(event) {
  const like = event.currentTarget.closest('.element__title-like');
  like.classList.toggle('element__title-like_active');
}

//Создаем функцию открытия попапа картинки карточки

function openImagePopup(elementImage) {
  const imagePopup = document.querySelector('.image-popup');
  imagePopup.querySelector('.image-popup__img').src = elementImage.src;

  imagePopup.classList.add('image-popup__opened');
}

//Создаем функцию закрытия попапа картинки карточки
const imagePopup = document.querySelector('.image-popup');

function closeImagePopup(event) {
  const imagePopup = document.querySelector('.image-popup');
  imagePopup.classList.remove('image-popup__opened');

}

imagePopup.querySelector('.image-popup__close').addEventListener('click', closeImagePopup);//Добавляем мониторинг кнопки закрытия попапа картинки карточки


//Открываем и закрываем новый попап для добавления новой карточки
const popupPlace = document.querySelector('.place');
const popupPlaceOpen = document.querySelector('.profile__button');
const popupPlaceClose = popupPlace.querySelector('.popup__close');

function openPopupPlace() {
  popupPlace.classList.add('popup_opened');  //открываем попап
}

function closePopupPlace() {
  popupPlace.classList.remove('popup_opened');  //закрытие попапа
}

popupPlaceOpen.addEventListener('click', openPopupPlace);
popupPlaceClose.addEventListener('click', closePopupPlace);

//Добавляем новую карточку

let formNewPlace = document.querySelector('.popup__form-place');
const placeInput = document.querySelector('.popup__input_field_place');
const linkInput = document.querySelector('.popup__input_field_link');

function addNewCard() {
  const newCard = document.querySelector('#element-template').content.firstElementChild.cloneNode(true); //Нахожу макет карточки и клонирую его
  newCard.querySelector('.element__title-text').textContent = placeInput.value; //Вставляю новое название места
  newCard.querySelector('.element__pic').src = linkInput.value; //Вставляю ссылку на новую картинку
  newCard.querySelector('.element__pic').alt = placeInput.value; //Вставляю новый alt к картинке
  newCard.querySelector('.element__bin').addEventListener('click', removeCard); //Вставляю мониторинг нажатия кнопки удаления и запуск ранее созданной функции удаления
  newCard.querySelector('.element__title-like').addEventListener('click', getLike); //Вставляю мониторинг нажатия кнопки лайк и запуск ранее созданной функции поставить лайк
  newCard.querySelector('.element__pic').addEventListener('click', openImagePopup); //Вставляю мониторинг нажатия на картинку карточки для октрытия попапа картинки
  elementList .prepend(newCard); //Вставляю новую карточку в начало списка карточек
  closePopupPlace();
}

formNewPlace.addEventListener('submit', addNewCard);

initialCards.map(renderInitialCards); //Запускаем функцию renderInitialCards для каждого элемента массива initialCards методом map.
