'use strict';

const packageJson = require(`../../../package.json`);
const version = packageJson.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(`v${version}`);
  },
};
