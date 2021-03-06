import {formatDate} from "../utils.js";
import {TRANSPORT_TYPES, PLACE_TYPES, CITIES, suffixForPoint, offersForEvent, Offer} from "../const.js";
import {createElement} from "../utils/render.js";


export const createFormEditTemplate = (event) => {
  const {dateStart, cityOption, dateEnd, price, offers, type} = event;
  const generateOffersMarkup = () => {
    return offersForEvent[type].map((offerType) => Object.assign({offerType}, Offer[offerType])).map(({offerType, title, price: offerPrice}) => {
      const isChecked = event.offers.includes(offerType);
      return (
        `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}" ${isChecked ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${offerType}-1">
                    <span class="event__offer-title">${title}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
                  </label>
                </div>`

      );
    }).join(`\n`);
  };
  const getCity = () => {
    return `
      <option value="${cityOption.city}"></option>
    `;
  };
  return `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
          ${TRANSPORT_TYPES.map((transferType) => `<div class="event__type-item">
      <input id="event-type-${transferType.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transferType.split(` `)[0].toLowerCase()}">
      <label class="event__type-label  event__type-label--${transferType.split(` `)[0].toLowerCase()}" for="event-type-${transferType.split(` `)[0].toLowerCase()}-1">${transferType.split(` `)[0]}</label>
    </div>`).join(``)}
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      ${PLACE_TYPES.map((activityType) => `<div class="event__type-item">
      <input id="event-type-${activityType.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activityType.split(` `)[0].toLowerCase()}">
      <label class="event__type-label  event__type-label--${activityType.split(` `)[0].toLowerCase()}" for="event-type-${activityType.split(` `)[0].toLowerCase()}-1">${activityType.split(` `)[0]}</label>
    </div>`).join(``)}
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${event.type} ${suffixForPoint[event.type]}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityOption.city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${CITIES.map((item) => getCity(item)).join(``)}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateStart)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateEnd)}">
    </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${price}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
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
          ${generateOffersMarkup(offers)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${cityOption.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${event.cityOption.photos.map((url) => `<img class="event__photo" src=${url} alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>
    </li>`;
};
export default class FormEdit {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createFormEditTemplate(this._event);
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
