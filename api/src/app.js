var logger = require('morgan');
var express = require('express');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
require('./database')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', indexRouter);

module.exports = app;
