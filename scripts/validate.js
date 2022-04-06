//const popupForm = document.querySelector('.popup__form');
//const formInput = popupForm.querySelector('.popup__input');
//const formError = popupForm.querySelector(`.${formInput.id}-error`);

//Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, formInput, errorMessage, settings) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, formInput, settings) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, formInput, settings) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, formInput, formInput.validationMessage, settings);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, formInput,settings);
  };
};




// Функция добавляет слушателя обработчик события для каждого поля ввода

const setEventListeners = (popupForm, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(popupForm.querySelectorAll(settings.inputSelector));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = popupForm.querySelector(settings.submitButtonSelector);

  // Делаем кнопку Сохранить неактивной при октрытии формы
  toggleButtonState(inputList, buttonElement, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(popupForm, formInput, settings);

      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//Функция находит и перебирает все формы на странице, отменяет стандартное поведение и
//устанавливает слушателя для каждого элемента формы
const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(popupForm, settings);
  });
};


// Делаем кнопку Сохранить не активной

// Функция принимает массив полей и проверяет валидность каждого поля
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((formInput) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !formInput.validity.valid;
  })
};

// Функция переключает кнопку Сохранить в неактивное/активное состояние
// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true; // Отключает кнопку
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false; // Не отключает кнопку
  }
};

// Вызовем функцию
//enableValidation();


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'poup__form_type_error',
  errorClass: 'popup__error-text_status_active'
});
