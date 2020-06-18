"use strict";

const {Router} = require(`express`);

const {getIndex} = require(`../controllers/index`);

const indexRouter = new Router();

indexRouter.get(`/`, getIndex);

module.exports = indexRouter;
