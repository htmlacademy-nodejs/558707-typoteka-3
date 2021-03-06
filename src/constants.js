'use strict';

module.exports = {
  FILE_NAME: `mock.json`,
  API_URL: `http://localhost:3000`,
  ApiRouteName: {
    ARTICLES: `/api/articles`,
    CATEGORIES: `/api/categories`,
    SEARCH: `/api/search`,
  },
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
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
  },
};
