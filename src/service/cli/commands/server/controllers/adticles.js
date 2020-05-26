"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const pinoLogger = require(`../../../../../pino-logger`);
const {FILE_NAME, HttpCode} = require(`../../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const ARTICLES_FIELDS_COUNT = 5;

const getArticles = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH, false);

    res.status(HttpCode.OK).json(fileContent);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const getArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);

    res.status(HttpCode.OK).json(article);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const postArticle = async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, ARTICLES_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    handlers.addElementToContent(fileContent, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const putArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.updateElementContent(article, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.removeElementFromContent(fileContent, article);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
};
