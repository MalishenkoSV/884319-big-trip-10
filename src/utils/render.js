export const getRandomInteger = (max, min) => {
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
