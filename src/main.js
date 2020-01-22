
// main.js
import Menu from './components/menu.js';
import Filters from './components/filter.js';
import TripInfo from './components/trip-info.js';
import FormSort from './components/form-sort.js';
import Event from './components/event.js';
import Day from './components/day.js';
import DaysList from './components/days-list.js';
import FormEdit from './components/form-edit.js';
// import AddEvent from './components/add-event.js';
import {generatePoints} from './mock/data-event.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 16;
const ESC_KEYCODE = 27;
const pageHeader = document.querySelector(`.page-header`);
const tripInfoPlace = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const eventsData = generatePoints(TASK_COUNT);


const tripInfo = new TripInfo(eventsData);
const menu = new Menu();
const filters = new Filters();
const formSort = new FormSort();
const daysList = new DaysList();
// const addEvent = new AddEvent();

const renderTripDay = (day, dayIndex) => {
  const dayItem = new Day(day, dayIndex);
  const dataEvents = eventsData.filter((eventData) => new Date(eventData.dateStart).toDateString() === day);

  dataEvents.forEach((dataEvent) => {
    const eventItem = new Event(dataEvent);
    const formEdit = new FormEdit(dataEvent);
    const eventListElement = dayItem.getElement().querySelector(`.trip-events__list`);
    const editButton = eventItem.getElement().querySelector(`.event__rollup-btn`);
    const formEditSubmit = formEdit.getElement().querySelector(`.event__rollup-btn`);
    const replaceEventToEdit = () => {
      eventListElement.replaceChild(formEdit.getElement(), eventItem.getElement());
    };

    const replaceEditToEvent = () => {
      eventListElement.replaceChild(eventItem.getElement(), formEdit.getElement());
    };

    const onEscPressDown = (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscPressDown);
      }
    };
    editButton.addEventListener(`click`, () => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscPressDown);
    });
    formEditSubmit.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
    });

    render(eventListElement, eventItem.getElement());
  });
  return dayItem;
};


render(tripInfoPlace, tripInfo.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, menu.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, filters.getElement());
render(placeEventsTrip, formSort.getElement());
// render(placeEventsTrip, addEvent.getElement());

render(placeEventsTrip, daysList.getElement());
const daysListElement = placeEventsTrip.querySelector(`.trip-days`);

const days = Array.from(new Set(eventsData.map((eventData) => new Date(eventData.dateStart).toDateString())));
days.forEach((day, dayIndex) => {
  const tripDay = renderTripDay(day, dayIndex);
  render(daysListElement, tripDay.getElement());
});

const totalElement = tripInfoPlace.querySelector(`.trip-info__cost-value`);
const totalCost = eventsData.reduce((reducer, eventData) => reducer + eventData.price, 0);
totalElement.textContent = totalCost.toString();
