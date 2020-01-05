import {MONTH_NAMES} from "../const";
import {createElement} from "../utils/render.js";
import {castDateTimeFormat} from "../utils.js";


const createDayItemTemplate = (day, dayCount) => {

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount + 1}</span>
        <time class="day__date" datetime="${castDateTimeFormat(day)}">${MONTH_NAMES[new Date(day).getMonth()]}&nbsp;${new Date(day).getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class TripDayItem {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createDayItemTemplate(this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
