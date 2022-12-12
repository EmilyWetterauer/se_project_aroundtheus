import Popup from "./Popup.js"; 

class PopupWithSubmitButton extends Popup {
    constructor(popupSelector, popupWithFormSubmit) {
        super(popupSelector);
        this.popupWithFormSubmit = popupWithFormSubmit.bind(this);
      }

      open(card) {
        console.log("card in open()", card);
        this.setEventListeners(card)
        // super.open();
        this.popupElement.classList.add("popup_opened");


      }

    setEventListeners(card) {
      console.log("card in setEventListeners", card);
      this.popupElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.popupWithFormSubmit(card)
      })
      super.setEventListeners();
    
    }
}

export default PopupWithSubmitButton;