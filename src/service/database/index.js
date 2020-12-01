"use strict";

require(`dotenv`).config();
const connect = require(`./connect`);

const Database = {
    connect,
};

module.exports = {
    Database,
};