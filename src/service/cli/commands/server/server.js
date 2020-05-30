"use strict";

const express = require(`express`);

const {HttpCode, ApiRouteName} = require(`../../../../constants`);
const pinoLogger = require(`../../../../pino-logger`);

const articlesRoutes = require(`./routes/articles`);
const categoriesRoutes = require(`./routes/categories`);
const searchRoutes = require(`./routes/search`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(ApiRouteName.ARTICLES, articlesRoutes);
app.use(ApiRouteName.CATEGORIES, categoriesRoutes);
app.use(ApiRouteName.SEARCH, searchRoutes);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  pinoLogger.error(`Error: ${res.statusMessage}`);
  next();
});

app.use((req, res, next) => {
  pinoLogger.debug(`Start request to url ${req.url}`);
  pinoLogger.info(`End request with status code ${res.statusCode}`);
  next();
});

module.exports = app;
