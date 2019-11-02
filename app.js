require('./models/RecordModel');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
  if(err)
      console.error("Error connecting to the Db: " + err.message);
  else
    console.log("Connected to the Db");
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send({ code: -404, msg: "Not found" });
});

// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500).send({ code: -500, msg: "Internal Server Error: " + err.message });
});

module.exports = app;
