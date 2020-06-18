"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
  try {
    const apiResponseArticles = await axios.get(API_URL + ApiRouteName.ARTICLES);
    const articles = JSON.parse(apiResponseArticles.data);
    const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
    const categories = apiResponseCategories.data;

    res.status(HttpCode.OK).render(`index`, {
      articles,
      categories,
    });
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  getIndex,
};
