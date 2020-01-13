import {createTripDayTemplate} from "./day.js";
import {castDateFormat} from "../utils";


const generateDaysMarkup = (days, events) => {
  return Array.from(days).map((day, dayIndex) => {
    const dayEvents = events.filter((event) => castDateFormat(event.dateStart) === day);
    return createTripDayTemplate(day, dayEvents, dayIndex);
  }).join(`\n`);
};

export const createDayslistTemplate = (events, dayIndex) => {
  events.sort((a, b) => a.dateStart - b.dateStart);
  const days = new Set(events.map((event) => castDateFormat(event.dateStart)));
  const daysMarkup = generateDaysMarkup(days, events, dayIndex);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};
