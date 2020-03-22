"use strict";

const express = require(`express`);

const indexRoutes = require(`./routes/index`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const searchRoutes = require(`./routes/search`);

const DEFAULT_PORT = 8081;

const app = express();

app.use(`/`, indexRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/search`, searchRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
