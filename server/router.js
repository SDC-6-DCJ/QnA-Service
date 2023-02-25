const router = require('express').Router();
const path = require('path');
const controller = require('./controller');

router.get('/', (req, res) => {
  const json = {
    hello: 'world',
  };
  res.status(200).json(json);
});

router.get('/loaderio-048394e26585e765f2194726b5e97b61.txt', (req, res) => {
  res.sendFile(path.join(__dirname, './loaderToken.txt'));
});

// QUESTIONS
router.get('/questions', controller.q.getQuestions);
router.post('/questions', controller.q.postQuestion);
router.put('/questions/:question_id/helpful', controller.q.helpful);
router.put('/questions/:question_id/report', controller.q.report);

// ANSWERS
router.get('/questions/:question_id/answers', controller.a.getAnswers);
router.post('/questions/:question_id/answers', controller.a.postAnswer);
router.put('/answers/:answer_id/helpful', controller.a.helpful);
router.put('/answers/:answer_id/report', controller.a.report);

module.exports = router;
