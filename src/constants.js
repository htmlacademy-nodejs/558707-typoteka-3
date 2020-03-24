'use strict';

module.exports = {
  FILE_NAME: `mock.json`,
  Command: {
    GENERATE: `--generate`,
    HELP: `--help`,
    VERSION: `--version`,
    SERVER: `--server`,
  },
  ExitCode: {
    ERROR: 1,
    SUCCESS: 0,
  },
  get DEFAULT_COMMAND() {
    return this.Command.HELP;
  },
  USER_ARGV_INDEX: 2,
  HttpCode: {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
  },
};
