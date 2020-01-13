import {getRandomInteger, getRandomArrayItem, getRandomBoolean} from './utils.js';

const COUNT = 5;
export const CITIES = [`Moscow`, `Tokyo`, `Paris`, `Melbourne`, `Sydney`, `Berlin`];
export const FILTERS_NAMES = [`Everything`, `Future`, `Past`];


export const EventType = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};
const Suffix = {
  TRANSPORT: `to`,
  PLACE: `in`
};

export const TRANSPORT_TYPES = [
  EventType.TAXI,
  EventType.BUS,
  EventType.TRAIN,
  EventType.SHIP,
  EventType.TRANSPORT,
  EventType.DRIVE,
  EventType.FLIGHT
];

export const PLACE_TYPES = [
  EventType.CHECK_IN,
  EventType.SIGHTSEEING,
  EventType.RESTAURANT
];

const generateTypesMap = (types, suffix) =>
  types.reduce((acc, type) => Object.assign(acc, {[type]: suffix}), {});

export const suffixForPoint = Object.assign(
    generateTypesMap(TRANSPORT_TYPES, Suffix.TRANSPORT),
    generateTypesMap(PLACE_TYPES, Suffix.PLACE)
);

export const Destination = {
  MOSCOW: `Moscow`,
  TOKYO: `Tokyo`,
  PARIS: `Paris`,
  MELBURN: `Melbourne`,
  SYDNEY: `Sydney`,
  BERLIN: `Berlin`
};

export const DESCRIPTION =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.`;


export const eventPointTypes = [
  {type: `bus`, isChecked: false, group: `Transfer`},
  {type: `check-in`, isChecked: false, group: `Activity`},
  {type: `drive`, isChecked: false, group: `Transfer`},
  {type: `flight`, isChecked: false, group: `Transfer`},
  {type: `restaurant`, isChecked: false, group: `Activity`},
  {type: `ship`, isChecked: false, group: `Transfer`},
  {type: `sightseeing`, isChecked: true, group: `Activity`},
  {type: `taxi`, isChecked: false, group: `Transfer`},
  {type: `train`, isChecked: false, group: `Transfer`},
  {type: `transport`, isChecked: false, group: `Transfer`},
  {type: `trip`, isChecked: false, group: `Transfer`}
];

export const OfferType = {
  MEAL: `meal`,
  SEATS: `seats`,
  COMFORT: `comfort`,
  LUGGAGE: `luggage`,
  TRAIN: `train`
};


export const generateDescription = () => {
  return DESCRIPTION.split(/\.\s+/).sort(getRandomBoolean).slice(0, COUNT).join(`.`);
};
export const destinationDetails = Object.values(Destination).reduce(
    (acc, name) =>
      Object.assign(acc, {
        [name]: {
          description: generateDescription(),
          photos: new Array(getRandomInteger(COUNT, 1)).fill(``).map(() => ({
            src: `http://picsum.photos/300/150?r=${Math.random()}`,
            description: getRandomArrayItem(DESCRIPTION.split(/\.\s+/))
          }))
        }
      }),
    {}
);
const Offer = Object.values(OfferType).reduce(
    (acc, type) =>
      Object.assign(acc, {
        [type]: {
          title: getRandomArrayItem(DESCRIPTION.split(/\.\s+/)),
          price: getRandomInteger(100, 30)
        }
      }),
    {}
);


export const populateEvent = (event) =>
  Object.assign({}, event, {
    destination: Object.assign(
        {name: event.destination},
        destinationDetails[event.destination]
    ),
    offers: event.offers.map((type) => Offer[type]),
    suffix: suffixForPoint[event.type]
  });
export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


// для каждого типа точки задаем список возможных опций

export const offersForEvent = Object.values(EventType).reduce(
    (acc, type) =>
      Object.assign(acc, {
        [type]: Object.values(OfferType)
          .sort(getRandomBoolean)
          .slice(getRandomInteger(COUNT))
      }),
    {}
);
export const generateOfferList = () => {
  const set = new Set();
  const offerCount = getRandomInteger(2);
  const offerTypes = Object.values(OfferType);

  for (let i = 0; i < offerCount; i++) {
    set.add(getRandomArrayItem(offerTypes));

  }

  const offers = [];
  set.forEach((item) => {
    offers.push({type: item, checked: getRandomBoolean(), cost: getRandomInteger(200)});
  });

  return offers;
};
