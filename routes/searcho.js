var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Twit = require('twit');



//Twitter
var T = new Twit({
    consumer_key:         'h3aJE3VF1JuqSfBaCjgptG2VO'
  , consumer_secret:      'bj5zPTriUCDQldRAKKofRHxOoHe45qLmWGUbpjkSKdvr1r8Aqa'
  , access_token:         '33286432-cUuOz2w2ef3sjEzHQpvAs1yt7blJnNwzqDe5nhc2i'
  , access_token_secret:  'a4gzZzHzLlUHpdXNrxDJNIf5x6SUFiSFEGQIrWn4ZaFEB'
})

//Spotify

var SpotifyWebApi = require('spotify-web-api-node');

//credentials are optional
var spotifyApi = new SpotifyWebApi({
clientId : '3c48fc62616e4b749b52616929c2e926',
clientSecret : '93ca31fa195149b086358af8d5b36072',
redirectUri : ''
});

router.get('/', function(req, res) {
	  
	
	models.User.findAll({
	    include: [ models.Task ]
	  }).success(function(users) {
	    res.render('searcho', {
	      title: 'Express',
	      users: users
	    });
	  });
	  
	  
	});


router.get('/twitter', function(req, res) {
	  
	console.log("searched for  " + req.query[0])
	
	var querystring = req.query;
	console.log("searched for 1  " + querystring["holiday"]);
	
	var searchedfor = querystring["holiday"];

	
	T.get('search/tweets', { q: searchedfor + ' since:2014-11-11', count: 10 }, function(err, data, response) {
		
		 var tweets = data.statuses;
		  console.log("output " + tweets[0].text)
		  
		  res.render('searcho', {
		      searched: searchedfor,
		      feed: tweets
		    });
		  
		  
		})
	  
	});

router.get('/spotify/:searched', function(req, res) {
	  
	// Search tracks whose name, album or artist contains 'Love'
	
	//console.log("searched for spotify  " + searchedfor);
	var searched = req.param('searched');
	
	spotifyApi.searchTracks(searched)
	  .then(function(data) {
	    console.log('Search by "Love"', data.tracks.items[0]);
	    
	    res.json(data);
	    
	  }, function(err) {
	    console.error(err);
	  });
	  
	});


module.exports = router;
