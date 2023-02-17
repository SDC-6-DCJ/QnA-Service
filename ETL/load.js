const { Client } = require('pg');
const path = require('path');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'qna',
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => client.query(`COPY questions(id,product_id,body,date,asker_name,asker_email,reported,helpful) FROM '${path.join(__dirname, '/../src/cleanQuestions.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => client.query(`COPY answers(id,question_id,body,date,answerer_name,answerer_email,reported,helpful) FROM '${path.join(__dirname, '/../src/cleanAnswers.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => client.query(`COPY photos(id,answer_id,url) FROM '${path.join(__dirname, '/../src/cleanPhotos.csv')}' DELIMITER ',' CSV HEADER`))
  .then(() => console.log('LOAD COMPLETE'))
  .then(() => client.end());
