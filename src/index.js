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

let ownerId;


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


Promise.all([
  api.getInfo(),
  api.getCards()
])
.then(value => {
  const userInfo = value[0];
  const cards = value[1];
  ownerId = userInfo._id;
  cards.forEach(card => {
    card.ownerId = userInfo._id;
  });
  initialCardsList.rendererCards(cards);
  user.setUserInfo(userInfo);
  user.setUserAvatar(userInfo);

})
.catch(err => console.log(err))





const card = (...arg) => new Card(...arg);

//Popup delete confirmation
const submitPopup = new PopupWithSubmit('.popup_type_delete-confirm');
submitPopup.setEventListeners();

//Popup avatar edit
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', sendNewAvatarApi)
popupAvatarEdit.setEventListeners()


function sendNewAvatarApi(item) {
  popupAvatarEdit.loadingInProcess();
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
  popupProfileEdit.loadingInProcess();
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

function addNewCardApi(item) {
  popupAddNewCard.loadingInProcess();
  api.sendNewCardData(item)
  .then(value => {
    value.ownerId = ownerId;
    initialCardsList.addItem(createNewCardJust(value));
    popupAddNewCard.close()
  })
  .catch(err => console.log(err))
}

function deleteCardApi(item, card) {
  submitPopup.setSubmitAction(() => {
    submitPopup.loadingInProcess();
    submitPopup.disableSubmitBtn();
    api.deleteCard(item, card)
    .then(() => {
      card.remove();
      card = null;
      submitPopup.close();
    }).catch((err) => console.log(err))
  });
  submitPopup.enableSubmitBtn();
  submitPopup.loadingDone('Да');
  submitPopup.open();
  submitPopup.submit();
}

const imagePreview = new PopupWithImage('.popup_type_view-image');
imagePreview.setEventListeners();

const initialCardsList = new Section(createNewCardJust, '.elements');

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
  popupProfileEdit.loadingDone('Сохранить');
});

avatarEditBtn.addEventListener('click', () => {
  popupAvatarEdit.open();
  popupAvatarEdit.loadingDone('Сохранить');
  formValidationAvatar.resetTextError();
})

cardAddBtn.addEventListener('click', () => {
  popupAddNewCard.open();
  formValidationNewCard.resetTextError();
  popupAddNewCard.loadingDone('Сохранить');
});

formValidationProfile.enableValidation();
formValidationNewCard.enableValidation();
formValidationAvatar.enableValidation();

//функция создания новой карточки

function createNewCardJust (item) {
  const card2 = card(
    item,
    cardTemplate,
    handleCardClick,
    deleteCardApi)

  card2.sendLikeApi(() => {
    api.sendLike(item)
    .then(res => {
      card2.handlerLike(res);
    })
    .catch(err => console.log(err))
  }),
  card2.deleteLikeApi(() => {
    api.deleteLike(item)
    .then(res => {
      card2.handlerLike(res);
    })
    .catch(err => console.log(err))
  });

  return card2.createCard();
}



