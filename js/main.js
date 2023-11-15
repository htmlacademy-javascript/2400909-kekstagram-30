import { renderPhoto } from './fullphoto.js';
import './form.js';
import { loadPicture } from './api.js';
import { showErrorMessage } from './util.js';

async function bootstrap() {
  try {
    const pictures = await loadPicture();
    renderPhoto(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();

