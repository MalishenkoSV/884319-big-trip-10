
// main.js
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filter.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createFormSortTemplate} from './components/form-sort.js';
import {createDayslistTemplate} from './components/days-list.js';
import {generatePoints} from './mock/data-event.js';


const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const eventsData = generatePoints(EVENT_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
render(placeMainControl, createMenuTemplate(), `afterbegin`);
render(tripInfo, createTripInfoTemplate(eventsData), `afterbegin`);
render(placeMainControl, createFiltersTemplate());
render(placeEventsTrip, createFormSortTemplate());
render(placeEventsTrip, createDayslistTemplate(eventsData));

const totalElement = tripInfo.querySelector(`.trip-info__cost-value`);
const totalCost = eventsData.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();
