import {formatTime, getDuration} from "../utils.js";

const createEventOfferMarkup = (offers) => {
  return offers.slice(0, 3)
    .map((offer) => {
      return (
        `<span class="event__offer-title">
          ${offer.name}
        </span>
        <span class="event__offer-price">
          &plus;&nbsp;${offer.price}&nbsp;&euro;
        </span>
        <br>`
      );
    })
    .join(`\n`);
};

export const createEventTemplate = (event) => {
  const {type, dateStart, dateEnd, price, offers} = event;
  const offersList = createEventOfferMarkup(Array.from(offers));
  const durationInMinutes = (dateEnd.getTime() - dateStart.getTime()) / 1000 / 60;
  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type}</h3>
      <div class="event__schedule">
        <p class="event__time">
        <time class="event__start-time" datetime="${dateStart.toISOString()}">${formatTime(dateStart)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateEnd.toISOString()}">${formatTime(dateEnd)}</time>
        </p>
        <p class="event__duration">${getDuration(durationInMinutes)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offersList}
      </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
