'use strict';

const {Command: {VERSION}} = require(`../../constants`);

const {version} = require(`../../../package.json`);

module.exports = {
  name: VERSION,
  run() {
    console.info(`v${version}`);
  },
};
