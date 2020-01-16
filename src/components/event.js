import {castDateFormat, calculateTimeInterval, castTimeFormat} from "../utils";
import {suffixForPoint, Offer} from "../const.js";
import {createElement} from "../utils/render.js";

const generateOffersMarkup = (offers) => {
  return offers.map((type) => Offer[type]).map(({title, price: offerPrice}) => {
    return (
      `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
        &plus;
       &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`
    );
  }).join(`\n`);
};
export const createEventTemplate = (event) => {
  const {cityOption, dateStart, dateEnd, price, offers} = event;
  const timeInterval = calculateTimeInterval(dateStart, dateEnd);

  const offersMarkup = generateOffersMarkup(offers);
  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${event.type} ${suffixForPoint[event.type]} ${cityOption.city}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${castDateFormat(dateStart)}T${castTimeFormat(dateStart)}">${castTimeFormat(dateStart)}</time>
              &mdash;
              <time class="event__end-time" datetime="${castDateFormat(dateEnd)}T${castTimeFormat(dateEnd)}">${castTimeFormat(dateEnd)}</time>
            </p>
            <p class="event__duration">${timeInterval}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersMarkup}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};
export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    createEventTemplate(this._event);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
