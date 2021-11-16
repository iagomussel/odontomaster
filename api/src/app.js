//var logger = require('morgan');

require('dotenv').config();
var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', indexRouter);

module.exports = app;
