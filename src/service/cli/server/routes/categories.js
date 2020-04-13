"use strict";

const {Router} = require(`express`);

const {join} = require(`path`);

const handlers = require(`../utils`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, `data`, `categories.txt`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
    try {
        const fileContent = await handlers.getContent(FILE_PATH);
        const categories = fileContent.split(`\n`).slice(0, -1);

        res.json(categories);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = categoriesRouter;
