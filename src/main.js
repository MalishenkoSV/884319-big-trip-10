
// main.js
import {createRouteTemplate} from './components/route.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filter.js';
import {createFormSortTemplate} from './components/form-sort.js';
import {createListEventsTemplate} from './components/list-events.js';
import {createCardTemplate} from './components/card.js';
import {createFormEditTemplate} from './components/form-edit.js';
import {generatePoints} from "./mock/route-point";


const CARD_NUMBER = 3;

let events = generatePoints(CARD_NUMBER);
//  функция вставки
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.page-header`);
const placeRouteTrip = pageHeader.querySelector(`.trip-info`);
render(placeRouteTrip, createRouteTemplate(events), `beforebegin`);

const placeMainControl = pageHeader.querySelector(`.trip-controls`);
render(placeMainControl, createMenuTemplate(), `beforebegin`);

render(placeMainControl, createFiltersTemplate());

const pageMain = document.querySelector(`.page-main`);
const placeEventsTrip = pageMain.querySelector(`.trip-events`);
render(placeEventsTrip, createFormSortTemplate());
render(placeEventsTrip, createFormEditTemplate());
render(placeEventsTrip, createListEventsTemplate(events));

const totalElement = placeRouteTrip.querySelector(`.trip-info__cost-value`);
const totalCost = events.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();

