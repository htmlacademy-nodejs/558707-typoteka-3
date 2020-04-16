"use strict";

const {Router} = require(`express`);

const {getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
  getComments,
  deleteComment,
  postComment} = require(`../controllers/articles`);

const articlesRouter = new Router();

articlesRouter.get(`/`, getArticles);

articlesRouter.get(`/:articleId`, getArticle);

articlesRouter.post(`/`, postArticle);

articlesRouter.put(`/:articleId`, putArticle);

articlesRouter.delete(`/:articleId`, deleteArticle);

articlesRouter.get(`/:articleId/comments`, getComments);

articlesRouter.delete(`/:articleId/comments/:commentId`, deleteComment);

articlesRouter.post(`/:articleId/comments/`, postComment);

module.exports = articlesRouter;
