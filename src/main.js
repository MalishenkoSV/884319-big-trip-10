
// main.js
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filter.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createFormSortTemplate} from './components/form-sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createFormEditTemplate} from './components/form-edit.js';
import {generatePoints} from "./mock/event-trip";

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const costTrip = tripInfo.querySelector(`.trip-info__cost-value`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);
const eventsData = generatePoints(EVENT_COUNT);
//  функция вставки
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(tripInfo, createTripInfoTemplate(eventsData), `afterbegin`);
render(placeMainControl, createMenuTemplate());
render(placeMainControl, createFiltersTemplate());

render(placeEventsTrip, createFormSortTemplate());
render(placeEventsTrip, createFormEditTemplate());
render(placeEventsTrip, createDaysListTemplate(eventsData));
const totalCost = eventsData.reduce((reducer, event) => reducer + event.price, 0);
costTrip.textContent = totalCost.toString();
