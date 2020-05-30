"use strict";

const request = require(`supertest`);

const server = require(`../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../constants`);

describe(`Search`, () => {
  describe(`GET`, () => {
    test(`When get 'search' status code should be 200`, async () => {
      const res = await request(server).get(`${ApiRouteName.SEARCH}?query=`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });
});
