/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
$(function() {
    var video;
    var playlist;
    for( i=0 ;i< youtubeFeed.length ;i++) {
        if (i===0) {
            video=youtubeFeed[i].id.videoId;
        }
        if (i!==0) {
            if(i===1){
                playlist=youtubeFeed[i].id.videoId;
            }
            else {
                playlist+=','+youtubeFeed[i].id.videoId;
            }
        }
        $("#container").append('<iframe src="http://www.youtube.com/embed/<%= video%>" frameborder="0" height="386" width="638"></iframe>');
    }
});
*/