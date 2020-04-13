"use strict";

const {Router} = require(`express`);

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
    try {
        const fileContent = await handlers.getContent(FILE_PATH);
        const articles = JSON.parse(fileContent).filter((offer) => new RegExp(req.query.query.toLowerCase()).test(offer.title.toLowerCase()));

        res.json(articles);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = searchRouter;
