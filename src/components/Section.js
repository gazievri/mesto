//отвечает за отрисовку элементов на странице

export default class Section {
  constructor(renderer, containerSelector){
    this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы.
  }

  //отвечает за отрисовку всех элементов.
  rendererCards(cards) {
    cards.forEach(card => {
      this.addItem(this._renderer(card));
      return card
    })
  }

  //принимает DOM-элемент и добавляет его в контейнер
  addItem(card) {
    this._container.prepend(card);
  }

}

