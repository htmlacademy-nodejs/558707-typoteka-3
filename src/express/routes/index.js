"use strict";

const {Router} = require(`express`);

const indexRouter = new Router();

indexRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = indexRouter;
