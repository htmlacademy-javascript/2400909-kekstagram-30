const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

//перечисления методов запроса на сервер
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

//текст ошибок для отправки и получения данных с сервера
const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные.', //текст сообщения уточнить по ТЗ
  [HttpMethod.POST]: 'Не удалось отправить данные.', //текст сообщения уточнить по ТЗ
};

async function request (url, method = HttpMethod.GET, body = null) {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
}

//функция получения картинки из сервера
async function loadPicture() {
  return request(`${SERVER_URL}${ServerRoute.GET_DATA}`);
}

//функция отправки на сервер картинки
async function sendPicture(pictureData) {
  return request(
    `${SERVER_URL}${ServerRoute.SEND_DATA}`,
    HttpMethod.POST,
    pictureData,
  );
}

export { loadPicture, sendPicture };
