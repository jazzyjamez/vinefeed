var filter = 'vine';

$(document).ready(function() {

  var socket = io.connect();

  // initialize by finding all vine things
  socket.on('connect', function() {
    socket.emit('track', {
      track: filter
    });
  });

  var i = 0;
  socket.on('tweet', function(data) {
    if(Math.floor(i % 4) == 0) {
      $("<div id='row" + Math.floor(i / 4) + "' class='row show-grid'>").appendTo("#videos");
      if(i > 3) { 
        var current_row = $("#row" + Math.floor(i / 4));
        var prev_top_css = current_row.prev().position().top + 230;
        current_row.css({
          "position": "absolute",
          "top": prev_top_css + "px"
        });
      }
    }
    var vine_link = $("<a>", {
      href:data.tweet.vine_url
    });
    var new_video = $("<video id='" + data.tweet.id + "' class='video-js vjs-default-skin bigger magnify' loop preload='metadata' width='200' height='200' src='" + data.tweet.vid_url + "''></video>");
    var tooltip = $("<div class='ttip'>@" + data.tweet.user + ': ' + data.tweet.text + "</div>")
    $("<div class='span3 item'>").append(new_video).append(tooltip).appendTo("#row" + Math.floor(i / 4));

    i++;
    new_video.parent().hide();

    // player settings
    $("#" + data.tweet.id).css({
      "width": "",
      "height": ""
    });

    _V_(String(data.tweet.id)).ready(function() {
      this.volume(0);
      $("#" + data.tweet.id).parent().fadeIn("slow").show();
      $("#" + data.tweet.id).parent('selector expression')().wrap(vine_link);

    });

    // mouseover in, mouseover out callbacks
    $("#" + data.tweet.id).hover(function() {
      _V_(String(data.tweet.id)).volume(1);
      _V_(String(data.tweet.id)).play();
      // $(this).children().prop('controls', true);
      $("#" + data.tweet.id).parent().css("z-index", "2");
    }, function() {
      _V_(String(data.tweet.id)).volume(0);
      _V_(String(data.tweet.id)).pause();
      // $(this).children().prop('controls', false);
      $("#" + data.tweet.id).parent().css("z-index", "1");
    });
  });

  $('#searchbar').submit(function() {
    filter = $("input:first").val(); //TODO: Use identifiers
    $("#videos").empty();
    i = 0;
    socket.emit('track', {
      track: filter
    });
    return false;
  });

});