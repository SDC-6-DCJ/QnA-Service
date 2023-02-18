/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const TransformStream = require('stream').Transform;

const { int, string, bool } = require('../parse.js');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'question_id', title: 'question_id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'question_body', title: 'question_body' },
    { id: 'question_date', title: 'question_date' },
    { id: 'asker_name', title: 'asker_name' },
    { id: 'asker_email', title: 'asker_email' },
    { id: 'reported', title: 'reported' },
    { id: 'question_helpfulness', title: 'question_helpfulness' }],
});

const inputPath = path.join(__dirname, '/../src/questions.csv');
const outputPath = path.join(__dirname, '/../src/cleanQuestions.csv');

const fix = ({
  question_id,
  product_id,
  question_body,
  question_date,
  asker_name,
  asker_email,
  reported,
  question_helpfulness,
}) => ({
  question_id: int(question_id), // To INT
  product_id: int(product_id), // To INT
  question_body: string(question_body),
  question_date: int(question_date),
  asker_name: string(asker_name),
  asker_email: string(asker_email),
  reported: bool(reported),
  question_helpfulness: int(question_helpfulness),
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

const readStream = fs.createReadStream(inputPath)
  .pipe(csv());
const writeStream = fs.createWriteStream(outputPath);

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(transformer)
  .pipe(writeStream);
