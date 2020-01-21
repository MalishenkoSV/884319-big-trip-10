
import {MONTH_NAMES} from "../const";
import {createElement} from "../utils/render.js";
import {castDateFormat} from "../utils";

export const createTripDayTemplate = (day, dayIndex) => {

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayIndex + 1}</span>
        <time class="day__date" datetime="${castDateFormat(day)}">${MONTH_NAMES[new Date(day).getMonth()]}&nbsp;${new Date(day).getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
     </li>`
  );
};
export default class Day {
  constructor(day, dayIndex) {
    this._element = null;
    this._day = day;
    this._dayIndex = dayIndex;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._dayIndex);
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
