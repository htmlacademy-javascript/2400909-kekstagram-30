const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('error');

function hideMessage() {

}

function showMessage(element, buttonClass) {
  document.body.append();
}

function showSuccessMessage() {
  showMessage(successMessageElement, '.success__button');
}

function showErrorMessage() {
  showMessage(errorMessageElement, '.error__button');
}

export { showSuccessMessage, showErrorMessage };
