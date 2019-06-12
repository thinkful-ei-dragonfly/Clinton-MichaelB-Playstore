/* eslint-disable strict */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = require('./app');

app.use(cors());
app.use(morgan('dev'));

app.listen(8000, () => console.log('server listening on 8000'));
