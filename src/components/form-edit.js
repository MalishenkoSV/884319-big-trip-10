import {TYPES_OF_TRANSFERS, TYPES_OF_ACTIVITY, OFFER_OPTIONS} from "../const.js";
import {cityOptions} from "../mock/data-event.js";
import {createElement} from "../utils/render.js";
import {formatTime} from "../utils";


export default class FormEdit {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  generateOffersMarkup(offers) {
    return offers.slice(0, 3).map((offer) => {
      const {title, type, price} = offer;
      return (
        `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${offer.checked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  }
  createTypeTemplate(types) {
    return types
      .map((type) => {
        return (
          `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
          </div>`
        );
      })
      .join(`\n`);
  }
  makeTypes(types) {
    return types.map((type) => `<div class="event__type-item">
        <input id="event-type-${type.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.split(` `)[0].toLowerCase()}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type.split(` `)[0].toLowerCase()}-1">${type.split(` `)[0]}</label>
      </div>`).join(``);
  }
  getPhotosMarkup(photos) {
    return photos.map((photo) => {
      return (
        `<img class="event__photo" src="${photo}" alt="Event photo">`
      );
    }).join(`\n`);
  }

  getTemplate() {
    const {type, cityOption} = this._event;
    const city = this._event.cityOption.city;
    const transferType = this.makeTypes(TYPES_OF_TRANSFERS);
    const activityType = this.createTypeTemplate(TYPES_OF_ACTIVITY);
    const offers = this.generateOffersMarkup(OFFER_OPTIONS);
    const startDate = formatTime(this._event.dateStart);
    const endDate = formatTime(this._event.dateEnd);
    const getCities = (events) => {
      return events.map((event) => `<option value="${event.cityOption.city}"></option>`).join(``);
    };
    return (
      `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
        <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transferType}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activityType}
      </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${getCities()}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
    </label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
  </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${offers.price}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${offers.price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : null}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offers}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${cityOption.photos.map((photo) => {
            return (
              `<img class="event__photo" src="${photo}" alt="Event photo">`
            );
          }).join(`\n`)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`);
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
