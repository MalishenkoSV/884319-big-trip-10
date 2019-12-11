import {CITIES, OFFER_OPTIONS, TYPES_OF_TRANSFERS, TYPES_OF_ACTIVITY, DESCRIPTIONS} from '../const.js';

const makeTypeTransfer = () => {
  TYPES_OF_TRANSFERS.map((transferType) => `<div class="event__type-item">
      <input id="event-type-${transferType.split(``)[0].toLowerCase()}-1"
         class="event__type-input  visually-hidden" type="radio" name="event-type"
         value="${transferType.split(``)[0].toLowerCase()}">
      <label class="event__type-label
        event__type-label--${transferType.split(``)[0].toLowerCase()}"
        for="event-type-${transferType.split(``)[0].toLowerCase()}-1">${transferType.split(``)[0]}</label>
    </div>`).join(``);
};
const makeTypeActivity = () => {
  TYPES_OF_ACTIVITY.map((activityType) => `<div class="event__type-item">
      <input id="event-type-${activityType.split(``)[0].toLowerCase()}-1"
       class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${activityType.split(` `)[0].toLowerCase()}">
      <label class="event__type-label
         event__type-label--${activityType.split(``)[0].toLowerCase()}"
         for="event-type-${activityType.split(``)[0].toLowerCase()}-1">${activityType.split(``)[0]}</label>
    </div>`).join(``);
};
const makeCity = () => {
  CITIES.map((cityTown) => `<option value="${cityTown}"></option>`).join(``);
};

const makeOption = () => {
  OFFER_OPTIONS.map((option) =>`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.id}-1"
            type="checkbox" name="event-offer-${option.id}"
            ${(Array.from(OFFER_OPTIONS).filter((offerOption) => offerOption.option === option.option)).length > 0 ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${option.id}-1">
            <span class="event__offer-title">${option.option}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
          </label>
        </div>`).join(``);
};
export const createFormEditTemplate = (typesOfTransfer) => {
  const {price, start, end, urls} = typesOfTransfer;
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
            <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17"
                     src="img/icons/${typesOfTransfer.split(``)[0].toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${makeTypeTransfer};
                  </fieldset>

                  <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>
                      ${makeTypeActivity}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Sightseeing at
                </label>
                <input class="event__input  event__input--destination"
                  id="event-destination-1" type="text" name="event-destination"
                   value="Geneva" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${makeCity}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1"
                   type="text" name="event-start-time" value="${start.toString().slice(4, 21)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1"
                  type="text" name="event-end-time" value="${end.toString().slice(4, 21)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">${price}</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price"
                  id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          <section class="event__details">

            <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                ${makeOption}
                </div>
            </section>

            <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${Array.from(DESCRIPTIONS)}
                <div class="event__photos-container">
                    <div class="event__photos-tape">
                    ${Array.from(urls).map((url) => `<img class="event__photo" src=${url} alt="Event photo">`).join(``)}
                    </div>
                    </div>
                </div>
            </section>
        </section>
    </form>`);
};
