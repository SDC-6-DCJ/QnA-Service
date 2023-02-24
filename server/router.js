const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const controller = require('./controller');

router.get('/', (req, res) => {
  const json = {
    hello: 'world',
  };
  res.status(200).json(json);
});

router.get('/loaderio-9e2674caf5773afa6c32e4719433a0d0.txt', (req, res) => {
  fs.readFile(path.join(__dirname, './loaderToken'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
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
