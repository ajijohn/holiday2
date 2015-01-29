// These is how we call the modules we are going to use in this app
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var config = require('./auth.js');
// Expres 4 new dependencies
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Engine for templating
var engine = require('ejs-locals');
// User defined routes
var routes = require('./routes/index');
var users  = require('./routes/users');
var search  = require('./routes/searcho');
var youtube  = require('./routes/youtube');
var loginGoogle  = require('./routes/loginGoogle');
var loginFacebook  = require('./routes/loginFacebook');
// Passport modules to login w/ different services
var passport = require('passport')
, GoogleStrategy = require('passport-google').Strategy
, FacebookStrategy = require('passport-facebook').Strategy
, app = express();


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

// serialize and deserialize
passport.serializeUser(function(user,done){
	done(null,user);
});
passport.deserializeUser(function(obj,done){
	done(null,obj);
});

//config
passport.use(new FacebookStrategy({
  clientID: config.facebook.api_key,
  clientSecret: config.facebook.api_secret,
  callbackURL: config.facebook.callback_url
},
function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		return done(null, profile);
	});
	}
));

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Read more: http://jaspreetchahal.org/expressjs-exposing-variables-and-session-to-jade-templates/#ixzz3JtjwuHno
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/search', search);
app.use('/youtube', youtube);

//app.use('/loginGoogle', loginGoogle);
//app.use('/auth/facebook', loginFacebook);

app.get('/auth/facebook',
	passport.authenticate('facebook'),
		function(req, res){
});

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { 
		failureRedirect: '/' }),
		function(req, res) {
			res.redirect('/');
		});
		
app.get('/logout', function(req, res){
  req.logout();
  setTimeout(function() {
    res.redirect('/');
  }, 2000);
});


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
