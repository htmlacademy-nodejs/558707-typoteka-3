"use strict";

const request = require(`supertest`);

const server = require(`../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../constants`);

describe(`Categories`, () => {
  describe(`GET`, () => {
    test(`When get 'categories' status code should be 200`, async () => {
      const res = await request(server).get(ApiRouteName.CATEGORIES);
      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });
});
