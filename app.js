var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require("node-fetch");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const array_weather_fetched = [];

const fetchWeatherAPI = (array_weather_fetched) => {
  fetch('https://danepubliczne.imgw.pl/api/data/synop/id/12600')
    .then(res => res.json()).then(result => {
      if(!app.locals.weather_history)
        app.locals.weather_history = [];

      let _date = `${result.data_pomiaru} ${result.godzina_pomiaru}:00`;
      console.log(_date);
      app.locals.weather_history.push({date: _date, temp: result.temperatura});
      console.log(app.locals.weather_history);
    });
}

fetchWeatherAPI(array_weather_fetched);
setInterval(() => {
  fetchWeatherAPI(array_weather_fetched);
}, 1000 * 60 * 60);

module.exports = app;
