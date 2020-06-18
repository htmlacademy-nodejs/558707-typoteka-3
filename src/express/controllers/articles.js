"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getIndexEdit = async (req, res) => {
  try {
    const apiResponseArticle = await axios.get(`${API_URL}${ApiRouteName.ARTICLES}/${req.params.id}`);
    const article = apiResponseArticle.data;
    const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
    const categories = apiResponseCategories.data;

    res.status(HttpCode.OK).render(`post`, {
      article,
      categories
    });
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

const getIndexAdd = async (req, res) => {
  try {
    const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
    const categories = apiResponseCategories.data;

    res.status(HttpCode.OK).render(`new-post`, {
      categories
    });
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  getIndexEdit,
  getIndexAdd,
};
