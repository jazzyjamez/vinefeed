var socket = io.connect('http://localhost');


//$(document).ready(function() { 

var socket = io.connect('http://localhost');

// initialize by finding all vine things
socket.on('connect', function() {
  socket.emit('track', { track: 'vine co v'});
});

socket.on('tweet', function (data) {
	$("<div>").append(
		$("<video id='" + data.tweet.id + "' class='video-js vjs-default-skin magnify' loop preload='auto' width='200' height='200' src='" + 
    	data.tweet.vid_url + "''></video>")
	).fadeIn("slow").css("display","inline-block").prependTo("#videos");

  _V_(String(data.tweet.id)).ready(function() {
    this.volume(0);
    this.play();
  });

  $("#" + String(data.tweet.id)).css({"width": "", "height" : ""});
  
  // mouseover in mouseover out callbacks
  $("#" + data.tweet.id).hover(function(){
    _V_(String(data.tweet.id)).volume(1);
  }, function() {
    _V_(String(data.tweet.id)).volume(0);
  });

// if ($("#videos").children().length > 8) {
// 		$("#videos div:last-child").remove();
// 	}
});

/* Updates videos based on search params */
function searchHandler()
{
  window.location.hash = $("#search").attr('value');

}