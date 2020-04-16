"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const ARTICLES_FIELDS_COUNT = 5;
const COMMENTS_FIELDS_COUNT = 1;

const getArticles = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH, false);

    res.json(fileContent);
  } catch (err) {
    res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const getArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);

    res.json(article);
  } catch (err) {
    res.send(err.message);
  }
};

const postArticle = async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, ARTICLES_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    handlers.addElementToContent(fileContent, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
};

const putArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.updateElementContent(article, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);
    handlers.removeElementFromContent(fileContent, article);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
};

const getComments = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const article = handlers.getElementById(fileContent, req.params.articleId);

    res.json(article.comments);
  } catch (err) {
    res.send(err.message);
  }
};

const deleteComment = async (req, res) => {
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
};

const postComment = async (req, res) => {
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
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
  getComments,
  deleteComment,
  postComment,
};
