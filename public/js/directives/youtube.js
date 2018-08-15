angular.module('diretivas').directive('youtube', function($window, YT_event){
    var ddo = {};

    ddo.restrict = "E";

    ddo.scope = {
        height: '@',
        width: '@',
        videoid: '@'
    };

    ddo.template = '<div></div>';

    

    ddo.link = function(scope, element) {
        var tag = document.createElement('script');
        // tag.src = "https://www.youtube.com/iframe_api";
        tag.src = "https://www.youtube.com/player_api";        
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        var player;

        $window.onYouTubeIframeAPIReady = function() {

            player = new YT.Player(element.children()[0], {
            playerVars: {
                autoplay: 1,
                html5: 1,
                theme: "light",
                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                showinfo: 1,
                controls: 1
            },
            
            height: scope.height,
            width: scope.width,
            videoId: scope.videoid,

            events: {
                onStateChange: function(event) {
                    var message = {
                        event: YT_event.STATUS_CHANGE,
                        data: ""
                    };

                    switch(event.data){
                        case YT.PlayerState.PLAYING:
                            message.data = "PLAYING";
                            break;

                        case YT.PlayerState.ENDED:
                            message.data = "ENDED";
                            break;

                        case YT.PlayerState.UNSTARTED:
                            message.data = "NOT PLAYING";
                            break;

                        case YT.PlayerState.PAUSED:
                            message.data = "PAUSED";
                            break;
                    };

                    scope.$apply(function(){
                        scope.$emit(message.event, message.data);
                    });

                }
            }

            });
        }

        scope.$watch('videoid', function(newValue, oldValue) {
            if (newValue == oldValue) {
                onYouTubeIframeAPIReady();
                return;
            }

            // player.cueVideoById(scope.videoid);
            player.loadVideoById(scope.videoid);
            player.playVideo();
        });
              

    }
  
   
    return ddo;
});