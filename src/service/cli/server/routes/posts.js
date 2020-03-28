"use strict";

const {Router} = require(`express`);

const {readFile} = require(`fs`).promises;

const {FILE_NAME} = require(`../../../../constants`);

const NOT_FOUND_MESSAGE = [];

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
    try {
        const fileContent = await readFile(FILE_NAME);

        res.json(fileContent.toString());
    } catch (err) {
        res.send(NOT_FOUND_MESSAGE);
    }
});

module.exports = postsRouter;
