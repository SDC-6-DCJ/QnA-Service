/* eslint-disable no-console */
/* eslint-disable camelcase */
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  user: 'yandlier',
  host: 'localhost',
  database: 'qna',
  password: '',
  port: 5432, // the default port for PostgreSQL
});

// FILES
const data = {
  photos: path.join(__dirname, '/../src/answers_photos.csv'),
  answers1: path.join(__dirname, '/../src/answers1.csv'),
  answers2: path.join(__dirname, '/../src/answers2.csv'),
  questions: path.join(__dirname, '/../src/questions.csv'),
};

// CREATE TABLESE
const tablesSql = fs.readFileSync(path.join(__dirname, '/../sql/tables.sql'), 'utf8');
client.query(tablesSql);

// CLEANED ROWS
const questions = fs.readFileSync(data.questions, 'utf8')
  .trim() // Removes Whtie Space
  .split('\n') // Splits on new lines
  .map((line) => line.split(',')) // Splits each line into arrays
  .map(([id, product_id, body, date, asker_name, asker_email, reported, helpful]) => ({
    id: +id, // To INT
    product_id: +product_id, // To INT
    body,
    date,
    asker_name,
    asker_email,
    reported: !!+reported, // To BOOL
    helpful: +helpful, // To INT
  }));
console.log('QUESTIONS TRANSFORMED');
const answers1 = fs.readFileSync(data.answers1, 'utf8')
  .trim() // Removes Whtie Space
  .split('\n') // Splits on new lines
  .map((line) => line.split(',')) // Splits each line into arrays
  .map(([id, question_id, body, date, answerer_name, answerer_email, reported, helpful]) => ({
    id: +id, // To INT
    question_id: +question_id, // To INT
    body,
    date,
    answerer_name,
    answerer_email,
    reported: !!+reported, // To BOOL
    helpful: +helpful, // To INT
  }));
console.log('ANSWERS1 TRANSFORMED');
const answers2 = fs.readFileSync(data.answers2, 'utf8')
  .trim() // Removes Whtie Space
  .split('\n') // Splits on new lines
  .map((line) => line.split(',')) // Splits each line into arrays
  .map(([id, question_id, body, date, answerer_name, answerer_email, reported, helpful]) => ({
    id: +id, // To INT
    question_id: +question_id, // To INT
    body,
    date,
    answerer_name,
    answerer_email,
    reported: !!+reported, // To BOOL
    helpful: +helpful, // To INT
  }));
console.log('ANSWERS2 TRANSFORMED');
const photos = fs.readFileSync(data.photos, 'utf8')
  .trim() // Removes Whtie Space
  .split('\n') // Splits on new lines
  .map((line) => line.split(',')) // Splits each line into arrays
  .map(([id, answer_id, url]) => ({
    id: +id, // To INT
    answer_id: +answer_id, // To INT
    url,
  }));
console.log('PHOTOS TRANSFORMED');

// PROMISE ARRAYS
const promises = {
  questions: questions.map((row) => {
    const sql = 'INSERT INTO questions (id, product_id, body, date, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    return client.query(sql, [
      row.id,
      row.product_id,
      row.body,
      row.date,
      row.asker_name,
      row.asker_email,
      row.reported,
      row.helpful,
    ])
      .catch((err) => console.error('HEY', err));
  }),
  answers1: answers1.map((row) => {
    const sql = `INSERT INTO answers(id, question_id, body, date, answerer_name, answerer_email, reported, helpful)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    return client.query(sql, [
      row.id,
      row.question_id,
      row.body,
      row.date,
      row.answerer_name,
      row.answerer_email,
      row.reported,
      row.helpful,
    ]);
  }),
  answers2: answers2.map((row) => {
    const sql = `INSERT INTO answers(id, question_id, body, date, answerer_name, answerer_email, reported, helpful)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    return client.query(sql, [
      row.id,
      row.question_id,
      row.body,
      row.date,
      row.answerer_name,
      row.answerer_email,
      row.reported,
      row.helpful,
    ]);
  }),
  photos: photos.map((row) => {
    const sql = `INSERT INTO answers(id, answer_id, url)
                 VALUES ($1, $2, $3)`;
    return client.query(sql, [
      row.id,
      row.answer_id,
      row.url,
    ]);
  }),
};

// It's all coming together
client.connect()
  .then(() => Promise.all(promises.questions.slice(2000000)))
  .then(() => Promise.all(promises.questions.slice(0, 2000000)))
  .then(() => Promise.all(promises.answers1.slice(2000000)))
  .then(() => Promise.all(promises.answers1.slice(0, 2000000)))
  .then(() => Promise.all(promises.answers2.slice(2000000)))
  .then(() => Promise.all(promises.answers2.slice(0, 2000000)))
  .then(() => Promise.all(promises.photos.slice(2000000)))
  .then(() => Promise.all(promises.photos.slice(0, 2000000)))
  .then(() => console.log('ETL complete'))
  .catch((err) => {
    client.end();
    console.error('ETL Incomplete: ', err);
  })
  .then(() => client.end());
