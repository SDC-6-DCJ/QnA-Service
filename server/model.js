require('dotenv').config();
const { Pool } = require('pg');

const client = new Pool({
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
      const sql = `SELECT id, body, date, answerer_name, reported, helpfulness, photos
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
      const parsedPhotos = [];
      for (let i = 0; i < photos.length; i++) {
        parsedPhotos.push({
          id: i + 1,
          url: photos[i],
        });
      }
      const sql = `INSERT INTO
                     answers (question_id, body, date, answerer_email, answerer_name, reported, helpfulness, photos)
                     values ($1, $2, $3, $4, $5, $6, $7, $8)`;
      return client.query(sql, [
        question_id,
        body,
        Date.now(),
        email,
        name,
        false,
        0,
        JSON.stringify(parsedPhotos),
      ]);
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
};

module.exports = funcs;
