require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});

(async () => {
  await client.connect();
  await client.query(`COPY questions(question_id,product_id,question_body,question_date,asker_name,asker_email,reported,question_helpfulness) FROM '${path.join(__dirname, '/../src/cleanQuestions.csv')}' DELIMITER ',' CSV HEADER`);
  await client.query(`COPY answers(id,question_id,body,date,answerer_name,answerer_email,reported,helpfulness) FROM '${path.join(__dirname, '/../src/cleanAnswers.csv')}' DELIMITER ',' CSV HEADER`);
  await client.query('UPDATE answers SET photos = COALESCE(photos, \'[]\'::JSONB)');
  await fs.createReadStream(`${path.join(__dirname, '/../src/cleanPhotos.csv')}`)
    .pipe(csv())
    .on('data', (data) => {
      client.query(`UPDATE answers SET photos = photos || '{"id": ${data.id}, "url": "${data.url}"}'::JSONB WHERE id=${data.answer_id}`);
    })
    .on('end', async () => {
      await client.query('SELECT setval(\'questions_question_id_seq\', (SELECT MAX(question_id) from "questions"))');
      await client.query('SELECT setval(\'answers_id_seq\', (SELECT MAX(id) from "answers"))');
      await console.log('LOAD COMPLETE');
      await client.end();
    });
})();
