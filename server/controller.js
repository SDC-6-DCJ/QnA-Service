/* eslint-disable no-param-reassign */
const model = require('./model.js');
const { int } = require('../parse.js');

const funcs = {
  q: {
    getQuestions: (req, res) => {
      let { product_id, page, count } = req.query;

      if (!product_id) res.status(400).json({ error: 'please supply a product_id' });
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
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    },
    postQuestion: (req, res) => {
      console.log(req.body)
      if (!req.body.product_id) res.status(400).json({ error: 'please supply a product_id' });
      model.q.insert(req.body)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    },
    helpful: (req, res) => {
      if (!req.params.question_id) res.status(400).json({ error: 'please supply a question_id' });
      model.q.putHelpful(req.params.question_id)
        .then(() => res.sendStatus(204))
        .catch((err) => {
          console.error(err);
          console.status(500).json(err);
        });
    },
    report: (req, res) => {
      if (!req.params.question_id) res.status(400).json({ error: 'please supply a question_id' });
      model.q.report(req.params.question_id)
        .then(() => res.sendStatus(204))
        .catch((err) => {
          console.error(err);
          console.status(500).json(err);
        });
    },
  },
  a: {
    getAnswers: (req, res) => {
      const question_id = int(req.params.question_id);
      let { page, count } = req.query;

      if (!question_id) res.status(400).json({ error: 'please supply a question_id' });
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
    postAnswer: (req, res) => {
      if (!req.params.question_id) res.status(400).json({ error: 'please supply a question_id' });
      req.body.question_id = req.params.question_id;
      model.a.insert(req.body)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    },
    helpful: (req, res) => {
      if (!req.params.answer_id) res.status(400).json({ error: 'please supply a answer_id' });
      model.a.putHelpful(req.params.answer_id)
        .then(() => res.sendStatus(204))
        .catch((err) => {
          console.error(err);
          console.status(500).json(err);
        });
    },
    report: (req, res) => {
      if (!req.params.answer_id) res.status(400).json({ error: 'please supply a answer_id' });
      model.a.report(req.params.answer_id)
        .then(() => res.sendStatus(204))
        .catch((err) => {
          console.error(err);
          console.status(500).json(err);
        });
    },
  },
};

module.exports = funcs;
