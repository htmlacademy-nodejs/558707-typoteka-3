'use strict';

const {version} = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(`v${version}`);
  },
};
