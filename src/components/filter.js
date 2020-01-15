import {FILTERS_NAMES} from '../const.js';
import {createElement} from "../utils/render.js";

const getFilter = (filter) => {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>
  `;
};

export const createFiltersTemplate = () => {
  return `
    <form class="trip-filters" action="#" method="get">
      ${FILTERS_NAMES.map((filter) => getFilter(filter)).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};
export default class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
