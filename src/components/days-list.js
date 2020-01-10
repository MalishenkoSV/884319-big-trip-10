import {createTripDayTemplate} from "./day.js";
import {castDateTimeFormat} from "../utils";


const generateDaysMarkup = (days, events) => {
  return Array.from(days).map((day) => {
    const dayEvents = events.filter((event) => castDateTimeFormat(event.dateStart) === day);
    return createTripDayTemplate(day, dayEvents);
  }).join(`\n`);
};

export const createDayslistTemplate = (events) => {
  events.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const days = new Set(events.map((event) => castDateTimeFormat(event.dateStart)));
  const daysMarkup = generateDaysMarkup(days, events);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};
