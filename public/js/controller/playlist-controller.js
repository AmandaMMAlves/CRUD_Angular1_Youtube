angular.module('musica-crud').controller('PlaylistController', function($scope, youtubeFactory, recursoMusica, getVideoObject, YT_event){
    $scope.musicas = [];
    $scope.mensagem = "";


    recursoMusica.query(function(musicas){
        $scope.musicas = musicas;
        $scope.youtube($scope.musicas[0]);
    }, function(erro){
        console.log(erro);
    });

    $scope.yt = {
        width: 540, 
        height: 360, 
        videoid: "pRu5wxl5frk",
        
    };

        
    $scope.youtube = function(musica){ //funcao repetida
        var v = getVideoObject.getVideo(musica);
        youtubeFactory.getVideosFromSearchByParams(v).then(function (_data) {
            $scope.yt.videoid = _data.data.items[0].id.videoId;
            $scope.yt.index = $scope.musicas.indexOf(musica);
        }).catch(function (_data) {
            console.log(_data);
            $scope.mensagem = "Não foi possível carregar o vídeo";
        });
    };


    $scope.$on(YT_event.STATUS_CHANGE, function(event, data){
        $scope.yt.playerStatus = data;
        if ($scope.yt.playerStatus == 'ENDED')
        {
            if($scope.yt.index < $scope.musicas.length - 1)
            {
                var index = $scope.yt.index;
                $scope.youtube($scope.musicas[index + 1]);
            }

        }
    });

    

});


angular.module('musica-crud').constant('YT_event',{
    STOP: 0,
    PLAY: 1,
    PAUSE: 2,
    STATUS_CHANGE: 3
});