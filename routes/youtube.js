var models  = require('../models');
var express = require('express');
var youtube = require('youtube-api');
var router  = express.Router();

router.get('/', function(req, res) {
    // Authentication required to perform the search
    youtube.authenticate({
        type: "key", 
        key: "AIzaSyA4NrP0P8ELyhx0-OmUrPHf-UlJ2gpUZUM"
    });
    // YouTube Search
    youtube.search.list({
    //youtube.playlist.list({
        q: "christmas",
        part: 'snippet'
    }, function (err,data){
        console.log(err || data);
        res.render('youtube', {
	      title: 'Express',
	      youtubeFeed: data.items
	});
    });
    // Render the HTML5 code written in the youtube.ejs
    /*models.User.findAll({
	    include: [ models.Task ]
	  }).success(function(users) {
	    res.render('youtube', {
	      title: 'Express',
	      users: users
	    });
	  });
    */  
});

router.get('/search/:keyword', function(req, res) {
    // Authentication required to perform the search
	
	var searched = req.param('keyword');
	
    youtube.authenticate({
        type: "key", 
        key: "AIzaSyA4NrP0P8ELyhx0-OmUrPHf-UlJ2gpUZUM"
    });
    // YouTube Search
    youtube.search.list({
    //youtube.playlist.list({
        q: searched,
        part: 'snippet'
    }, function (err,data){
        console.log(err || data);
        res.json(data.items);
        
    });
    // Render the HTML5 code written in the youtube.ejs
    /*models.User.findAll({
	    include: [ models.Task ]
	  }).success(function(users) {
	    res.render('youtube', {
	      title: 'Express',
	      users: users
	    });
	  });
    */  
});



module.exports = router;