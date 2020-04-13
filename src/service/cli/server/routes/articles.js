"use strict";

const {Router} = require(`express`);

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const ARTICLES_FIELDS_COUNT = 5;
const COMMENTS_FIELDS_COUNT = 1;

const articlesRouter = new Router();

articlesRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);

    res.json(fileContent);
  } catch (err) {
    res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

articlesRouter.get(`/:articleId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);

    res.json(article);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.post(`/`, async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, ARTICLES_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    handlers.addElementToContent(fileContent, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.put(`/:articleId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.updateElementContent(article, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.delete(`/:articleId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.removeElementFromContent(fileContent, article);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.get(`/:articleId/comments`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);

    res.json(article.comments);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    const comment = handlers.getElementById(article.comments, req.params.commentId);
    handlers.removeElementFromContent(article.comments, comment);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

articlesRouter.post(`/:articleId/comments/`, async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, COMMENTS_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.addElementToContent(article.comments, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = articlesRouter;
