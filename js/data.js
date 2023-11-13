import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

//объявление постоянных
const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const COMMENT_LINE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTION = [
  'Вот это прикольно!',
  'Лето закончилось)',
  'Тестируем новую камеру',
  'Моя семью. Люблю вас!',
  'Проубю что-то новенькое',
  'Как тебе, такое Илон Макс?',
  'Куда идём мы с пяточком...',
  'Всем привет!',
  'Новые приключения...',
  'А что ты сделал сегодня для завтра?'
];
const NAMES = [ 'Женя', 'Саня', 'Рита', 'Леся', 'Дима', 'Оксана', 'Серега', ];

//присваеваем переменной функцию создания случайног id
const generateCommentId = createIdGenerator();

//функция создания комментария
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINE),
).join(' ');

//функция создания объекта комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

//функция создания массива объектов фото
const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export { getPictures };


