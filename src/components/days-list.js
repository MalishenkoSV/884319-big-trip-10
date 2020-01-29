import {createElement} from "../utils/render.js";


export const createDayslistTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};
export default class DaysList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createDayslistTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}
