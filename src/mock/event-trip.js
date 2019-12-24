import {getRandomBoolean, getRandomInteger, getRandomDate, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {CITIES, TYPES_OF_TRANSFERS, DESCRIPTIONS, OFFER_OPTIONS} from '../const.js';

const COUNT = 5;

const generateCityOption = () => {
  return {
    city: getRandomArrayItem(CITIES),
    photos: new Array(getRandomInteger(dataOffer.photo.PHOTO_MIN_COUNT, dataOffer.photo.PHOTO_MAX_COUNT))
            .fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: new Set(getRandomArrayItem(dataOffer.description.MIN, dataOffer.description.MAX, DESCRIPTIONS))
  };
};
export const generateCityOptions = () => {
  const CITYOPTIONS = new Array(COUNT);
  return CITYOPTIONS.fill(``).map(generateCityOption);
};

const generateOffers = () => {
  return OFFER_OPTIONS
    .sort(() => getRandomBoolean())
    .slice(0, getRandomInteger(dataOffer.offer.MIN, dataOffer.offer.MAX));
};

export const CITYOPTIONS = generateCityOptions(COUNT);
export const generatePoint = () => {
  const dateStart = getRandomDate(COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    type: getRandomArrayItem(TYPES_OF_TRANSFERS),
    cityOption: getRandomArrayItem(CITYOPTIONS),
    offers: generateOffers(),
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart,
    dateEnd: dateStart + residual,
    hours,
    minutes
  };
};

export const generatePoints = (count) => {
  const events = new Array(count);
  return events.fill(``).map(generatePoint);
};

