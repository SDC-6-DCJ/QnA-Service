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

// ANSWERS
router.get('/questions/:question_id/answers', controller.a.getAnswers);

module.exports = router;
