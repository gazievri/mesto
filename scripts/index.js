//Переменные

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

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_profile-edit');
const formElement = document.querySelector('.popup__form');
const formNewPlace = document.querySelector('.popup__form-place');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const cardTemplate = document.querySelector('#element-template');
const popupImage = document.querySelector('.popup_type_view-image');
const popupImagePic = document.querySelector('.popup__img');
const popupImageTitle = document.querySelector('.popup__img-title');

// Кнопки
const profileOpenBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const popupCloseBtn = document.querySelector('.popup__close-button');

// Поля ввода в форме
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');
const placeInput = document.querySelector('.popup__input_field_place');
const linkInput = document.querySelector('.popup__input_field_link');


//Функции

//Открытие попапа (универсальная функция)
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Закрытие попапа (унивесальная функция)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Открытие попапа "Профайл (имя и работа)"
function openPopupProfile() {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;  //подставляем данные из профиля имя в форму
  jobInput.value = profileSubtitle.textContent;  //подставляем данные из профиля работа в форму
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
  placeInput.value = null;
  linkInput.value = null;
}

//Добавляем начальные карточки

//Создание единичной карточки из шаблона и наполнение данными
function createCard(item) {
  // Клонируем шаблон, наполняем его информацией из объекта data
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardPic = card.querySelector('.element__pic');
  const cardName = card.querySelector('.element__title-text');
  const cardLikeBtn = card.querySelector('.element__title-like');
  const cardBinBtn = card.querySelector('.element__bin');

  cardName.textContent = item.name;
  cardPic.src = item.link;
  cardPic.alt = item.name;

  //Добавляем обработчик нажатия на кнопку лайк
  cardLikeBtn.addEventListener('click', getLike);

  //Добавляем обаботчик нажатия на кнопку "корзина"
  cardBinBtn.addEventListener('click', removeCard);

  //Добавляем обаботчик нажатия на картинку в карточке
  cardPic.addEventListener('click', () => openImagePopup(cardPic));

  // Возвращаем получившуюся карточку
  return card;
};

// Создание и помещение созданной карточки на страницу
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
}

//Функция поставить или убрать лайк
function getLike(event) {
  const like = event.currentTarget.closest('.element__title-like');
  like.classList.toggle('element__title-like_active');
};

//Функция удаления карточки
function removeCard(event) {
  const card = event.currentTarget.closest('.element'); //Ищем карточку ближайщую к событию (нажатие на кнопку)
  card.remove(); //Удаление карточки
};

//Функция просмотра картинки в карточке
function openImagePopup(cardPic) {
  popupImagePic.src = cardPic.src;
  popupImagePic.alt = cardPic.alt;
  popupImageTitle.textContent = cardPic.alt;
  openPopup(popupImage);
};

renderInitialCards();


//Слушатели

//Слушатель на кнопку "Открыть профайл"
profileOpenBtn.addEventListener('click', openPopupProfile);
cardAddBtn.addEventListener('click', openPopupAddNewCard);
formElement.addEventListener('submit', saveProfile);

//Функция прикрепляет слушателя с функцией "закрыть" на кнопку закрыть для всех попапов
popups.forEach(function (item, id) {
  popupCloseBtns[id].addEventListener('click', function () {
    closePopup(item);
  });
});

//Слушатель на кнопку сохранить формы добавления новой карточки
formNewPlace.addEventListener('submit', addNewCard);
