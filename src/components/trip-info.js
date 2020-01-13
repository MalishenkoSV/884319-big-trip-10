import {MONTH_NAMES} from "../const.js";

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
