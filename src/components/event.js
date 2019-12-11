export const createCardTemplate = (typesOfTransfer) => {
  const {type, city, price, start, end, hours, minutes, offers} = typesOfTransfer;
  const makeDateStart = () => {
    new Date(start).toString().slice(4, 21);
  };
  const makeTimeStart = () => {
    new Date(start).toTimeString().slice(0, 5);
  };
  const makeDateEnd = () => {
    new Date(end).toString().slice(4, 21);
  };
  const makeTimeEnd = () => {
    new Date(end).toTimeString().slice(0, 5);
  };
  const makeIcon = () => {
    typesOfTransfer.split(``)[0].toLowerCase();
  };
  const makeOffers = () => {
    Array.from(offers).map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.option}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
     </li>`).join(``);
  };

  return (
    `<li class="trip-events__item">
        <div class="event">
            <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${makeIcon}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type}${city}</h3>

            <div class="event__schedule">
                <p class="event__time">
                    <time class="event__start-time" datetime="${makeDateStart}">${makeTimeStart}</time>
                        &mdash;
                    <time class="event__end-time" datetime="${makeDateEnd}">${makeTimeEnd}</time>
                </p>
                <p class="event__duration">${hours}H ${minutes}M</p>
            </div>

            <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
            </p>

            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
                ${makeOffers}
            </ul>
            <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
            </button>
        </div>
    </li>`);
};
