"use strict";

const {Router} = require(`express`);

const {readFile} = require(`fs`).promises;
const {join} = require(`path`);

const {FILE_NAME} = require(`../../../../constants`);

const NOT_FOUND_MESSAGE = [];

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await readFile(join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME), `utf-8`);

    res.json(fileContent);
  } catch (err) {
    res.send(NOT_FOUND_MESSAGE);
  }
});

module.exports = postsRouter;
