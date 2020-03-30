"use strict";

const express = require(`express`);

const {Command} = require(`../../../constants`);
const {logger} = require(`../../../utils`);

const postsRoutes = require(`./routes/posts`);

const DEFAULT_PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(`/posts`, postsRoutes);

module.exports = {
  name: Command.SERVER,
  run(port) {
    const formattedPort = parseInt(port, 10) || DEFAULT_PORT;

    app.listen(formattedPort, (err) => err ? logger.showError(`Ошибка при создании сервера`, err) : logger.showSuccess(`Ожидаю соединений на ${formattedPort}`));
  },
};
