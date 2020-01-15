import {getRandomInteger, getRandomDateTime, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {EventType, generateDescription, CITIES, offersForEvent} from '../const.js';

const COUNT = 5;
const COUNT_OFFERS = 2;
const cityOptions = CITIES.map((CITY) => {
  return {
    city: CITY,
    photos: new Array(getRandomInteger(dataOffer.photo.PHOTO_MAX_COUNT, dataOffer.photo.PHOTO_MIN_COUNT))
          .fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: generateDescription()
  };

});


export const generatePoint = () => {
  const cityOption = getRandomArrayItem(cityOptions);
  const dates = [getRandomDateTime(), getRandomDateTime()];
  dates.sort((a, b) => a.getTime() - b.getTime());
  const type = getRandomArrayItem(Object.values(EventType));
  return {
    type,
    cityOption,
    offers: offersForEvent[type].slice(0, getRandomInteger(COUNT_OFFERS, 0)),
    price: getRandomInteger(dataOffer.price.MAX, dataOffer.price.MIN),
    dateStart: dates[0],
    dateEnd: dates[1],
    duration: dates[1] - dates[0]
  };
};

export const generatePoints = () => {
  const events = new Array(COUNT);
  return events.fill(``).map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
};
export const getUniqDates = (eventsData) => {
  return Array.from(new Set(eventsData.map((eventData) => eventData.date)));
};
