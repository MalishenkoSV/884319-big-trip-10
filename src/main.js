
// main.js
import Menu from './components/menu.js';
import Filters from './components/filter.js';
import TripInfo from './components/trip-info.js';
import FormSort from './components/form-sort.js';
import DaysList from './components/days-list.js';
import TripDayItem from './components/day.js';
import Event from './components/trip-event.js';
import EventsList from './components/events-list.js';
import FormEdit from './components/form-edit.js';
import {getCities} from './components/trip-info.js';
import AddEvent from './components/add-event.js';
import {generatePoints, getUniqDates} from './mock/data-event.js';
import {render, RenderPosition} from './utils/render.js';
import {TYPES_OF_TRANSFERS, TYPES_OF_ACTIVITY, CITIES, OFFER_OPTIONS} from './const.js';

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);

const eventsData = generatePoints(EVENT_COUNT);
const uniqDates = getUniqDates(eventsData);
const tripCities = getCities(eventsData);

//  функция вставки
const menuElement = new Menu().getElement();
const filtersElement = new Filters().getElement();
const formSortElement = new FormSort().getElement();
const addEventElement = new AddEvent(TYPES_OF_TRANSFERS, TYPES_OF_ACTIVITY, CITIES).getElement();
const tripInfoElement = new TripInfo(tripCities, eventsData).getElement();

render(placeMainControl, menuElement);
render(placeMainControl, filtersElement);
render(placeEventsTrip, formSortElement);


// отрисовка списка для дней со днями
const renderDaysList = () => {
  const daysList = new DaysList();
  render(placeEventsTrip, daysList);

  uniqDates.map((date, index) => {
    return renderDay(date, index, daysList.getElement());
  });
};

// отрисовка списка для эвентов
const renderEventsList = (container) => {
  const eventsList = new EventsList();
  container.append(eventsList.getElement());
  return eventsList;
};
// отрисовка дня со списком для эвентов и эвентами в нем
const renderDay = (date, index, container) => {
  const eventsInDayData = getDayEvents(date); // список эвентов в данную дату

  const day = new TripDayItem(eventsInDayData[0].start, index);
  container.append(day.getElement());

  const eventsList = renderEventsList(day.getElement()); // отрисовка списка для эвентов в день
  eventsInDayData.map((eventData) => {
    renderEvent(eventData, eventsList.getElement());
  });
};

// фильтрация эвентов по дням
const getDayEvents = (date) => {
  const dayEvents = eventsData.filter((event) => {
    return event.date === date;
  });
  return dayEvents;
};
// отрисовка эвента
const renderEvent = (eventData, container) => {
  const event = new Event(eventData);
  const eventEdit = new FormEdit(eventData, TYPES_OF_TRANSFERS, TYPES_OF_ACTIVITY, CITIES, OFFER_OPTIONS);
  container.append(event.getElement());

  // открытие и закрытие формы редактирования
  const onEscKeydown = (evt) => {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      container.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeydown);
    }
  };
  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(eventEdit.getElement(), event.getElement());
    document.addEventListener(`keydown`, onEscKeydown);
  });
  eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeydown);
  });

  eventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeydown);
  });
};

const renderEventAdd = () => {
  render(placeEventsTrip, addEventElement);
  addButton.disabled = true;
};
if (eventsData.length > 0) {
  render(tripInfo, tripInfoElement, RenderPosition.AFTER_BEGIN);
  renderDaysList();
} else {
  renderEventAdd();
}
const totalElement = tripInfo.querySelector(`.trip-info__cost-value`);
const totalCost = eventsData.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();
