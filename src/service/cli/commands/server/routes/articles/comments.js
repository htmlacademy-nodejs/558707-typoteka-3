"use strict";

const {Router} = require(`express`);

const {getComments,
  deleteComment,
  postComment} = require(`../../controllers/comments`);

const commentsRouter = new Router();

commentsRouter.get(`/:articleId/comments`, getComments);

commentsRouter.post(`/:articleId/comments`, postComment);

commentsRouter.delete(`/:articleId/comments/:commentId`, deleteComment);

module.exports = commentsRouter;
