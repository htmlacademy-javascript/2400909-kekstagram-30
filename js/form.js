import { resetScale } from './scale.js';
import { init, reset } from './effect.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
//добавляем поддерживаемые форматы загружаемых новым картинок
const FILE_TYPES = ['jpg', 'png', 'jpeg'];
//добавляем объект для вывода сообщений об ошибках при валидации
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправельный хэштег',
};

const SubmitButtonCaption = {
  SUBMITTING: 'ОТПРАВЛЯЮ...',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileFieldElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const photoPreviewElement = formElement.querySelector('.img-upload__preview img');
const effectsPreviewsElement = formElement.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING
    : SubmitButtonCaption.IDLE;
};

//добавляем функцию валидации
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

//функция открытия окна
const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

//функция закрытия окна
const hideModal = () => {
  formElement.reset();
  resetScale();
  reset();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//функция фокусировки на тегах и комментариях
const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

//функция проверки расширения загруженного фото
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

//функция для нормализации хэштегов
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

//приведение тегов к маленькому регистру букв
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//определяем есть или нет окно об ошибке
function isErrorMessageExists() {
  return Boolean(document.querySelector('.error'));
}

//функция обработчик
function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideModal();
  }
}

//функция закрытия картинки по крестику
const onCancelButtonClick = () => {
  hideModal();
};

//функция добавления фото
const onFileInputChange = () => {
  const file = fileFieldElement.files[0];

  if (file && isValidType(file)) {
    photoPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreviewElement.src}')`;
    });
  }
  showModal();
};

async function sendForm(formEl) {
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formEl));
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
}

//функция добавления валидации комментариев
const onFormSubmit = async (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};
//добавляем валидацию на хэш-теги
pristine.addValidator(
  hashtagFieldElement,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);
//добавляем валидацию на хэш-теги
pristine.addValidator(
  hashtagFieldElement,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);
//добавляем валидацию на хэш-теги
pristine.addValidator(
  hashtagFieldElement,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

fileFieldElement.addEventListener('change', onFileInputChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormSubmit);
init();
