"use strict";

const request = require(`supertest`);

const server = require(`../../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../../constants`);

let mockArticle;
let mockComment;

beforeEach(() => {
  mockArticle = {
    title: `Mock article`,
    createdDate: `Mock article 1`,
    announce: `Mock article 2`,
    fullText: `Mock article 3`,
    category: [`Mock article 4`],
  };

  mockComment = {
    text: `Mock comment`
  };
});

describe(`Comments`, () => {
  describe(`GET`, () => {
    test(`When get 'comments' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;
      const articleResponse = await request(server)
                .get(`${ApiRouteName.ARTICLES}/${id}/comments`);

      expect(articleResponse.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`POST`, () => {
    test(`When post 'comments' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.ARTICLES}/${id}/comments`)
                .send(mockComment);

      expect(commentsResponse.statusCode).toBe(HttpCode.OK);
    });

    test(`Article should retrieve comment with text 'Mock comment'`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.ARTICLES}/${id}/comments`)
                .send(mockComment);

      expect(commentsResponse.body.comments[0].text).toBe(mockComment.text);
    });
  });

  describe(`DELETE`, () => {
    test(`When delete 'comment' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.ARTICLES)
                .send(mockArticle);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.ARTICLES}/${id}/comments`)
                .send(mockComment);

      const deleteComment = await request(server)
                .delete(`${ApiRouteName.ARTICLES}/${id}/comments/${commentsResponse.body.comments[0].id}`);

      expect(deleteComment.statusCode).toBe(HttpCode.OK);
    });
  });
});
