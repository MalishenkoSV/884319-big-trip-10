import {getRandomInteger, getRandomBoolean, getRandomDate, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {eventPointTypes, generateDescription, CITIES, POINT_OFFERS} from '../const.js';

const COUNT = 5;
const cityOptions = CITIES.map((CITY) => {
  return {
    city: CITY,
    photos: new Array(getRandomInteger(dataOffer.photo.PHOTO_MIN_COUNT, dataOffer.photo.PHOTO_MAX_COUNT))
          .fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: generateDescription()
  };

});

const generateOffers = (offers) => {
  offers.forEach((offer) => {
    offer.isChecked = getRandomBoolean;
  });

  return offers
    .filter(({isChecked}) => isChecked)
    .slice(dataOffer.offer.MIN, dataOffer.offer.MAX);
};


export const generatePoint = () => {
  const cityOption = getRandomArrayItem(cityOptions);
  const offers = generateOffers(POINT_OFFERS);
  const dateStart = getRandomDate();
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const type = getRandomArrayItem(eventPointTypes);
  return {
    type,
    cityOption,
    offers,
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart,
    dateEnd: dateStart + residual
  };
};

export const generatePoints = () => {
  const events = new Array(COUNT);
  return events.fill(``).map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
};
export const getUniqDates = (eventsData) => {
  return Array.from(new Set(eventsData.map((eventData) => eventData.date)));
};
