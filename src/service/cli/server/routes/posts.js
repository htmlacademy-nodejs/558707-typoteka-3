"use strict";

const {Router} = require(`express`);

const {readFile} = require(`fs`).promises;

const {FILE_NAME} = require(`../../../../constants`);

const NOT_FOUND_MESSAGE = [];

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
    try {
        const fileContent = await readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        const template = `
            <!Doctype html>
              <html lang="ru">
              <head>
                <title>With love from Node</title>
              </head>
              <body>${message}</body>
            </html>`.trim();

        res.send(template);
    } catch (err) {
        res.send(NOT_FOUND_MESSAGE);
    }
});

module.exports = postsRouter;
