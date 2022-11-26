class Section {
  constructor({ items, renderer }, cssSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cssSelector = document.querySelector(cssSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);

      this.addItem(cardElement);
    });
  }

  addItem(cardElement) {
    this._cssSelector.append(cardElement);
  }
}

export default Section;
