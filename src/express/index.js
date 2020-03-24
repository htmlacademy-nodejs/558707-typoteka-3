"use strict";

const express = require(`express`);

const indexRoutes = require(`./routes/index`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const searchRoutes = require(`./routes/search`);
const categoriesRoutes = require(`./routes/categories`);

const DEFAULT_PORT = process.env.PORT || 8080;

const app = express();

app.use(`/`, indexRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/search`, searchRoutes);
app.use(`/categories`, categoriesRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
