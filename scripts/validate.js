const popupForm = document.querySelector('.popup__form');
const formInput = popupForm.querySelector('.popup__input');
//const formError = popupForm.querySelector(`.${formInput.id}-error`);

//Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, formInput, errorMessage) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__form_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error-text_status_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__form_type_error');
  formError.classList.remove('popup__error-text_status_active');
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, formInput);
  };
};




// Функция добавляет слушателя обработчик события для каждого поля ввода

const setEventListeners = (popupForm) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = popupForm.querySelector('.popup__save-button');

  // Делаем кнопку Сохранить неактивной при октрытии формы
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(popupForm, formInput);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция находит и перебирает все формы на странице, отменяет стандартное поведение и
//устанавливает слушателя для каждого элемента формы
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(popupForm);
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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_inactive');
  }
};

// Вызовем функцию
enableValidation();
