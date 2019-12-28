const RANDOM_LIMIT = 0.5;
const TIME_IN_MS = 60 * 60 * 24 * 1000;


export const castDate = (date) => {
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hours}:${minutes}`;
};
export const castZeroFirstFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const castDateFormat = (date) => {
  let yyyy = date.getFullYear();
  let mm = castZeroFirstFormat(date.getMonth() + 1);
  let dd = castZeroFirstFormat(date.getDate());
  return `${yyyy}-${mm}-${dd}`;
};
export const getEndDate = (someDate) => {
  const targetDate = new Date(someDate);
  targetDate.setMilliseconds(getRandomInteger(0, 4) * 60 * 60 * 1000);
  return targetDate;
};

export const formatToTitleCase = (word) => {
  const firstLetter = word[0].toUpperCase();
  return `${firstLetter}${word.slice(1)}`;
};

export const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getRandomBoolean = () => {
  return Math.random() > RANDOM_LIMIT;
};
export const getRandomDateTime = () => {
  const targetDate = new Date();
  const sing = getRandomBoolean ? 1 : -1;
  const diffValue = sing * getRandomInteger(0, 2);
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(hours, minutes);

  return targetDate;
};
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = String(date.getFullYear()).slice(2);
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
export const getDuration = (n) => {
  const hours = (n / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}H ${rminutes}M`;
};

export const castDateTimeFormat = (date) => {
  date = new Date();
  let yy = date.getFullYear();
  let mm = castZeroFirstFormat(date.getMonth() + 1);
  let dd = castZeroFirstFormat(date.getDate());
  let hh = castZeroFirstFormat(date.getHours());
  let ii = castZeroFirstFormat(date.getMinutes());

  return `${dd}/${mm}/${yy} ${hh}:${ii}`;
};
// дата в диапазоне от сегодняшнего
export const getRandomDateNow = (days) => {
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getShuffledSubarray = (array, numberOfElements) => {
  const shuffledArr = shuffleArray(array);
  return shuffledArr.slice(0, numberOfElements);
};
