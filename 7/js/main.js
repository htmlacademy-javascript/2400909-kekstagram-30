import {PICTURE_COUNT, AVATAR_COUNT, LIKES_MAX_COUNT, LIKES_MIN_COUNT, COMMENT_COUNT, COMMENT_LINE, DESCRIPTION, NAMES} from './data.js';
import { renderPhoto } from './fullphoto.js';
import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

//присваеваем переменной функцию создания случайног id
const generateCommentId = createIdGenerator;

//функция создания комментария
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINE),
).join(' ');

//функция создания объекта комментария
const createComment = () => ({
  id: generateCommentId,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  massage: createMessage,
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

const pictures = getPictures();
renderPhoto(pictures);

export { createPicture };
