/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const TransformStream = require('stream').Transform;

const { int, string } = require('../parse.js');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'answer_id', title: 'answer_id' },
    { id: 'url', title: 'url' }],
});

const inputPath = path.join(__dirname, '/../src/photos.csv');
const outputPath = path.join(__dirname, '/../src/cleanPhotos.csv');

const fix = ({
  id, answer_id, url,
}) => ({
  id: int(id),
  answer_id: int(answer_id),
  url: string(url),
});

const transformer = new TransformStream({ objectMode: true });
transformer._transform = (chunk, encoding, cb) => {
  let fixed = fix(chunk);
  fixed = csvStringifier.stringifyRecords([fixed]);

  let commas = 0;
  for (let i = 0; i < fixed.length; i++) {
    if (fixed[i] === ',') {
      commas++;
      if (commas === 2) {
        fixed = `${`${fixed.slice(0, i + 1)}"${fixed.slice(i + 1)}`.trim()}"\n`;
        break;
      }
    }
  }

  cb(null, fixed);
};

const readStream = fs.createReadStream(inputPath)
  .pipe(csv());
const writeStream = fs.createWriteStream(outputPath);

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(transformer)
  .pipe(writeStream);
