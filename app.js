var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore= require('connect-mongo')(session);

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/celebrities', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

var app = express();

// session middleware
app.use(session({
  secret: 'celebs session data',
  cookie: {
    maxAge: 3600000
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost/celebrities',
    ttl: 24 *3600
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
var celebritiesRouter = require('./routes/celebrities');
var moviesRouter = require('./routes/movies');
const usersRoutes = require('./routes/users');

app.use('/', indexRouter);
app.use('/celebrities', celebritiesRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRoutes);

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

module.exports = app;
