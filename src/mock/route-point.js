import {getRandomBoolean, getRandomInteger, getFullDate, getRandomDateNow, getRandomElement, getShuffledSubarray} from '../utils.js';
import {dataOffer} from '../data.js';
import {CITIES, TYPES_OF_EVENT, DESCRIPTIONS, OFFER_OPTIONS} from '../const.js';
const numberOfDescription = getRandomInteger(dataOffer.description.MIN, dataOffer.description.MAX);

const DAYS_COUNT = 5;
const generatePhotos = (count) => {
  return Array(count).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generateOffers = () => {
  return OFFER_OPTIONS
    .sort(() => getRandomBoolean())
    .slice(0, getRandomInteger(dataOffer.offer.MIN, dataOffer.offer.MAX));
};

export const generatePoint = () => {
  const dateStart = getRandomDateNow(DAYS_COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    type: getRandomElement(TYPES_OF_EVENT),
    title: getRandomElement(CITIES),
    offers: generateOffers(),
    description: getShuffledSubarray(DESCRIPTIONS, numberOfDescription),
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart: getFullDate(),
    dateEnd: dateStart + residual,
    hours,
    minutes,
    photos: generatePhotos(getRandomInteger(dataOffer.photo.PHOTO_MIN_COUNT, dataOffer.photo.PHOTO_MAX_COUNT)),
  };
};

export const generatePoints = (count) => {
  return new Array(count).fill(``).map(generatePoint);
};
