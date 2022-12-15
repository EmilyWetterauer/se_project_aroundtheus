class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => {
      const cardElement = this._renderer(item);

      this.addItem(cardElement);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}

export default Section;
