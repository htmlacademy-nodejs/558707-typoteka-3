"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, `data`, `categories.txt`);

const getIndex = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH, false);
    const categories = fileContent.split(`\n`).slice(0, -1);

    res.json(categories);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = getIndex;
