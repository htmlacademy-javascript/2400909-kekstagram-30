const COMMENTS_COUNT_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];

//функция создания одного комментария
const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

//функция отрисовки комментариев
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOW;

  if (commentsCountShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  //создаём фрагмент хранения новых комментариев
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  //очистка комментариев
  commentsListElement.innerHTML = '';
  //добавляем фрагмент с новыми комментариями
  commentsListElement.append(fragment);
  commentCountElement.textContent = commentsCountShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

//функция закрытия большого фото крестиком
const hidePicture = () => {
  commentsCountShown = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  //удадяем обработчик события на закрытие фото с клавиатуры
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//функция закрытия по регламенту
const onClosePictureButtonClick = () => {
  hidePicture();
};

//функция закрытия фото с клавиатуры
function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

//создаём функицю заполнения данными большого фото
const renderPicture = ({ url, description, likes, name }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = name;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

//создаём фукнцию просмотра картинки
const showPicture = (pictureData) => {
  //прописываем действия по показу большого фото
  bigPictureElement.classList.remove('hidden');
  //добавляем атрибут .modal-open для большого фото
  bodyElement.classList.add('.modal-open');
  //закрытие фото с клавиатуры
  document.addEventListener('keydown', onDocumentKeyDown);

  comments = pictureData.comments;
  if (comments.length > 0) {
  //добавляем функцию по комментариям для отрисовки
    renderComments();
  }

  renderPicture(pictureData);
};

//обработчик событий на закрытие фото крестиком
closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
