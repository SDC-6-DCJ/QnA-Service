require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = process.env.PORT;

// MIDDLE WARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

module.exports = app.listen(port);
console.log(`LISTENING AT PORT: ${port}`);
