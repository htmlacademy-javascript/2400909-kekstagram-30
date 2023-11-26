//объект с эффектами
const effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToSliderOptions = {
  [effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effect.CHROME]: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effect.SEPIA]: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effect.MARVIN]: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  [effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effect.HEAT]: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector(
  '.img-upload__effect-level'
);
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = effect.DEFAULT;

const isDefault = () => chosenEffect === effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = '';
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit, } = effectToSliderOptions[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effects) => {
  chosenEffect = effects;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectChange);
};

export { init, reset };
