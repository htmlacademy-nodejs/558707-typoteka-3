"use strict";

const {Router} = require(`express`);

const {getIndexEdit, getIndexAdd} = require(`../controllers/articles`);

const articlesRouter = new Router();

articlesRouter.get(`/add`, getIndexAdd);
articlesRouter.get(`/:id`, (req, res) => res.render(`post`));
articlesRouter.get(`/edit/:id`, getIndexEdit);
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

module.exports = articlesRouter;
