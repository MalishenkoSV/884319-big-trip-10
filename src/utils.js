export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getRandomElementFromArray = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};
export const getRandomDateTime = () => {
  const targetDate = new Date();
  const sing = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sing * getRandomInteger(0, 2);
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(hours, minutes);

  return targetDate;
};
export const getRandomTime = () => {
  const hours = castTimeFormat(getRandomInteger(0, 24));
  const minuts = castTimeFormat(getRandomInteger(0, 59));
  return `${hours}:${minuts}`;
};

export const castTimeFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}: ${minutes}`;
};

export const castZeroFirstFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const castDateKebabFormat = (date) => {
  let yyyy = date.getFullYear();
  let mm = castZeroFirstFormat(date.getMonth() + 1);
  let dd = castZeroFirstFormat(date.getDate());
  return `${yyyy}-${mm}-${dd}`;
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
