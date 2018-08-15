angular.module('diretivas', []).directive('imagem', function(){ //IDK
    var ddo = {};

    ddo.restrict = "E";

    ddo.scope = {
        titulo: '@',
        url: '@'
    }

    ddo.template = "<img class='img-thumbnail' src='{{url}}' alt='{{titulo}}'>'";

    return ddo;
})
.directive('filtro', function(){ //working
    var ddo = {};

    ddo.restrict = "E";

    ddo.template = '<div class="row"><div class="col-md-12"><input class="form-control" placeholder="Pesquisar" ng-model="filtro" ng-model-options="{ debounce: 500 }"></div></div>';

    return ddo;
})
.directive('card', function(){//working!!!
    var ddo = {};
    
    ddo.restrict = "E";

    ddo.transclude = true;

    ddo.scope = {
        musica: "="
    }

    ddo.templateUrl = 'js/directives/card.html';

    return ddo;
})
.directive('foco', function(){ //working
    var ddo = {};

    ddo.restrict = "A";

    

    ddo.link = function(scope, element){
        scope.$on('musicaCadastrada', function(){
            element[0].focus();
        });
        
    }

    return ddo;
});