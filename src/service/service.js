'use strict';

const {Cli} = require(`./cli`);
const {
  ExitCode,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, userArgvCount] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArgvCount);
process.exit(ExitCode.success);
