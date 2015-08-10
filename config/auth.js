var ids= {
    facebook : {
        "api_key" : "",
        "api_secret" : "",
        "callback_url" : "http://localhost:3000/auth/facebook/callback"
    }
    ,
    google : {
    	"clientID" : "",
    	"clientSecret" : "",
    	"callbackURL" : "http://localhost:3000/auth/google/callback",
    	"realm" : "http://localhost:3000"
    }
};

module.exports=ids;
