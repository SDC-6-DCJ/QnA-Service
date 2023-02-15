const answersKeys = ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful']

module.exports = {
  answers: (data) => {
    data = data.toString().split('\n');
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      let curr = data[i].split(',')
      for (let j = 0; j < curr.length; j++) {
        obj[answersKeys[j]] = curr[j];
      }
      data[i] = obj;
    }
    return data;
  }
};