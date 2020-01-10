import {getRandomInteger, getRandomBoolean, getRandomDateTime, getRandomArrayItem} from '../utils.js';
import {dataOffer} from '../data.js';
import {POINT_OFFERS, PointType, Destination, DESCRIPTION, CITIES} from '../const.js';

const COUNT = 5;
const generateDescription = () => {
  return DESCRIPTION.split(/\.\s/).sort(() => getRandomBoolean()).join(`.`);
};
const destinationDetails = Object.values(Destination).reduce(
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
const generateOffers = (offers) => {
  offers.forEach((offer) => {
    offer.isChecked = getRandomBoolean;
  });

  return offers
    .filter(({isChecked}) => isChecked)
    .slice(dataOffer.offer.MIN, dataOffer.offer.MAX);
};
export const generatePoint = () => {
  const type = getRandomArrayItem(Object.values(PointType));
  return {
    type,
    destination: getRandomArrayItem(Object.values(Destination)),
    cityOption: getRandomArrayItem(cityOptions),
    offers:  generateOffers(POINT_OFFERS),
    price: getRandomInteger(dataOffer.price.MIN, dataOffer.price.MAX),
    dateStart: getRandomDateTime(),
    dateEnd: getRandomDateTime()
  };
};

export const generatePoints = (count) => {
  const events = new Array(count);
  return events.fill(``).map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
};
export const getUniqDates = (eventsData) => {
  return Array.from(new Set(eventsData.map((eventData) => eventData.date)));
};
