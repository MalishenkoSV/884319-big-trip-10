import {MONTH_NAMES, Destination} from "../const.js";

export const getCities = (events) => {
  const cities = events.map((event) => event.cityOption.city);
  return new Set(cities);
};

// const getDuration = (events) => {
//   const dateStart = events[0].dateStart;
//   const dateFinish = events[events.length - 1].dateStart;
//   const duration = `${MONTH_NAMES[dateStart.getMonth()]}
//    ${dateStart.getDate()} &mdash;${(dateStart.getMonth() === dateFinish.getMonth()) ? `` : MONTH_NAMES[dateFinish.getMonth()]}
//    ${dateFinish.getDate()}`;
//   return duration;
// };


export const createTripInfoTemplate = (events) => {
  // events.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const cities = Array.from(getCities(events));
  const title = Destination > 3 ? `${cities.shift()} &mdash; ... &mdash; ${cities.pop()}` : cities.join(` &mdash; `);
  const startRouteDate = new Date(events[0].dateStart);
  const endRouteDate = new Date(events[events.length - 1].dateStart);

  return (
    `<div class="trip-info__main">
         <h1 class="trip-info__title">${title}</h1>
         <p class="trip-info__dates">${startRouteDate.getDate()}&nbsp;${MONTH_NAMES[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;${endRouteDate.getDate()}&nbsp;${MONTH_NAMES[endRouteDate.getMonth()]}</p>
     </div>`
  );
};
