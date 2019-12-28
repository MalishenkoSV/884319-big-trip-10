
// main.js
import Menu from './components/menu.js';
import Filters from './components/filter.js';
import TripInfo from './components/trip-info.js';
import FormSort from './components/form-sort.js';
import TripDays from './components/days-list.js';
import TripDay from './components/day.js';
import Event from './components/trip-event.js';
import FormEdit from './components/form-edit.js';
import AddEvent from './components/add-event.js';
import {generatePoints} from "./mock/data-event.js";
import {render, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const dayEvents = generatePoints(EVENT_COUNT);
dayEvents.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

//  функция вставки
// const dayEvents = eventsData.filter((eventData, day) => castDateFormat(eventData.dateStart) === day);
const menuElement = new Menu();
const filtersElement = new Filters();
const formSortElement = new FormSort();
const addEventElement = new AddEvent();
const tripInfoElement = new TripInfo(dayEvents);
const tripDayElement = new TripDay();
const tripDaysElement = new TripDays();

const renderEventItem = () => {
  dayEvents.forEach((dayEvent) => {
    const formEditElement = new FormEdit(dayEvent);
    const eventItem = new Event(dayEvent);
    const eventsList = document.querySelector(`.trip-events__list`);

    const editButton = eventItem.getElement().querySelector(`.event__rollup-btn`);
    editButton.addEventListener(`click`, function () {
      eventsList.replaceChild(formEditElement.getElement(), eventItem.getElement());
    });
    const formEditButton = formEditElement.getElement().querySelector(`.event__rollup-btn`);
    formEditButton.addEventListener(`submit`, function (evt) {
      evt.preventDefault();
      eventsList.replaceChild(eventItem, formEditElement.getElement());
    });

    render(eventsList, eventItem, RenderPosition.BEFORE_BEGIN);
  });
};
const tripDaysList = placeEventsTrip.querySelector(`.trip-days`);
render(tripInfo, tripInfoElement, RenderPosition.AFTER_BEGIN);
render(placeMainControl, menuElement);
render(placeMainControl, filtersElement);
render(placeEventsTrip, formSortElement);
render(placeEventsTrip, addEventElement);
render(placeEventsTrip, tripDaysElement);

const uniqueDates = new Set(dayEvents.map((event) => new Date(event.dateStart).toDateString()));
[...uniqueDates].forEach((date, i) => {
  const day = new TripDay(date, i);

  dayEvents.filter(({dateStart}) => new Date(dateStart).toDateString() === date)
    .forEach((it) => {
      renderEventItem(it, day);
    });
  render(tripDaysList, tripDayElement, RenderPosition.BEFOREBEGIN);
});


const totalElement = tripInfo.querySelector(`.trip-info__cost-value`);
const totalCost = dayEvents.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();
