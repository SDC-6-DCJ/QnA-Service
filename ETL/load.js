require('dotenv').config();
const { Client } = require('pg');
const path = require('path');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => client.query(`COPY questions(question_id,product_id,question_body,question_date,asker_name,asker_email,reported,question_helpfulness) FROM '${path.join(__dirname, '/../src/cleanQuestions.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => client.query(`COPY answers(id,question_id,body,date,answerer_name,answerer_email,reported,helpfulness) FROM '${path.join(__dirname, '/../src/cleanAnswers.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => client.query(`COPY photos(id,answer_id,url) FROM '${path.join(__dirname, '/../src/cleanPhotos.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => client.query('SELECT setval(\'questions_question_id_seq\', (SELECT MAX(question_id) from "questions"))'))
  .then(() => client.query('SELECT setval(\'answers_id_seq\', (SELECT MAX(id) from "answers"))'))
  .then(() => client.query('SELECT setval(\'photos_id_seq\', (SELECT MAX(id) from "photos"))'))
  .then(() => console.log('LOAD COMPLETE'))
  .then(() => client.end());
