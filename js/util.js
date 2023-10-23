//создаём функцию выбора сулчайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//создаём функцию нахождения случайного индекса массива
const getRandomArrayElement = (items) => {
  items[getRandomInteger(0, items.length - 1)];
};

//создаём функцию нахождения значения id
const createIdGenerator = () => {
  let lastIdGenerator = 0;

  return () => {
    lastIdGenerator += 1;
    return lastIdGenerator;
  }
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
