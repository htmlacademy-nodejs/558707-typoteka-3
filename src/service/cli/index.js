'use strict';

const generate = require(`./commands/generate`);
const version = require(`./commands/version`);
const help = require(`./commands/help`);
const server = require(`./commands/server`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help,
  [server.name]: server,
};

module.exports = {
  Cli,
};
