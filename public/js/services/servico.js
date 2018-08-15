angular.module('servico', ['ngResource'])
.factory('recursoMusica', function($resource){
    return $resource('v1/musicas/:musicaId', null,{
        update: {
            method: 'PUT'
        }
    });
})
.factory('cadastrarMusica', function(recursoMusica, $q, $rootScope){
    var servico = {};

    var evento = 'musicaCadastrada';

    servico.cadastrar = function(musica) {
        return $q(function(resolve, reject){
            
            if(musica._id){
                recursoMusica.update({musicaId: musica._id}, musica, function(){
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: "Musica alterada com sucesso!",
                        inclusao: false
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possivel fazer alteração da música'
                    });
                });
            }
            else
            {
                recursoMusica.save(musica, function(){
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: "Musica salva com sucesso!",
                        inclusao: true
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem: "Não foi possivel realizar a inclusão"
                    });
                });
            }

        });
    }

    return servico;

})
.factory('getVideoObject',function(){
    var x = {};
    
    x.getVideo = function (musica)
    {
        return { 
            q: musica.titulo + " " + musica.banda, // (optional) search string
            order: "relevance",
            maxResults: "1", // (optional) valid values: 0-50 | default: 5
            key: "AIzaSyCkeI-O5MmY_MJk8T2NEdfnDOWHLA3-JHQ", //when pass to git blank that
        };
    };
    return x;

});