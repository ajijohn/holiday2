// Load the FB strategy module to use with passport
var FacebookStrategy = require('passport-facebook').Strategy;
// Load authentication variables
var auth = require('./auth.js');

module.exports = function(passport) {
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
}