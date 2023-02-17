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
        .then((data) => Promise.all(data.rows.map((question) => model.a.getAll(question.id)
          .then((answers) => Promise.all(answers.rows.map((answer) => model.p.getAll(answer.id)
            .then((photos) => {
              answer.photos = photos.rows;
              return answer;
            }))))
          .then((answers) => {
            question.answers = answers;
            return question;
          }))))
        .then((results) => {
          console.log('results', results);
          res.status(666).json(results);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    },
  },
  a: {

  },
  p: {

  },
};

module.exports = funcs;
