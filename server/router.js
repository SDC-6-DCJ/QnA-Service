const router = require('express').Router();
const controller = require('./controller');

router.get('/', (req, res) => {
  const json = {
    hello: 'world',
  };
  res.status(200).json(json);
});

// QUESTIONS
router.get('/questions', controller.q.getQuestions);
router.post('/questions', controller.q.postQuestion);

// ANSWERS
router.get('/questions/:question_id/answers', controller.a.getAnswers);
router.post('/questions/:question_id/answers', controller.a.postAnswer);

// DEV
router.post('/dev/postQ', (req, res) => {
  req.body = {
    body: 'Hey does this work?',
    name: 'GOLIATH',
    email: 'Yeye@kanye.diesel',
    product_id: 942348,
  };
  controller.q.postQuestion(req, res);
});

module.exports = router;
