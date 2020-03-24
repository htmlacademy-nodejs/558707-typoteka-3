'use strict';

const http = require(`http`);
const {readFile} = require(`fs`).promises;

const {Command, HttpCode, FILE_NAME} = require(`../../constants`);
const {logger} = require(`../../utils`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE_TXT = `Not found`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);

        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE_TXT);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE_TXT);
      break;
  }
};

module.exports = {
  name: Command.SERVER,
  run(port) {
    const formattedPort = parseInt(port, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(formattedPort)
      .on(`listening`, (err) => err ? logger.showError(`Ошибка при создании сервера`, err) : logger.showSuccess(`Ожидаю соединений на ${formattedPort}`));
  },
};
