import {MONTH_NAMES} from "../const.js";
import {createFormEditTemplate} from "./form-edit.js";
import {createTripEventTemplate} from "./trip-event.js";
let isEdit = true;

export const createTripDayTemplate = (date, events) => {
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
