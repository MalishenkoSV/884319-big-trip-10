
// main.js
import Menu from './components/menu.js';
import Filters from './components/filter.js';
import TripInfo from './components/trip-info.js';
import FormSort from './components/form-sort.js';
import DaysList from './components/days-list.js';
import TripDay from './components/day.js';
import Event from './components/trip-event.js';
import FormEdit from './components/form-edit.js';
import AddEvent from './components/add-event.js';
import {generatePoints} from "./mock/data-event.js";
import {castDateFormat, render, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 3;
const pageHeader = document.querySelector(`.page-header`);
const tripInfo = pageHeader.querySelector(`.trip-main__trip-info`);
const placeMainControl = pageHeader.querySelector(`.trip-controls`);
const placeEventsTrip = document.querySelector(`.trip-events`);

const eventsData = generatePoints(EVENT_COUNT);
eventsData.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
//  функция вставки
const dayEvents = eventsData.filter((eventData, day) => castDateFormat(eventData.dateStart) === day);
const renderTripDay = (day) => {
  const tripDay = new TripDay(day);
  const eventListElement = tripDay.getElement().querySelector(`.trip-events__list`);

  dayEvents.forEach((dayEvent) => {
    const eventComponent = new Event(dayEvent);
    const formEditComponent = new FormEdit(dayEvent);
    const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
    const submitButton = formEditComponent.getElement().querySelector(`.event__rollup-btn`);
    editButton.addEventListener(`click`, function () {
      eventListElement.replaceChild(formEditComponent.getElement(), eventComponent.getElement());
    });

    submitButton.addEventListener(`click`, function () {
      eventListElement.replaceChild(eventComponent.getElement(), formEditComponent.getElement());
    });
    render(eventListElement, eventComponent.getElement(), RenderPosition.BEFORE_BEGIN);
  });
  return tripDay;
};

const MenuElement = new Menu().getElement();
const FiltersElement = new Filters().getElement();
const FormSortElement = new FormSort().getElement();
const AddEventElement = new AddEvent().getElement();
const days = Array.from(new Set(eventsData.map((eventData) => castDateFormat(eventData.dateStart))));
render(tripInfo, new TripInfo(days).getElement(), RenderPosition.AFTER_BEGIN);
render(placeMainControl, MenuElement, RenderPosition.BEFORE_BEGIN);
render(placeMainControl, FiltersElement, RenderPosition.BEFORE_BEGIN);
render(placeEventsTrip, FormSortElement, RenderPosition.BEFORE_BEGIN);
render(placeEventsTrip, AddEventElement, RenderPosition.BEFORE_BEGIN);
render(placeEventsTrip, new DaysList(eventsData).getElement(), RenderPosition.BEFOREBEGIN);

days.forEach((day) => {
  const tripDay = renderTripDay(day);
  render(new DaysList(eventsData).getElement(), tripDay.getElement(), RenderPosition.BEFOREBEGIN);
});

const totalElement = tripInfo.querySelector(`.trip-info__cost-value`);
const totalCost = eventsData.reduce((reducer, event) => reducer + event.price, 0);
totalElement.textContent = totalCost.toString();
