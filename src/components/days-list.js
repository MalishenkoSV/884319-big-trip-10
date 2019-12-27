import {createFormEditTemplate} from "./form-edit.js";
import {createTripEventTemplate} from "./trip-event.js";
import {createElement} from "../utils/render.js";
import {castDateFormat} from "../utils.js";
import {MONTH_NAMES} from "../const.js";

let isEdit = true;

const createTripDaysTemplate = (date, events) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = MONTH_NAMES[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString().substr(1);
  let editMarkup = ``;
  let eventsMarkup = ``;
  if (isEdit) {
    editMarkup = createFormEditTemplate(events[0]);
    eventsMarkup = events.slice(1).map((event) => createTripEventTemplate(event)).join(`\n`);
    isEdit = false;
  } else {
    editMarkup = ``;
    eventsMarkup = events.map((event) => createTripEventTemplate(event)).join(`\n`);
  }
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${year}</time>
      </div>
      <ul class="trip-events__list">
        ${editMarkup}
        ${eventsMarkup}
      </ul>
     </li>`
  );
};

const generateDaysMarkup = (days, events) => {
  return Array.from(days).map((day) => {
    const dayEvents = events.filter((event) => castDateFormat(event.dateStart) === day);
    return createTripDaysTemplate(day, dayEvents);
  }).join(`\n`);
};

export const createDaysListTemplate = (events) => {
  events.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const days = new Set(events.map((event) => castDateFormat(event.dateStart)));
  const daysMarkup = generateDaysMarkup(days, events);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};
export default class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate();
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
