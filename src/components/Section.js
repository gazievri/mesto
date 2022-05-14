//отвечает за отрисовку элементов на странице

export default class Section {
  constructor( { items, renderer }, containerSelector  ){
    this._items = items; //это массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы.
  }

  //отвечает за отрисовку всех элементов.
  rendererCards() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //принимает DOM-элемент и добавляет его в контейнер
  addItem(card) {
    this._container.prepend(card);
  }
}

