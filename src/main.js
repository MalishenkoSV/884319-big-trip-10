
// main.js
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filter.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createFormSortTemplate} from './components/form-sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createAddEventTemplate} from './components/add-event.js';
import {generatePoints} from "./mock/event-trip";

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const costTrip = tripInfo.querySelector(`.trip-info__cost`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);
const eventsData = generatePoints(EVENT_COUNT);
//  функция вставки
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
// итоговая стоимость путешествия из стоимости эвентов и доп.опций
const getPrice = () => {
  const tripPrices = eventsData.map((event) => event.price).reduce((a, b) => a + b);
  const offersPrices = eventsData.map((event) => Array.from(event.offers).reduce((a, b) => {
    return a + b.price;
  }, 0)).reduce((a, b) => a + b);
  return tripPrices + offersPrices;
};

render(placeMainControl, createMenuTemplate());
render(tripInfo, createTripInfoTemplate(eventsData), `afterbegin`);
render(placeMainControl, createFiltersTemplate());
render(placeEventsTrip, createFormSortTemplate());
render(placeEventsTrip, createAddEventTemplate(eventsData));
render(placeEventsTrip, createDaysListTemplate());
render(costTrip, getPrice(), `beforeend`);
