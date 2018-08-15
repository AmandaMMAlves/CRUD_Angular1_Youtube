angular.module('musica-crud',['servico', 'ngRoute', 'diretivas', 'ngAnimate', 'jtt_youtube'])
.config(function($routeProvider, $locationProvider, $sceDelegateProvider){
    
    $locationProvider.html5Mode(true);

    $routeProvider.when('/musicas', {
        templateUrl: 'partials/main.html',
        controller: 'MusicasController'
    });

    $routeProvider.when('/musicas/nova', {
        templateUrl: 'partials/musica.html',
        controller: 'MusicaController'
    });

    $routeProvider.when('/musicas/editar/:musicaId', {
        templateUrl: 'partials/musica.html',
        controller: 'MusicaController'
    });

    $routeProvider.when('/musicas/toca/:musicaId',{
        templateUrl: 'partials/toca-musica.html',
        controller: 'MusicaController'
    });

    $routeProvider.when('/playlist',{
        templateUrl:'partials/playlist.html',
        controller: 'PlaylistController'
    });

    $routeProvider.otherwise({
        redirectTo: '/musicas'
    });

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**']);
      
});