"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
  try {
    const apiResponseArticles = await axios.get(API_URL + ApiRouteName.ARTICLES);
    const articles = JSON.parse(apiResponseArticles.data);

    res.status(HttpCode.OK).render(`my`, {
      articles,
    });
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

const getIndexComments = async (req, res) => {
  try {
    const apiResponseArticles = await axios.get(API_URL + ApiRouteName.ARTICLES);
    const articles = JSON.parse(apiResponseArticles.data).slice(0, 3);

    res.status(HttpCode.OK).render(`comments`, {
      articles,
    });
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  getIndex,
  getIndexComments,
};
