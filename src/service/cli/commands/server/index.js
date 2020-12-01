"use strict";

const app = require(`./server`);
const {Command} = require(`../../../../constants`);
const pinoLogger = require(`../../../../pino-logger`);
const {Database} = require(`../../../database/index`);

const DEFAULT_PORT = process.env.PORT || 3000;

module.exports = {
  name: Command.SERVER,
  run(port) {
    const formattedPort = parseInt(port, 10) || DEFAULT_PORT;

    Database.connect();
    
    app.listen(formattedPort, () => pinoLogger.info(`Server start on ${formattedPort}`))
        .on(`error`, (err) => pinoLogger.error(`Server can't start. Error: ${err}`));
  },
};
