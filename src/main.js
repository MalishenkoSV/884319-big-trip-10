
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
import {castDateTimeFormat} from "./utils.js";

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const dayEvents = generatePoints(EVENT_COUNT);
dayEvents.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

//  функция вставки
const menuElement = new Menu().getElement();
const filtersElement = new Filters().getElement();
const formSortElement = new FormSort().getElement();
const addEventElement = new AddEvent().getElement();
const tripInfoElement = new TripInfo(dayEvents).getElement();
const tripDaysList = new TripDays().getElement();

render(tripInfo, tripInfoElement);
render(placeMainControl, menuElement);
render(placeMainControl, filtersElement);
render(placeEventsTrip, formSortElement);
render(placeEventsTrip, addEventElement);
render(placeEventsTrip, tripDaysList);


const renderEventItem = (dayEvent) => {
  const formEditElement = new FormEdit(dayEvent).getElement();
  const eventItem = new Event(dayEvent).getElement();
  const editButton = eventItem.querySelector(`.event__rollup-btn`);
  dayEvents.forEach(() => {
    editButton.addEventListener(`click`, function () {
      eventsList.replaceChild(formEditElement, eventItem);
    });
    const formEditButton = formEditElement.querySelector(`.event__rollup-btn`);
    formEditButton.addEventListener(`submit`, function (evt) {
      evt.preventDefault();
      eventsList.replaceChild(eventItem, formEditElement);
    });
    render(eventsList, eventItem, RenderPosition.BEFORE_BEGIN);
  });
};


const eventsList = document.querySelector(`.trip-events__list`);

const days = Array.from(new Set(dayEvents.map((event) => castDateTimeFormat(event.dateStart))));
days.forEach((date, i) => {
  const tripDay = new TripDay(date, i).getElement();
  renderEventItem(tripDay);
  render(tripDaysList, tripDay);
});


const totalElement = tripInfo.querySelector(`.trip-info__cost-value`);
const totalCost = dayEvents.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();
