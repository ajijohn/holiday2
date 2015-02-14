// Load service strategy modules to use with passport
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Load authentication variables
var auth = require('./auth.js');

module.exports = function(passport,google2) {
	// serialize the user to the session 
	passport.serializeUser(function(user,done){
		done(null,user);
	});
	// deserialize the user to the session
	passport.deserializeUser(function(obj,done){
		done(null,obj);
	});
	// FB
	// Login config
	passport.use(new FacebookStrategy({
		clientID: 	  auth.facebook.api_key,
		clientSecret: auth.facebook.api_secret,
		callbackURL:  auth.facebook.callback_url
	},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				return done(null, profile);
			});
		}
	));
	// Google
	// Login config
	passport.use(new GoogleStrategy({
		clientID: 	  auth.google.clientID,
 		clientSecret: auth.google.clientSecret,
		callbackURL:  auth.google.callbackURL
	},
		function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function () {
	    		return done(null, profile);
    		});
	  	}
	));
}