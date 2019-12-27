import {getRandomInteger, getRandomBoolean, getRandomDateTime, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {CITIES, TYPES_OF_TRANSFERS, DESCRIPTIONS, OFFER_OPTIONS} from '../const.js';

const COUNT = 5;
const generateDescription = () => {
  return DESCRIPTIONS.split(/\.\s/).sort(() => getRandomBoolean()).join(`.`);
};
export const generateCityOption = () => {
  return {
    city: getRandomArrayItem(CITIES),
    photos: new Array(getRandomInteger(dataOffer.photo.PHOTO_MIN_COUNT, dataOffer.photo.PHOTO_MAX_COUNT))
            .fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: generateDescription()
  };
};

export const generateCityOptions = () => {
  const cityOptions = new Array(COUNT);
  return cityOptions.fill(``).map(generateCityOption);
};

export const cityOptions = generateCityOptions(COUNT);
export const generatePoint = () => {
  const dateStart = getRandomDateTime(COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    type: getRandomArrayItem(TYPES_OF_TRANSFERS),
    cityOption: getRandomArrayItem(cityOptions),
    offers: new Set(getRandomArrayItem(0, 2, OFFER_OPTIONS)),
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart,
    dateEnd: dateStart + residual,
    hours,
    minutes
  };
};

export const generatePoints = (count) => {
  const events = new Array(count);
  return events.fill(``).map(generatePoint).sort((a, b) => a.start - b.start);
};
