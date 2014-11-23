var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var routes = require('./routes/index');
var users  = require('./routes/users');
var search  = require('./routes/searcho');
var youtube  = require('./routes/youtube');
var loginGoogle  = require('./routes/loginGoogle');
var loginFacebook  = require('./routes/loginFacebook');


var passport = require('passport')
, GoogleStrategy = require('passport-google').Strategy
, FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '742562262460197';
var FACEBOOK_APP_SECRET = '38e76e28438e07867f7c95795a18e0c2';

//passport
passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:3000/login/return',
  realm: 'http://localhost:3000/'
},
function(identifier, profile, done) {
  User.findOrCreate({ openId: identifier }, function(err, user) {
    done(err, user);
  });
}
));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ openId: identifier }, function(err, user) {
    done(err, user);
  });
}
));


var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.locals.config = {
                   name: 'Jaspreet Chahal',
                   phone: '61-3-98989898',
                   email: 'jaspreet@email.tld'
            };

//Read more: http://jaspreetchahal.org/expressjs-exposing-variables-and-session-to-jade-templates/#ixzz3JtjwuHno
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/search', search);
app.use('/youtube', youtube);

//app.use('/loginGoogle', loginGoogle);
app.use('/loginFacebook', loginFacebook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
