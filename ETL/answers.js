/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const TransformStream = require('stream').Transform;

const { int, string, bool } = require('./parse.js');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'question_id', title: 'question_id' },
    { id: 'body', title: 'body' },
    { id: 'date', title: 'date' },
    { id: 'answerer_name', title: 'answerer_name' },
    { id: 'answerer_email', title: 'answerer_email' },
    { id: 'reported', title: 'reportd' },
    { id: 'helpful', title: 'helpful' },
  ],
});

const inputPath = path.join(__dirname, '/../src/answers.csv');
const outputPath = path.join(__dirname, '/../src/cleanAnswers.csv');

const fix = ({
  id, question_id, body, date, answerer_name, answerer_email, reported, helpful,
}) => ({
  id: int(id), // To INT
  question_id: int(question_id), // To INT
  body: string(body),
  date: int(date),
  answerer_name: string(answerer_name),
  answerer_email: string(answerer_email),
  reported: bool(reported),
  helpful: int(helpful),
});

const transformer = new TransformStream({ objectMode: true });
transformer._transform = (chunk, encoding, cb) => {
  let fixed = fix(chunk);
  fixed = csvStringifier.stringifyRecords([fixed]);

  fixed = fixed.split(',');
  fixed[2] = fixed[2][0] === '"' ? fixed[2] : `"${fixed[2]}"`;
  fixed[4] = fixed[4][0] === '"' ? fixed[4] : `"${fixed[4]}"`;
  fixed[5] = fixed[5][0] === '"' ? fixed[5] : `"${fixed[5]}"`;

  cb(null, fixed.join(','));
};

const readStream = fs.createReadStream(inputPath).pipe(csv());
const writeStream = fs.createWriteStream(outputPath);

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(transformer)
  .pipe(writeStream);
