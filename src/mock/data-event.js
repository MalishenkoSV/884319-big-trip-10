import {getRandomInteger, getRandomBoolean, getRandomDateTime, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {CITIES, DESCRIPTIONS, OFFER_OPTIONS, TYPES_OF_ACTIVITY, TYPES_OF_TRANSFERS} from '../const.js';

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

const generateCityOptions = () => {
  return new Array(COUNT).fill(``).map(generateCityOption);
};

export const cityOptions = generateCityOptions(COUNT);
export const generatePoint = () => {
  const dates = [getRandomDateTime(), getRandomDateTime()];
  dates.sort((a, b) => a.getTime() - b.getTime());
  return {
    type: getRandomArrayItem(getRandomBoolean ? TYPES_OF_TRANSFERS : TYPES_OF_ACTIVITY),
    cityOption: getRandomArrayItem(cityOptions),
    offers: new Set(getRandomArrayItem(0, 2, OFFER_OPTIONS)),
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart: dates[0],
    dateEnd: dates[1],
    duration: dates[1] - dates[0]
  };
};

export const generatePoints = (count) => {
  const events = new Array(count);
  return events.fill(``).map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
};
export const getUniqDates = (eventsData) => {
  return Array.from(new Set(eventsData.map((eventData) => eventData.date)));
};
