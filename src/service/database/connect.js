"use strict";

const Sequelize = require(`sequelize`);
const pinoLogger = require(`../../pino-logger`);

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const connect = async () => {
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

  pinoLogger.info(`Connection started`);

  try {
    await sequelize.authenticate();
    pinoLogger.info(`Connection is successful`);
  } catch (err) {
    pinoLogger.error(`Error: ${err}`);
  }
};

module.exports = connect;
