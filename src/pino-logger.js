"use strict";

const fs = require(`fs`);
const pino = require(`pino`);
const {resolve} = require(`path`);

const serviceDirPath = resolve(__dirname, `service`);
const logsDirPath = resolve(serviceDirPath, `logs`);

if (!fs.existsSync(logsDirPath)) {
  fs.mkdirSync(logsDirPath);
}

const logsFilePath = resolve(logsDirPath, `logs.log`);
const options = {
  name: `pino-logger`,
  level: process.env.LOG_LEVEL || `info`,
};

const pinoFileLogger = pino(options, logsFilePath);
const pinoConsoleLogger = pino(options);

const pinoLogger = {
  debug: (msg) => {
    pinoFileLogger.debug(msg);
    pinoConsoleLogger.debug(msg);
  },
  info: (msg) => {
    pinoFileLogger.info(msg);
    pinoConsoleLogger.info(msg);
  },
  error: (msg) => {
    pinoFileLogger.error(msg);
    pinoConsoleLogger.error(msg);
  },
};

module.exports = pinoLogger;
