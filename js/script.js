'use strict';

var plugueme = angular.module('plugueme', ['ngRoute', 'ngResource', 'btford.modal']);

plugueme.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	  .when('/', {controller: 'ContatoCtrl'})
	  .when('/comprar/:produto', {templateUrl: 'partials/comprar.html', controller: 'ComprarCtrl'})
	  .when('/saiba-mais/:produto', {templateUrl: 'partials/comprar.html', controller: 'ComprarCtrl'})
	  .when('/obrigado/:produto', {templateUrl: 'partials/obrigado.html'})
	  .when('/erro/:produto', {templateUrl: 'partials/erro.html'})
	  .otherwise({ redirectTo: '/' });
}]);

plugueme.factory('resources', ['$resource', function($resource) {
  return {
    compras: $resource('http://localhost:8585/contatos_basicos')
  };
}]);

plugueme.controller('MainCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $scope.$close = function() { 
    $location.path('/');
  };
}]);
  
plugueme.controller('ComprarCtrl', ['$scope', '$http', '$routeParams', '$location', 'resources', function($scope, $http, $routeParams, $location, resources) {
  $scope.data = {};
  $scope.data.produto = $routeParams.produto;
  
  $scope.submit = function() {
    $scope.showErrors = false;
    if ($scope.form.$valid)
      $scope.postAndThanks();
    else
      $scope.showErrors = true;
  };
  
  $scope.postAndThanks = function() {
    console.log($scope.data);
    /*$http.defaults.useXDomain = true;
    resources.compras.save($scope.data, function() {
      $location.path('/obrigado/' + $routeParams.produto);
    }, function() {
      $location.path('/erro/' + $routeParams.produto);
    });*/
  }
  
}]);
