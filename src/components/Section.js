//отвечает за отрисовку элементов на странице

export default class Section {
  constructor( { renderer }, containerSelector, api ){
    this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы.
    this._api = api;
  }

  //отвечает за отрисовку всех элементов.
  rendererCards() {
    const data = this._api.getCards();
    data.then((res) => {
      const items = res;
      items.forEach((item) => {
        this._renderer(item);
      })
    })
  }

  //принимает DOM-элемент и добавляет его в контейнер
  addItem(card) {
    this._container.prepend(card);
  }

}

