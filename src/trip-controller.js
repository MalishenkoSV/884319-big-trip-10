import FormEdit from './components/form-edit.js';
import Event from './components/trip-event.js';
import TripDayItem from './components/day.js';

export default class TripController {
  constructor(container, eventsData) {
    this._container = container;
    this._eventsData = eventsData;
    this._datesData = Object.keys(eventsData);
  }
  init() {
    this._datesData.forEach((date, index) => {
      const day = this._renderDay(date, index, this._container);
      const eventsInDayData = this._eventsData[date];
      const eventsList = day.querySelector(`.trip-events__list`);
      this._renderEventsList(eventsInDayData, eventsList);
    });
  }

  _renderDay(date, index, daysListElement) {
    const day = new TripDayItem(date, index);
    const dayElement = day.getElement();
    daysListElement.append(dayElement);
    return dayElement;
  }

  _renderEventsList(eventsInDayData, eventsList) {
    eventsInDayData.map((eventData) => {
      this._renderEvent(eventData, eventsList);
    });
  }

  _renderEvent(eventData, container) {
    const event = new Event(eventData);
    const eventEdit = new FormEdit(eventData);
    container.append(event.getElement());

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
  }
}
