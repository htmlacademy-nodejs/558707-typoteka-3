"use strict";

const axios = require(`../../axios`);
const {API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
  try {
    const apiSearchEncodedUri = encodeURI(`${API_URL + ApiRouteName.SEARCH}?query=${req.query.search}`);
    const apiResponseArticle = await axios.get(apiSearchEncodedUri);
    const articles = apiResponseArticle.data;

    res.render(`search`, {
      articles,
    });
  } catch (err) {
    res.render(`search`);
  }
};

module.exports = {
  getIndex,
};
