
// main.js
import Menu from './components/menu.js';
import Filters from './components/filter.js';
import TripInfo from './components/trip-info.js';
import FormSort from './components/form-sort.js';
import Event from './components/event.js';
import Day from './components/day.js';
import DaysList from './components/days-list.js';
import FormEdit from './components/form-edit.js';
import AddEvent from './components/add-event.js';
import {generatePoints} from './mock/data-event.js';
import {render, RenderPosition} from './utils/render.js';
import {castDateTimeFormat} from './utils.js';

const TASK_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfoPlace = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const eventDatas = generatePoints(TASK_COUNT);


const tripInfo = new TripInfo(eventDatas);
const menu = new Menu();
const filters = new Filters();
const formSort = new FormSort();
const daysList = new DaysList(eventDatas);
const addEvent = new AddEvent();

const renderTripDay = (dayEvent, dayIndex) => {
  const dayItem = new Day(dayEvent, eventDatas, dayIndex);
  const dayEvents = eventDatas.filter((eventData) => castDateTimeFormat(eventData.dateStart) === dayEvent);
  dayEvents.forEach(() => {
    const eventItem = new Event(dayEvent);
    const formEdit = new FormEdit(dayEvent);
    const editButton = eventItem.getElement().querySelector(`.event__rollup-btn`);
    const formEditSubmit = formEdit.getElement();

    editButton.addEventListener(`click`, () => {
      dayItem.replaceChild(formEdit.getElement(), eventItem.getElement());
    });
    formEditSubmit.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      dayItem.replaceChild(dayItem.getElement(), formEdit.getElement());
    });

    render(dayItem, eventItem.getElement(), RenderPosition.BEFORE_BEGIN);
  });
  return dayItem;
};


render(tripInfoPlace, tripInfo.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, menu.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, filters.getElement());
render(placeEventsTrip, formSort.getElement());
render(placeEventsTrip, addEvent.getElement());
const daysListElement = daysList.getElement().querySelector(`.trip-events__list`);

const days = Array.from(new Set(eventDatas.map((eventData) => castDateTimeFormat(eventData.dateStart))));
days.forEach((day) => {
  const tripDay = renderTripDay(day);
  render(daysListElement, tripDay.getElement(), RenderPosition.BEFORE_BEGIN);
});

const totalElement = tripInfoPlace.querySelector(`.trip-info__cost-value`);
const totalCost = eventDatas.reduce((reducer, eventData) => reducer + eventData.price, 0);
totalElement.textContent = totalCost.toString();
