
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
const event = new Event();
const formEdit = new FormEdit(event);
const addEvent = new AddEvent();

const renderTripDay = (day, dayIndex) => {
  const dayItem = new Day(day, eventDatas, dayIndex);
  const daysListElement = daysList.getElement().querySelector(`.trip-events__list`);
  const dayEvents = eventDatas.filter((event) => castDateTimeFormat(event.dateStart) === day);
  dayEvents.forEach(() => {
    const editButton = dayItem.getElement().querySelector(`.event__rollup-btn`);
    const formEditSubmit = formEdit.getElement().querySelector(`.event__rollup-btn`);

    editButton.addEventListener(`click`, () => {
      daysList.replaceChild(formEdit.getElement(), dayItem.getElement());
    });
    formEditSubmit.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      daysList.replaceChild(dayItem.getElement(), formEdit.getElement());
    });

    render(daysListElement, dayItem.getElement(), RenderPosition.BEFOREBEGIN);
  });
  return dayItem;
};


render(tripInfoPlace, tripInfo.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, menu.getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, filters.getElement());
render(placeEventsTrip, formSort.getElement());
render(placeEventsTrip, addEvent.getElement());

render(placeEventsTrip, daysList.getElement(), RenderPosition.BEFORE_BEGIN);
const days = Array.from(new Set(eventDatas.map((eventData) => castDateTimeFormat(eventData.dateStart))));
days.forEach((day) => {
  const tripDay = renderTripDay(day);
  render(daysList.getElement(), tripDay.getElement(), RenderPosition.BEFORE_BEGIN);
});

const totalElement = tripInfoPlace.querySelector(`.trip-info__cost-value`);
const totalCost = eventDatas.reduce((reducer, eventData) => reducer + eventData.price, 0);
totalElement.textContent = totalCost.toString();
