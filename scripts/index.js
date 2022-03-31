
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements');


//Универсальная функция открытия
function openPopup() {
  popup.classList.add('popup_opened');
}

//Универсальная функция закрытия
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Открытие попапа профайла (имя и работа)
function openProfile() {
  openPopup();
  nameInput.value = profileTitle.textContent;  //подставляем данные из профиля имя в форму
  jobInput.value = profileSubtitle.textContent;  //подставляем данные из профиля работа в форму
}

//Закрытие попапа профайл с отправкой данных из формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}


//Открываем и закрываем новый попап для добавления новой карточки
const popupPlace = document.querySelector('.popup_type_new-card');
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

popupOpen.addEventListener('click', openProfile);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


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


//Добавляем начальные карточки
function createCard(item) {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  const cardElement = document.querySelector('#element-template').content.firstElementChild.cloneNode(true);
  const cardPic = cardElement.querySelector('.element__pic')
  cardElement.querySelector('.element__title-text').textContent = item.name;
  cardPic.src = item.link;
  cardPic.alt = item.name;

  //Слушаем нажатие на кнопку лайк
  cardElement.querySelector('.element__title-like').addEventListener('click', getLike);

  //Слушаем нажатие на кнопку "корзина"
  cardElement.querySelector('.element__bin').addEventListener('click', removeCard);

  //Слушаем нажатие на картинку в карточке
  cardPic.addEventListener('click', () => openImagePopup(cardPic));



  // Возвращаем получившуюся карточку
  return cardElement;
};

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

const popupImage = document.querySelector('.popup_type_view-image');
const popupImagePic = document.querySelector('.image-popup__img');
const popupImageTitle = document.querySelector('.image-popup__title');
const closeBatton = document.querySelector('popup__close');

function openImagePopup(cardPic) {
  popupImagePic.src = cardPic.src;
  popupImagePic.alt = cardPic.alt;
  popupImageTitle.textContent = cardPic.alt;
  popupImage.classList.add('popup_opened');
};

//Создаем функцию закрытия попапа картинки карточки
const imagePopup = document.querySelector('.popup_type_view-image');

function closeImagePopup(event) {
  const imagePopup = document.querySelector('.popup_type_view-image');
  imagePopup.classList.remove('popup_opened');

}



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
  cardsContainer.prepend(newCard); //Вставляю новую карточку в начало списка карточек


  popupImageTitle.textContent = placeInput.value;

  closePopupPlace();
}

formNewPlace.addEventListener('submit', addNewCard);

imagePopup.querySelector('.popup__close').addEventListener('click', closeImagePopup);//Добавляем мониторинг кнопки закрытия попапа картинки карточки




function renderCard(item) {
  // Создаем карточку на основе данных
  const cardElement = createCard(item);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
}

function renderInitialCards() {
  initialCards.forEach(renderCard);
}

renderInitialCards();

