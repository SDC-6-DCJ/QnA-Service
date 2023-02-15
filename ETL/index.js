const fs = require('fs').promises;
const path = require('path');
const parse = require('./parse.js');

const data = {
  photos: path.join(__dirname, '/../src/answers_photos.csv'),
  answers1: path.join(__dirname, '/../src/answers1.csv'),
  answers2: path.join(__dirname, '/../src/answers2.csv'),
  questions: path.join(__dirname, '/../src/questions.csv'),
};

const badData = {
  photos: [],
  answers1: [],
  answers2: [],
  questions: [],
};

fs.readFile(data.answers1)
  .then(results => parse.answers(results))
  .then(results => console.log(results[0]))