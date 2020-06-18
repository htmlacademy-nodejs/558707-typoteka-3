"use strict";

const {Router} = require(`express`);

const {getIndex, getIndexComments} = require(`../controllers/my`);

const myRouter = new Router();

myRouter.get(`/`, getIndex);
myRouter.get(`/comments`, getIndexComments);

module.exports = myRouter;
