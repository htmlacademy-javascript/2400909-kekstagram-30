const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

function showErrorMessage() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

export { showErrorMessage };


//создаём функцию выбора сулчайного числа из диапазона
//const getRandomInteger = (a, b) => {
//  const lower = Math.ceil(Math.min(a, b));
//  const upper = Math.floor(Math.max(a, b));
//  const result = Math.random() * (upper - lower + 1) + lower;
//  return Math.floor(result);
//};

//создаём функцию нахождения случайного индекса массива
//const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

//создаём функцию нахождения значения id
//const createIdGenerator = () => {
//  let lastIdGenerator = 0;

// return () => {
//    lastIdGenerator += 1;
//    return lastIdGenerator;
//  };
//};

//export { getRandomInteger, getRandomArrayElement, createIdGenerator };
