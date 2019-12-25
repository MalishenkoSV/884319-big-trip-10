import {createTripDayTemplate} from "./day.js";
import {castDateFormat} from "../utils";

const generateDaysMarkup = (days, events) => {
  return Array.from(days).map((day) => {
    const dayEvents = events.filter((event) => castDateFormat(event.dateStart) === day);
    return createTripDayTemplate(day, dayEvents);
  }).join(`\n`);
};

export const createDaysListTemplate = (dayEvents) => {
  dayEvents.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const days = new Set(dayEvents.map((event) => castDateFormat(event.dateStart)));
  const daysMarkup = generateDaysMarkup(days, dayEvents);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};
