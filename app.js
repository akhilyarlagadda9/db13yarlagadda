var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

var player = require("./models/player");
var resourceRouter = require('./routes/resource');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playersRouter = require('./routes/players');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');


let reseed = true;
if (reseed) { recreateDB(); }

// We can seed the collection if needed on 
async function recreateDB() {
  // Delete everything 
  await player.deleteMany();

  let instance1 = new player({ Player_name: "Yuvraj Singh", Batting_style: 'Left-Handed', Purchased_cost: 1000 });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  let instance2 = new player({ Player_name: "MS Dhoni", Batting_style: 'Right-Handed', Purchased_cost: 2000 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  let instance3 = new player({ Player_name: "Sachin", Batting_style: 'Right-Handed', Purchased_cost: 3000 });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playersRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/', resourceRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

