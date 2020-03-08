'use strict';

const chalk = require(`chalk`);

const {ExitCode, Command} = require(`../../constants`);

const {version} = require(`../../../package.json`);

module.exports = {
  name: Command.VERSION,
  run() {
    console.info(chalk.blue(`v${version}`));
    process.exit(ExitCode.SUCCESS);
  },
};
