
import {MONTH_NAMES} from "../const";
import {createElement} from "../utils/render.js";
import {createFormEditTemplate} from "./form-edit.js";
import {createEventTemplate} from "./event.js";
import {castDateFormat} from "../utils";

export const createTripDayTemplate = (day, events, dayIndex) => {
  let editMarkup = ``;
  let eventsMarkup = ``;
  if (dayIndex === 0) {
    editMarkup = createFormEditTemplate(events[0]);
    eventsMarkup = events.slice(1).map((event) => createEventTemplate(event)).join(`\n`);
  } else {
    editMarkup = ``;
    eventsMarkup = events.map((event) => createEventTemplate(event)).join(`\n`);
  }
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
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._day);
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
