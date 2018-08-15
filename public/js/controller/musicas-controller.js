angular.module('musica-crud').controller('MusicasController', function($scope, recursoMusica){
    $scope.musicas = [];
    $scope.mensagem = "";
    $scope.filtro = "";

    recursoMusica.query(function(musicas){
        $scope.musicas = musicas;
    }, function(erro){
        console.log(erro);
    });

    $scope.remover = function(musica){
        recursoMusica.delete({musicaId: musica._id}, function(){
            var index = $scope.musicas.indexOf(musica);
            $scope.musicas.splice(index,1);
            $scope.mensagem = "Música removida com sucesso!";

        }, function(erro){
            console.log(erro);
            $scope.mensagem = "Não foi possível remover esta música";
        });
    }

    

});