// Setup utils
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
jQuery.fn.attrStartsWith = function(p) {
  var pCamel = p.replace(/-([a-z])/ig, function(m,$1) { return $1.toUpperCase(); });
  return this.filter(function(i, el){
    return Object.keys(el.dataset).some(function(v){
      return v.indexOf(pCamel) > -1;
    });
  });
};

// Setup Youtube iframe
function onYouTubeIframeAPIReady() {
    // Query all youtube video elements
    videos = jQuery('.youtube-video');
    for (var i = 0, l = videos.length; i < l; i++) {
        var video = videos[i];
        // Get source value
        var src = video.attributes['src'].value;
        if(!src || src === null) continue;

        // Check src is from Youtube
        var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (!isYoutube) continue;

        // Parse video id
        var videoId = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
        videoId = (videoId.length > 1) ? videoId.splice(1) : videoId;
        videoId = videoId.toString();

        // Set up player
        var player = new YT.Player(video.id, {
            videoId : videoId,
            playerVars: {
                'origin': location.origin,
                'autoplay': 1,
                'showinfo': 0,
                'frameborder': 0,
                'controls': 0,
                'fs': 0,
                'loop': 1,
                'autohide': 1
            },
            events : {
                'onReady' : function(event) {
                    event.target.playVideo();
                    event.target.mute();
                },
                'onStateChange': function(event) {
                    if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
                        event.target.playVideo();
                        event.target.mute();
                    }
                }
            }
        });
    }
}
