export const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    default:
      container.append(element);
  }
};

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_BEGIN: `beforebegin`
};
export const remove = (element) => {
  if (element) {
    element.remove();
  }
};
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
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
