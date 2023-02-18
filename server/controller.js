/* eslint-disable no-param-reassign */
const model = require('./model.js');
const { int, string, bool } = require('../parse.js');

const funcs = {
  q: {
    getQuestions: (req, res) => {
      let { product_id, page, count } = req.query;

      product_id = int(product_id);
      count = count ? int(count) : 5;
      page = page ? (int(page) - 1) * count : 0;

      model.q.getAll(product_id, count, page)
        .then((data) => Promise.all(data.rows.map((question) => model.a.getAll(question.question_id)
          .then((answers) => Promise.all(answers.rows.map((answer) => model.p.getAll(answer.id)
            .then((photos) => {
              answer.date = new Date(+answer.date);
              answer.photos = photos.rows;
              return answer;
            }))))
          .then((answers) => {
            question.question_date = new Date(+question.question_date);
            question.answers = answers;
            return question;
          }))))
        .then((results) => {
          const result = {};
          result.product_id = product_id;
          result.results = results;
          console.log('result', result);
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    },
  },
  a: {
    getAnswers: (req, res) => {
      const question_id = int(req.params.question_id);
      let { page, count } = req.query;

      count = count ? int(count) : 5;
      page = page ? (int(page) - 1) * count : 0;

      model.a.getAll(question_id, count, page)
        .then((answers) => Promise.all(answers.rows.map((answer) => model.p.getAll(answer.id)
          .then((photos) => {
            answer.date = new Date(+answer.date);
            answer.photos = photos.rows;
            return answer;
          }))))
        .then((results) => {
          const result = {};
          result.question = question_id;
          result.page = req.query.page ? req.query.page - 1 : 0;
          result.count = count;
          result.results = results;
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    },
  },
};

module.exports = funcs;
