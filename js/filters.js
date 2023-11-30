import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';
import { getRandomIndex } from './util.js';

//константа на кол-во случайных фото
const MAX_RANDOM_FILTER = 10;

const filterElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const defaultButtonElement = filterFormElement.querySelector('#filter-default');
const randomButtonElement = filterFormElement.querySelector('#filter-random');
const discussedButtonElement = filterFormElement.querySelector('#filter-discussed');


//объект с фильтрами
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

//функция по ключам фильтров
const filterHandles = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

//переменная для отмены лишних перерисовок миниатюр при выборе фильтров
let currentFilter = FilterEnum.DEFAULT;

const repaint = (evt, filter, data) => {
  //условие для проверки фильтра для отмены лишних перерисовок картинок
  if (currentFilter !== filter) {
    const container = document.querySelector('.pictures');
    const filteredData = filterHandles[filter](data);
    //удаление миниатюр перед отрисовкой новых по фильтрам
    const picrutes = document.querySelectorAll('.picture');
    picrutes.forEach((item) => item.remove());
    //отрисовываем миниатюры
    renderThumbnails(filteredData, container);
    //делаем активным фильтр
    //const currentActiveElement = filterFormElement.querySelector('.img-filters__button--active');
    //currentActiveElement.classList.remove('img-filters__button--active');
    //evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

//функция для пропуска откликов
const debounceRepaint = debounce(repaint);

const activateFilter = () => {
  const currentActiveElement = filterFormElement.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
} ;

//функция по удалению скрытого тега фильтров
const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, FilterEnum.DEFAULT, data);
  });
  randomButtonElement.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, FilterEnum.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
