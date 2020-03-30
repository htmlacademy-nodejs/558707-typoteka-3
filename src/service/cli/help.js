'use strict';

const {logger} = require(`../../utils`);
const {ExitCode, Command} = require(`../../constants`);

const message = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mock.json
    --server <count>      запускает сервер на порту <count>`;

module.exports = {
  name: Command.HELP,
  run() {
    logger.showHelp(message);
    process.exit(ExitCode.SUCCESS);
  },
};
