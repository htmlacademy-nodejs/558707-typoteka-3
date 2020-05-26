"use strict";

const {Router} = require(`express`);

const {getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle} = require(`../../controllers/adticles`);

const commentsRoute = require(`./comments`);

const articlesRouter = new Router();

articlesRouter.use(`/`, commentsRoute);

articlesRouter.get(`/`, getArticles);

articlesRouter.get(`/:articleId`, getArticle);

articlesRouter.post(`/`, postArticle);

articlesRouter.put(`/:articleId`, putArticle);

articlesRouter.delete(`/:articleId`, deleteArticle);

module.exports = articlesRouter;
