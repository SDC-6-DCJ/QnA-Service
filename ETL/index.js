const fs = require('fs').promises;
const path = require('path');
const load = require('./load.js');

const data = {
  photos: path.join(__dirname, '/../src/answers_photos.csv'),
  answers1: path.join(__dirname, '/../src/answers1.csv'),
  answers2: path.join(__dirname, '/../src/answers2.csv'),
  questions: path.join(__dirname, '/../src/questions.csv'),
};

const keys = {
  answers: ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful'],
}

const badData = {
  photos: [],
  answers1: [],
  answers2: [],
  questions: [],
};

const saveFunc = (row) => new Promise((res) => setTimeout(() => res(), 50))

load(data.answers1, keys.answers, saveFunc, (err, good) => {
  if (err) {
    console.log('ERROR', err)
    answers1.push(err)
  }
});