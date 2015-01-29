var models  = require('../models');
var express = require('express');
var youtube = require('youtube-api');
var router  = express.Router();
// Perform a search on youtube based on a keyword
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
});
module.exports = router;