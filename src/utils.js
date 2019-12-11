const RANDOM_LIMIT = 0.5;
const TIME_IN_MS = 60 * 60 * 24 * 1000;

export const formatDateToICO = (date) => {
  return date.toISOString();
};

export const castDate = (date) => {
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hours}:${minutes}`;
};

export const formatEditDate = (date) => {
  return formatDateToICO(date).split(`T`).join(` `);
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

export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getRandomElement = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

export const getRandomBoolean = () => {
  return Math.random() > RANDOM_LIMIT;
};
export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
// дата в диапазоне от сегодняшнего
export const getRandomDateNow = (days) => {
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export const getFullDate = (date = new Date()) => {
  const dd = String(date.getDate()).padStart(2, `0`);
  const mm = String(date.getMonth() + 1).padStart(2, `0`);
  const yyyy = date.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
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
