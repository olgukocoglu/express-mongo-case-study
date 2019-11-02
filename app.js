require('./models/RecordModel');

const createError = require('http-errors');
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
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
