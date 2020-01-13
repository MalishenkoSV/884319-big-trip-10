const RANDOM_LIMIT = 0.5;

export const castDate = (date) => {
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hours}:${minutes}`;
};
export const castZeroFirstFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const castDateFormat = (dateUnix) => {
  const date = new Date(dateUnix);

  const yyyy = date.getFullYear();
  const mm = castZeroFirstFormat(date.getMonth() + 1);
  const dd = castZeroFirstFormat(date.getDate());
  return `${yyyy}-${mm}-${dd}`;
};
export const formatDate = (dateUnix) => {
  const currentDate = new Date(dateUnix);

  const date = castZeroFirstFormat(currentDate.getDate());
  const month = castZeroFirstFormat(currentDate.getMonth() + 1);
  const year = castZeroFirstFormat(currentDate.getFullYear() % 100);
  const hours = castZeroFirstFormat(currentDate.getHours());
  const minutes = castZeroFirstFormat(currentDate.getMinutes());

  return `${date}/${month}/${year} ${hours}:${minutes}`;
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

export const getRandomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomArrayItem = (array) => array[getRandomInteger(array.length - 1)];

export const getRandomBoolean = () => {
  return Math.random() > RANDOM_LIMIT;
};
export const getRandomArray = (min, max, array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomInteger(array));
  }
  return newArray;
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
export const castTimeFormat = (dateUnix) => {
  const date = new Date(dateUnix);

  const hours = castZeroFirstFormat(date.getHours());
  const minutes = castZeroFirstFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const castFirstFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};
export const formatTime = (date) => {
  const day = castFirstFormat(date.getDate());
  const month = castFirstFormat(date.getMonth() + 1);
  const year = String(date.getFullYear()).slice(2);
  const hours = castFirstFormat(date.getHours());
  const minutes = castFirstFormat(date.getMinutes());
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
  let yyyy = date.getFullYear();
  let mm = castZeroFirstFormat(date.getMonth() + 1);
  let dd = castZeroFirstFormat(date.getDate());
  let hh = castZeroFirstFormat(date.getHours());
  let ii = castZeroFirstFormat(date.getMinutes());

  return `${dd}/${mm}/${yyyy} ${hh}:${ii}`;
};
// дата в диапазоне от сегодняшнего
export const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000;
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
export const calculateTimeInterval = (time1, time2) => {
  const startDate = new Date(time1);
  const endDate = new Date(time2);

  const daysInt = Math.abs(endDate.getDay() - startDate.getDay());
  const hoursInt = Math.abs(endDate.getHours() - startDate.getHours());
  const minutesInt = Math.abs(endDate.getMinutes() - startDate.getMinutes());

  let formattedInt = daysInt > 0 ? castDateInterval(daysInt) : ``;
  if (daysInt > 0 || hoursInt > 0) {
    formattedInt += ` ${castHoursInterval(hoursInt)}`;
  }
  return formattedInt + ` ${castMinutesInterval(minutesInt)}`;
};

const castDateInterval = (days) => {
  return days < 10 ? `0${days}D` : `${days}D`;
};

const castHoursInterval = (hours) => {
  return hours < 10 ? `0${hours}H` : `${hours}H`;
};

const castMinutesInterval = (minutes) => {
  return minutes < 10 ? `0${minutes}M` : `${minutes}M`;
};
