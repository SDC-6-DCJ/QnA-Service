/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const transformStream = require('stream').Transform;

const { int, string, bool } = require('./parse.js');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'body', title: 'body' },
    { id: 'date', title: 'date' },
    { id: 'asker_name', title: 'asker_name' },
    { id: 'asker_email', title: 'asker_email' },
    { id: 'reported', title: 'reportd' },
    { id: 'helpful', title: 'helpful' }],
});

const inputPath = path.join(__dirname, '/../src/questions.csv');
const outputPath = path.join(__dirname, '/../src/cleanQuestions.csv');

const fix = ({
  id, product_id, body, date, asker_name, asker_email, reported, helpful,
}) => ({
  id: int(id), // To INT
  product_id: int(product_id), // To INT
  body: string(body),
  date: string(date),
  asker_name: string(asker_name),
  asker_email: string(asker_email),
  reported: bool(reported),
  helpful: int(helpful),
});

const transformer = new transformStream({ objectMode: true });
transformer._transform = (chunk, encoding, cb) => {
  let fixed = fix(chunk);
  fixed = csvStringifier.stringifyRecords([fixed]);
  cb(null, fixed);
};

const readStream = fs.createReadStream(inputPath)
  .pipe(csv());
const writeStream = fs.createWriteStream(outputPath);

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(transformer)
  .pipe(writeStream);
