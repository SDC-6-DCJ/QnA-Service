const fs = require('fs');
const csv = require('csv-stream');
const through2 = require('through2');

module.exports = (path, keySet, saveFunc,  callback) => {
  const stream = fs.createReadStream(path)
    .pipe(csv.createStream({
      endline: '\n',
      columns: keySet,
      escapeChar : '"',
      enclosedChar : '"',
    }))
    .pipe(through2({ objectMode: true }, (row, enc, cb) => {
      saveFunc(row)
        .then(() => {
          console.log(row)
          cb(null, true);
        })
        .catch((err) => {
          cb(err, null);
          callback(err);
        });
    }))
    .on('data', () => {

    })
    .on('end', () => {
      console.log('fin');
    })
    .on('error', (err) => {
      console.error(err);
    })
};