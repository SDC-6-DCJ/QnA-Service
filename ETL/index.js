const fs = require('fs').promises;
const path = require('path');
const load = require('./load.js');
const schema = require('../tables.js')

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Questions = sequelize.define('questions', schema.Questions)
const Answers = sequelize.define('answers', schema.Answers)
const Photos = sequelize.define('photos', schema.Photos)

const data = {
  photos: path.join(__dirname, '/../src/answers_photos.csv'),
  answers1: path.join(__dirname, '/../src/answers1.csv'),
  answers2: path.join(__dirname, '/../src/answers2.csv'),
  questions: path.join(__dirname, '/../src/questions.csv'),
};

const keys = {
  answers: ['id', 'question_id', 'body', 'date', 'answerer_name', 'answerer_email', 'reported', 'helpful'],
  questions: ['id', 'product_id', 'body', 'date', 'asker_name', 'asker_email', 'reported', 'helpful'],
  photos: ['id', 'answer_id', 'url'],
}

const badData = {
  photos: [],
  answers1: [],
  answers2: [],
  questions: [],
};

// const saveFunc = (row) => new Promise((res) => setTimeout(() => res(), 50))

// load(data.answers1, keys.answers, saveFunc, (err, good) => {
//   if (err) {
//     console.log('ERROR', err)
//     badData.answers1.push(err)
//   }
// );
