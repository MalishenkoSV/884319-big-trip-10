import {MONTH_NAMES} from "../const.js";

const getCities = (events) => {
  const cities = events.map((event) => event.cityOption.city);
  return new Set(cities);
};

const getDuration = (events) => {
  const dateStart = events[0].dateStart;
  const dateFinish = events[events.length - 1].dateStart;
  const duration = `${MONTH_NAMES[dateStart.getMonth()]}
   ${dateStart.getDate()} &mdash;${(dateStart.getMonth() === dateFinish.getMonth()) ? `` : MONTH_NAMES[dateFinish.getMonth()]}
   ${dateFinish.getDate()}`;
  return duration;
};


export const createTripInfoTemplate = (events) => {
  events.slice().sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const cities = Array.from(getCities(events));
  const title = cities > 3 ? `${cities.shift()} &mdash; ${cities.pop()}` : cities.join(` &mdash; `);
  const duration = getDuration(events);

  return (
    `<div class="trip-info__main">
         <h1 class="trip-info__title">${title}</h1>
           <p class="trip-info__dates">${duration}</p>
     </div>`
  );
};
