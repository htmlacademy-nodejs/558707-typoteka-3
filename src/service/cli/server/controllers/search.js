"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);

const getIndex = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const articles = fileContent.filter((offer) => new RegExp(req.query.query.toLowerCase()).test(offer.title.toLowerCase()));

    res.json(articles);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = getIndex;
