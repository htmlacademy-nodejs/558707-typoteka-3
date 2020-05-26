"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const pinoLogger = require(`../../../../../pino-logger`);
const {FILE_NAME, HttpCode} = require(`../../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, `..`, FILE_NAME);

const getIndex = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const articles = fileContent.filter((offer) => new RegExp(req.query.query.toLowerCase()).test(offer.title.toLowerCase()));

    res.status(HttpCode.OK).json(articles);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

module.exports = getIndex;
