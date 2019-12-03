import {getRandomInteger, getRandomElementFromArray, getRandomDateTime, getShuffledSubarray} from '../utils.js';
import {constants} from '../data.js';

const numberOfDescription = getRandomInteger(constants.description.MIN, constants.description.MAX);
const titles = [`Moscow`, `Tokyo`, `Paris`, `Melbourne`, `Sydney`, `Berlin`];
const namesOffers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const typesAdditional = [`meal`, `luggage`, `comfort`, `seats`, `train`];
export const types = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🛳️`],
  [`Transport`, `🚊`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check-in`, `🏨`],
  [`Sightseeing`, `🏛️`],
  [`Restaurant `, `🍴`],
]);

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateOffers = (number) => {
  let arrayOfOffers = [];
  while (arrayOfOffers.length < number) {
    arrayOfOffers.push({
      types: getRandomElementFromArray(typesAdditional),
      title: getRandomElementFromArray(namesOffers),
      price: getRandomInteger(constants.price.MIN, constants.price.MAX)
    });
  }
  return arrayOfOffers;
};
const generatePhotos = (count) => {
  return Array(count).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};
export const generatePoint = () => ({
  type: getRandomElementFromArray([...types.keys()]),
  title: getRandomElementFromArray(titles),
  picture: generatePhotos(),
  offers: generateOffers(getRandomInteger(constants.offer.MIN, constants.offer.MAX)),
  description: getShuffledSubarray(descriptions, numberOfDescription),
  price: getRandomInteger(constants.price.MIN, constants.price.MAX),
  dateStart: getRandomDateTime(),
  dateEnd: getRandomDateTime(),
  photos: generatePhotos(getRandomInteger(constants.photo.PHOTO_MIN_COUNT, constants.photo.PHOTO_MAX_COUNT)),
});


export const generatePoints = (count) => {
  return new Array(count).fill(``).map(generatePoint);
};
