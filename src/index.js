import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import PopupWithSubmit from './components/PopupWithSubmit.js';
import { formElementProfile, formNewPlace, formAvatarEdit, cardTemplate, settings, myToken, profileOpenBtn, cardAddBtn, avatarEditBtn, nameInput, jobInput} from './utils/constants.js';

const hidePreloader = () => {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader_status_hiding');
  setTimeout(function() {
    preloader.classList.add('preloader_status_hidden');
    preloader.classList.remove('preloader_status_hiding');
  }, 500);
}

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
  api.getCards(),
])
.then(value => {
  const userInfo = value[0];
  user.setUserAvatar(userInfo);
  const cards = value[1];
  ownerId = userInfo._id;
  cards.forEach(card => {
    card.ownerId = userInfo._id;
  });
  initialCardsList.rendererCards(cards);
  //user.setUserAvatar(userInfo);
  user.setUserInfo(userInfo);
  hidePreloader();
})
.catch(err => console.log(err))

const sendArgToClassCard = (...arg) => new Card(...arg);

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
  .catch(err => console.log(err))
  .finally(() => popupAvatarEdit.loadingDone('Сохранить'))
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
  .finally(()=> popupProfileEdit.loadingDone('Сохранить'))
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
  .finally(()=> popupAddNewCard.loadingDone('Сохранить'))
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
    .finally(()=> submitPopup.loadingDone('Да'))
  });
  submitPopup.enableSubmitBtn();
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
  //popupProfileEdit.loadingDone('Сохранить');
});

avatarEditBtn.addEventListener('click', () => {
  popupAvatarEdit.open();
  popupAvatarEdit.loadingDone('Сохранить');
  formValidationAvatar.resetTextError();
})

cardAddBtn.addEventListener('click', () => {
  popupAddNewCard.open();
  formValidationNewCard.resetTextError();
  //popupAddNewCard.loadingDone('Сохранить');
});

formValidationProfile.enableValidation();
formValidationNewCard.enableValidation();
formValidationAvatar.enableValidation();

//функция создания новой карточки
function createNewCardJust (item) {
  const card = sendArgToClassCard(
    item,
    cardTemplate,
    handleCardClick,
    deleteCardApi)

  card.sendLikeApi(() => {
    api.sendLike(item)
    .then(res => {
      card.handlerLike(res);
    })
    .catch(err => console.log(err))
  }),
  card.deleteLikeApi(() => {
    api.deleteLike(item)
    .then(res => {
      card.handlerLike(res);
    })
    .catch(err => console.log(err))
  });

  return card.createCard();
}



