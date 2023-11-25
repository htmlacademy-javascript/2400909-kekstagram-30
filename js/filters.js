import { renderPhoto } from './fullphoto.js';

const filterElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

//константа на кол-во случайных фото
const MAX_RANDOM_FILTER = 10;

//объект с фильтрами
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

//функция нахождения случайного числа в диапазоне
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min));
};

//функция по ключам фильтров
const filterHandles = {
  [FilterEnum.DEFAULT]: (data) => {
    return data;
  },
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
  [FilterEnum.DISCUSSED]: (data) => {
    return [...data].sort((item1, item2) => {
      return item2.comments.length - item1.comments.length;
    });

  },
};

const repaint = (event, filter, data) => {
  const filteredData = filterHandles[filter](data);
  //удаление миниатюр перед отрисовкой новых по фильтрам
  const picrutes = document.querySelectorAll('.picture');
  picrutes.forEach((item) => item.remove());
  //отрисовываем миниатюры
  renderPhoto(filteredData);
  //делаем активным фильтр
  const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};

//функция по удалению скрытого тега фильтров
const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
