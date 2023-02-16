const fs = require('fs').promises;
const path = require('path');
const load = require('./load.js');
const schema = require('../tables.js')

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('qna', 'yandlier', '', {
  host: 'localhost',
  dialect: 'postgres',
});

const Questions = sequelize.define('questions', schema.Questions, { timestamps: false })
const Answers = sequelize.define('answers', schema.Answers, { timestamps: false })
const Photos = sequelize.define('photos', schema.Photos, { timestamps: false })

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

sequelize.sync()
  // .then(() => {
  //   load(data.photos, keys.photos, Photos.create.bind(Photos), (err, good) => {
  //     if (err) {
  //       console.log('ERROR', err)
  //       badData.photos.push(err)
  //     }
  //   });
  // })
  // .then(() => {
  //   load(data.asnwers1, keys.answers, Answers.create.bind(Answers), (err, good) => {
  //     if (err) {
  //       console.log('ERROR', err)
  //       badData.answers1.push(err)
  //     }
  //   });
  // })
  // .then(() => {
  //   load(data.asnwers2, keys.answers, Answers.create.bind(Answers), (err, good) => {
  //     if (err) {
  //       console.log('ERROR', err)
  //       badData.answers2.push(err)
  //     }
  //   });
  // })
  // .then(() => {
  //   load(data.questions, keys.questions, Questions.create.bind(Questions), (err, good) => {
  //     if (err) {
  //       console.log('ERROR', err)
  //       badData.questions.push(err)
  //     }
  //   });
  // });
