"use strict";

const {Router} = require(`express`);

const getIndex = require(`../controllers/search`);

const searchRouter = new Router();

searchRouter.get(`/`, getIndex);

module.exports = searchRouter;
