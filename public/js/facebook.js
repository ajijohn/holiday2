$(function () {	
 window.fbAsyncInit = function() {
        FB.init({
          appId      : '742562262460197',
          xfbml      : true,
          version    : 'v2.1'
        });

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;

FB.api(
    "/v1.0/me",
    function (response) {
      if (response && !response.error) {
        $('#fb-user').html(response.name);
      }
    }
);

  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
  } else {
    // the user isn't logged in to Facebook.
  }
 });

      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
});
