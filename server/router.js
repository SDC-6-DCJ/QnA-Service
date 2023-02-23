const router = require('express').Router();
const fs = require('fs');
const controller = require('./controller');

router.get('/', (req, res) => {
  const json = {
    hello: 'world',
  };
  res.status(200).json(json);
});

router.get('/loaderio-ef6453b814f1bba8194a12a2c967b47e.txt', (req, res) => {
  fs.readFile('../loaderio-ef6453b814f1bba8194a12a2c967b47e.txt', 'utf8', (err, data) => {
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
