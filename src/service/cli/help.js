'use strict';

const message = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server &lt;command&gt;
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate &lt;count&gt;    формирует файл mock.json`;

module.exports = {
  name: `--help`,
  run() {
    console.info(message);
  },
};
