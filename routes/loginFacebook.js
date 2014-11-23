var express = require('express');
var router  = express.Router();
var passport = require('passport')

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/return', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/loginFacebook' }));

module.exports = router;
