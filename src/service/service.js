'use strict';

const {Cli} = require(`./cli`);
const {
  MAX_ARGV_COUNT,
  ExitCode,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, userArgvCount] = userArguments;

if (userCommand === `--generate` && userArgvCount > MAX_ARGV_COUNT) {
  console.info(`Не больше ${MAX_ARGV_COUNT} объявлений`);
  process.exit(ExitCode.error);
}

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArgvCount);
