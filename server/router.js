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

module.exports = router;
