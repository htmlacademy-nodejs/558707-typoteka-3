"use strict";

const {Router} = require(`express`);

const getIndex = require(`../controllers/categories`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, getIndex);

module.exports = categoriesRouter;
