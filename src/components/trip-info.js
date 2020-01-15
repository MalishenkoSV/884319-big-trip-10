import {MONTH_NAMES} from "../const.js";
import {createElement} from "../utils/render.js";

export const getCities = (events) => {
  const cities = events.map((event) => event.cityOption.city);
  return new Set(cities);
};


export const createTripInfoTemplate = (events) => {
  const cities = Array.from(getCities(events));
  const title = cities.length > 3 ? `${cities.shift()} &mdash; ... &mdash; ${cities.pop()}` : cities.join(` &mdash; `);
  const startRouteDate = new Date(events[0].dateStart);
  const endRouteDate = new Date(events[events.length - 1].dateStart);

  return (
    `<div class="trip-info__main">
         <h1 class="trip-info__title">${title}</h1>
         <p class="trip-info__dates">${startRouteDate.getDate()}&nbsp;${MONTH_NAMES[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;${endRouteDate.getDate()}&nbsp;${MONTH_NAMES[endRouteDate.getMonth()]}</p>
     </div>`
  );
};
export default class TripInfo {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
