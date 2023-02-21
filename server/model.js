require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});
client.connect();

const funcs = {
  q: {
    getAll: (p_id, count, offset) => {
      const sql = `SELECT question_id,question_body,question_date,asker_name,reported,question_helpfulness
                   FROM questions
                   WHERE product_id = $1
                   AND reported = ${false}
                   ORDER BY question_helpfulness DESC, question_id ASC
                   LIMIT $2 OFFSET $3`;
      return client.query(sql, [p_id, count, offset]);
    },
    insert: ({
      product_id, name, email, body,
    }) => {
      const sql = `INSERT INTO
                  questions (product_id, question_body, question_date, asker_email, asker_name, reported, question_helpfulness)
                  values ($1, $2, $3, $4, $5, $6, $7)`;
                  console.log([product_id, body, Date.now(), email, name, false, 0])
      return client.query(sql, [product_id, body, Date.now(), email, name, false, 0]);
    },
    putHelpful: (question_id) => {
      const sql = `UPDATE questions
                   SET question_helpfulness = question_helpfulness + 1
                   WHERE question_id = $1`;
      return client.query(sql, [question_id]);
    },
    report: (question_id) => {
      const sql = `UPDATE questions
                   SET reported = ${true}
                   WHERE question_id = $1`;
      return client.query(sql, [question_id]);
    },
  },
  a: {
    getAll: (q_id, count, offset) => {
      const sql = `SELECT id, body, date, answerer_name, reported, helpfulness
                   FROM answers
                   WHERE question_id = $1
                   AND reported = ${false}
                   ORDER BY helpfulness DESC, id ASC
                   LIMIT $2 OFFSET $3`;
      return client.query(sql, [q_id, count, offset]);
    },
    insert: ({
      question_id, name, email, body, photos,
    }) => {
        const sql = `INSERT INTO
                   answers (question_id, body, date, answerer_email, answerer_name, reported, helpfulness)
                   values ($1, $2, $3, $4, $5, $6, $7)`;
        return client.query(sql, [question_id, body, Date.now(), email, name, false, 0])
          .then(() => Promise.all(photos.map((photo) => funcs.p.insert({
            answer_id: maxId,
            url: photo,
          }))));
      },
    putHelpful: (id) => {
      const sql = `UPDATE answers
                     SET helpfulness = helpfulness + 1
                     WHERE id = $1`;
      return client.query(sql, [id]);
    },
    report: (id) => {
      const sql = `UPDATE answers
                   SET reported = ${true}
                   WHERE id = $1`;
      return client.query(sql, [id]);
    },
  },
  p: {
    getAll: (q_id) => {
      const sql = `SELECT id, url
                   FROM photos
                   WHERE answer_id = $1`;
      return client.query(sql, [q_id]);
    },
    insert: ({
      answer_id, url,
    }) => {
        const maxId = data.rows[0].max + 1;
        const sql = `INSERT INTO
                  photos (answer_id, url)
                  values ($1, $2)`;
        return client.query(sql, [answer_id, url]);
      },
  },
};

module.exports = funcs;
