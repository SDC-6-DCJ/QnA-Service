/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'yandlier',
  host: 'localhost',
  database: 'qna',
  password: '',
  port: 5432, // the default port for PostgreSQL
});

module.exports = {
  query: (query, sql) => client.query(query, sql)
    .catch((err) => console.error('HEY', err)),
};
