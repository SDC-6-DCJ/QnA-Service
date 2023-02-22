/* eslint-disable no-undef */
const req = require('supertest');
const api = require('../server');

describe('Question Endpoints', () => {
  it('Get /questions', async () => {
    const res = await req(api).get('/questions?product_id=942312');

    expect(res.status).toBe(200);
    expect(res.body.results.length).toBe(1);
  });
  it('Post /questions', async () => {
    const res = await req(api).post('/questions')
      .send({
        product_id: 942349,
        name: 'Goose',
        email: 'Perry@The.platapus',
        body: 'Is this a platapus?',
      });

    expect(res.status).toBe(201);
  });
  it('Put /questions/:question_id/helpful', async () => {
    const res = await req(api).put('/questions/3518964/helpful');

    expect(res.status).toBe(204);
  });
  it('Put /questions/:question_id/report', async () => {
    const res = await req(api).put('/questions/3518964/report');

    expect(res.status).toBe(204);
  });
});

describe('Answer Endpoints', () => {
  it('Get /questions/:question_id/answers', async () => {
    const res = await req(api).get('/questions/3316054/answers');

    expect(res.status).toBe(200);
    expect(res.body.results.length).toBe(4);
  });
  it('Post /questions/:question_id/answers', async () => {
    const res = await req(api).post('/questions/3316056/answers')
      .send({
        photos: ['this is not a url, cause that would take to long and be far too much effort'],
        name: 'Goose',
        email: 'Perry@The.platapus',
        body: 'A platapus? PEEEERRY THE PLATAPUS??',
      });

    expect(res.status).toBe(201);
  });
  it('Put /answers/:answer_id/helpful', async () => {
    const res = await req(api).put('/answers/6481929/helpful');

    expect(res.status).toBe(204);
  });
  it('Put /answers/:answer_id/report', async () => {
    const res = await req(api).put('/answers/6481929/report');

    expect(res.status).toBe(204);
  });
});
