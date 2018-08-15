angular.module('musica-crud').controller('MusicaController', function($scope, recursoMusica, cadastrarMusica, $routeParams, $http, youtubeFactory, getVideoObject){
    $scope.musica = {};
    $scope.mensagem = "";
    $scope.videoId = "";

    if($routeParams.musicaId)
    {
        recursoMusica.get({musicaId: $routeParams.musicaId}, function(musica){
            $scope.musica = musica;
            $scope.youtube($scope.musica);
        }, function(erro){
            console.log(erro);
            $scope.mensagem = "Não foi possível obter os dados desta música"
        });
        
    }

    $scope.youtube = function(musica){ 
        var v = getVideoObject.getVideo(musica);

        youtubeFactory.getVideosFromSearchByParams(v)
        .then(function (_data) {
            $scope.videoId = _data.data.items[0].id.videoId;
        }).catch(function (_data) {
            console.log(_data);
            $scope.mensagem = "Não foi possível carregar o vídeo";
        });
    }


    $scope.submeter = function(){
        if($scope.formulario.$valid)
        {
            cadastrarMusica.cadastrar($scope.musica)
            .then(function(dados){
                $scope.mensagem = dados.mensagem;
                if(dados.inclusao) $scope.musica = {};
            })
            .catch(function(erro){
                $scope.mensagem = erro.mensagem;
            })
        }
    }

    $scope.getIframeSrc = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

});