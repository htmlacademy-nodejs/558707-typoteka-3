'use strict';

const message = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mock.json`;

module.exports = {
  name: `--help`,
  run() {
    console.info(message);
  },
};
