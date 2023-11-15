import { getPictures } from './data.js';
import { renderPhoto } from './fullphoto.js';
import './form.js';

const pictures = getPictures();

renderPhoto(pictures);

