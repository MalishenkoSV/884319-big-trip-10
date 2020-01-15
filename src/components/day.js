
import {MONTH_NAMES} from "../const";
import {createElement} from "../utils/render.js";
// import {createFormEditTemplate} from "./form-edit.js";
import {createEventTemplate} from "./event.js";
import {castDateFormat} from "../utils";

export const createTripDayTemplate = (day, events, dayIndex) => {
  const editMarkup = ``;
  const eventsMarkup = events.map((event) => createEventTemplate(event)).join(`\n`);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayIndex + 1}</span>
        <time class="day__date" datetime="${castDateFormat(day)}">${MONTH_NAMES[new Date(day).getMonth()]}&nbsp;${new Date(day).getDate()}</time>
      </div>
      <ul class="trip-events__list">
        ${editMarkup}
        ${eventsMarkup}
      </ul>
     </li>`
  );
};
export default class Day {
  constructor(day, events, dayIndex) {
    this._day = day;
    this._element = null;
    this._events = events;
    this._dayIndex = dayIndex;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._events, this._dayIndex);
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
