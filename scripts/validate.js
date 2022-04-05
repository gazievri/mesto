const popupForm = document.querySelector('.popup__form');
const formInput = popupForm.querySelector('.popup__input_field_name');

console.log(formInput.id);

const formError = popupForm.querySelector(`.${formInput.id}-error`);
console.log(formError);

//Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('popup__form_type_error');
  formError.classList.add('popup__error-text_status_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('popup__form_type_error');
  formError.classList.remove('popup__error-text_status_active');
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  };
};

popupForm.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);
