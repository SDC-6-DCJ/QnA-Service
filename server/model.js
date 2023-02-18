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

module.exports = {
  q: {
    getAll: (p_id, count, offset) => {
      const sql = `SELECT * FROM questions
                   WHERE product_id = $1
                   AND reported = ${false}
                   ORDER BY question_helpfulness DESC, question_id ASC
                   LIMIT $2 OFFSET $3`;
      return client.query(sql, [p_id, count, offset]);
    },
  },
  a: {
    getAll: (q_id, count, offset) => {
      const sql = `SELECT * FROM answers
                   WHERE question_id = $1
                   AND reported = ${false}
                   ORDER BY helpfulness DESC, id ASC
                   LIMIT $2 OFFSET $3`;
      return client.query(sql, [q_id, count, offset]);
    },
  },
  p: {
    getAll: (q_id) => {
      const sql = `SELECT * FROM photos
                   WHERE answer_id = $1`;
      return client.query(sql, [q_id]);
    },
  },
};
