const thumbnailTemplateElement = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({url, description, comments, likes, id}) => {
  const thumbnail = thumbnailTemplateElement.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  //присваем id для каждой картинки
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
