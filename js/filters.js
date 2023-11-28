import { renderPhoto } from './fullphoto.js';
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

const repaint = (event, filter, data) => {
  //условие для проверки фильтра для отмены лишних перерисовок картинок
  if (currentFilter !== filter) {
    const filteredData = filterHandles[filter](data);
    //удаление миниатюр перед отрисовкой новых по фильтрам
    const picrutes = document.querySelectorAll('.picture');
    picrutes.forEach((item) => item.remove());
    //отрисовываем миниатюры
    renderPhoto(filteredData);
    //делаем активным фильтр
    const currentActiveElement = filterFormElement.querySelector('.img-filters__button--active');
    currentActiveElement.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

//функция для пропуска откликов
const debounceRepaint = debounce(repaint);

//функция по удалению скрытого тега фильтров
const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', (evt) => {
    debounceRepaint(evt, FilterEnum.DEFAULT, data);
  });
  randomButtonElement.addEventListener('click', (evt) => {
    debounceRepaint(evt, FilterEnum.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (evt) => {
    debounceRepaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
