import { showPicture } from './picture.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({url, description, comments, likes, id}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  //TODO присваем id для каждой картинки
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showPicture(picture);
   });

   fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };

