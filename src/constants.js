'use strict';

module.exports = {
  Command: {
    GENERATE: `--generate`,
    HELP: `--help`,
    VERSION: `--version`,
  },
  ExitCode: {
    ERROR: 1,
    SUCCESS: 0,
  },
  get DEFAULT_COMMAND() {
    return this.Command.HELP;
  },
  USER_ARGV_INDEX: 2,
};
