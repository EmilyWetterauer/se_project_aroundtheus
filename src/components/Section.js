class Section {
  constructor({ items, renderer }, cssSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cssSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);

      this.addItem(cardElement);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}

export default Section;
