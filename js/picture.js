const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

//функция закрытия большого фото крестиком
const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  //удадяем обработчик события на закрытие фото с клавиатуры
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//функция закрфтия по регламенту
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
const renderPicture = ({ url, description, likes }) => {
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

  renderPicture(pictureData);
};

//обработчик событий на закрытие фото крестиком
closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);

export { showPicture };
