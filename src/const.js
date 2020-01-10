import {getRandomInteger, getRandomArrayItem, getRandomBoolean} from './utils.js';

export const CITIES = [`Moscow`, `Tokyo`, `Paris`, `Melbourne`, `Sydney`, `Berlin`];
export const FILTERS_NAMES = [`Everything`, `Future`, `Past`];
export const POINT_OFFERS = [
  {type: `luggage`, title: `Add luggage`, price: 10, isChecked: getRandomBoolean()},
  {type: `comfort`, title: `Switch to comfort class`, price: 150, isChecked: getRandomBoolean()},
  {type: `meal`, title: `Add meal`, price: 2, isChecked: getRandomBoolean()},
  {type: `seats`, title: `Choose seats`, price: 9, isChecked: getRandomBoolean()},
  {type: `train`, title: `Travel by train`, price: 40, isChecked: getRandomBoolean()}
];
export const OfferType = {
  BUSINESS: `business`,
  RADIO: `radio`,
  TEMPERATURE: `temperature`,
  QUICKLY: `quickly`,
  SLOWLY: `slowly`,
  INFO: `infotainment`,
  MEAL: `meal`,
  SEATS: `seats`,
  TAXI: `taxi`,
  BREAKFAST: `breakfast`,
  WAKE: `wake`,
  COMFORT: `comfort`,
  LUGGAGE: `luggage`,
  LOUNGE: `lounge`
};

export const PointType = {
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
  PointType.TAXI,
  PointType.BUS,
  PointType.TRAIN,
  PointType.SHIP,
  PointType.TRANSPORT,
  PointType.DRIVE,
  PointType.FLIGHT
];

export const PLACE_TYPES = [
  PointType.CHECK_IN,
  PointType.SIGHTSEEING,
  PointType.RESTAURANT
];

const generateTypesMap = (types, suffix) =>
  types.reduce((acc, type) => Object.assign(acc, {[type]: suffix}), {});

export const suffixForPoint = Object.assign(
    generateTypesMap(TRANSPORT_TYPES, Suffix.TRANSPORT),
    generateTypesMap(PLACE_TYPES, Suffix.PLACE)
);

export const Destination = {
  CHAMONIX: `Chamonix`,
  GENEVA: `Geneva`,
  AMSTERDAM: `Amsterdam`
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
export const Offer = Object.values(OfferType).reduce(
    (acc, type) =>
      Object.assign(acc, {
        [type]: {
          title: getRandomArrayItem(DESCRIPTION.split(/\.\s+/)),
          price: getRandomInteger(100, 30)
        }
      }),
    {}
);
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
