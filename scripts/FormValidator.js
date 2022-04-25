export class FormValidator{
  constructor(settings, form) {
    this._formSelector = settings.formSelector; //Сама форма
    this._inputSelector = settings.inputSelector; //Поле ввода данных
    this._submitButtonSelector = settings.submitButtonSelector; //Кнопка сохранения формы
    this._inactiveButtonClass = settings.inactiveButtonClass; //Класс неактивной кнопки
    this._inputErrorClass = settings.inputErrorClass; //Класс делает подчеркивание красным ошибки в поел ввода
    this._errorClass = settings.errorClass; //Класс делает текст ошибки видимым
    this._popupForm = form; //Форма, откуда я могу взять все элементы формы
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector)); // Список всех полей ввода данных
    this._saveBtn = this._popupForm.querySelector(this._submitButtonSelector); //Кнопка сохранить
  }
  //Проверка валидности инпута
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }
  //Показать ошибку инпута
  _showInputError(input) {
    const formError = this._popupForm.querySelector(`.${input.id}-error`); //Нашли блок ошибки span
    formError.textContent = input.validationMessage; //Вставили текст ошибки в блок ошибки span
    formError.classList.add(this._errorClass); //Добавили класс видимости блоку ошибки span
    input.classList.add(this._inputErrorClass); //Подчеркнули красным поле инпута
  };
  //Скрыть ошибку инпута
  _hideInputError(input) {
    const formError = this._popupForm.querySelector(`.${input.id}-error`); //Нашли блок ошибки span
    formError.classList.remove(this._errorClass); //Удалили класс видимости блока ошибки span
    formError.textContent = ''; //Очистили содержимое блока ошибки span
    input.classList.remove(this._inputErrorClass); //Убрали подчеркивание красным поле инпута
  };
  // Функция добавляет слушателя обработчик события для каждого поля ввода
  _setEventListeners() {
    // Делаем кнопку Сохранить неактивной при октрытии формы
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((input) => {
      // каждому полю добавим обработчик события input
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  };
  enableValidation() {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    // Переберём полученную коллекцию
    formList.forEach((input) => {
      input.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      this._setEventListeners(input);
    });
  }
  //Деактивация кнопки Сохранить
  //Сделать кнопку Сохранить неактивной
  _disableButton() {
    this._saveBtn.classList.add(this._inactiveButtonClass); // Добавляет неактивный класс
    this._saveBtn.disabled = true; //Отключает кнопку
  }
  //Сделать кнопку Сохранить активной
  _enableButton() {
    this._saveBtn.classList.remove(this._inactiveButtonClass);// Удаляет неактивный класс
    this._saveBtn.disabled = false; //Включает кнопку
  }
  //Активация и деактивация кнопки Сохранить исходя из итогов проверки инпутов
  _toggleButtonState() {
    const formValid = this._hasInputsValid()
    if (formValid) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  //Проверяем все инпуты на валидность в форме
  _hasInputsValid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }
}






