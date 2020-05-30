"use strict";

const request = require(`supertest`);

const server = require(`../../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../../constants`);

let mockArticle;

beforeEach(() => {
  mockArticle = {
    title: `Mock article`,
    createdDate: `Mock article 1`,
    announce: `Mock article 2`,
    fullText: `Mock article 3`,
    category: [`Mock article 4`],
  };
});

describe(`Articles`, () => {
  describe(`GET`, () => {
    test(`When get 'articles' status code should be 200`, async () => {
      const res = await request(server)
                .get(ApiRouteName.ARTICLES);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`POST`, () => {
    test(`Should retrieve article with title 'Mock article'`, async () => {
      const res = await request(server)
               .post(ApiRouteName.ARTICLES)
               .send(mockArticle);

      const id = res.body.id;
      const articleResponse = await request(server)
               .get(`${ApiRouteName.ARTICLES}/${id}`);

      expect(articleResponse.body.title).toBe(mockArticle.title);
    });

    test(`Should 400 because not all fields exists`, async () => {
      delete mockArticle.announce;

      const res = await request(server)
               .post(ApiRouteName.ARTICLES)
               .send(mockArticle);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`PUT`, () => {
    test(`Should retrieve article with title 'Mock article put'`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      mockArticle.title = `Mock article put`;

      const id = res.body.id;

      const articleResponse = await request(server)
                .put(`${ApiRouteName.ARTICLES}/${id}`)
                .send(mockArticle);

      expect(articleResponse.body.title).toBe(mockArticle.title);
    });

    test(`Should 400 because not all fields exists`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;

      const newMockDescription = {
        description: ``
      };

      const articleResponse = await request(server)
                .put(`${ApiRouteName.ARTICLES}/${id}`)
                .send(newMockDescription);

      expect(articleResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`DELETE`, () => {
    test(`When delete 'article' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;

      const articleResponse = await request(server)
                .delete(`${ApiRouteName.ARTICLES}/${id}`);

      expect(articleResponse.statusCode).toBe(HttpCode.OK);
    });
  });
});
