'use strict';

var plugueme = angular.module('plugueme', ['angulartics', 'angulartics.google.analytics', 'ngRoute', 'ngResource', 'btford.modal']);

plugueme.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$routeProvider
	  .when('/', {controller: 'ContatoCtrl'})
	  .when('/comprar/:produto', {templateUrl: 'partials/comprar.html', controller: 'ComprarCtrl'})
	  .when('/saiba-mais/:produto', {templateUrl: 'partials/comprar.html', controller: 'ComprarCtrl'})
	  .when('/contato/:produto', {templateUrl: 'partials/contato.html', controller: 'ContatoCtrl'})
	  .when('/obrigado/:produto', {templateUrl: 'partials/obrigado.html'})
	  .when('/erro/:produto', {templateUrl: 'partials/erro.html'})
	  .otherwise({ redirectTo: '/' });
}]);

plugueme.factory('resources', ['$resource', function($resource) {
  return {
    compras: $resource('http://data.plugue.me:3000/contatos_basicos')
  };
}]);

plugueme.controller('MainCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $scope.$close = function() { 
    $location.path('/');
  };
}]);
  
plugueme.controller('ComprarCtrl', ['$scope', '$http', '$routeParams', '$location', 'resources', function($scope, $http, $routeParams, $location, resources) {
  $scope.data = { extra: {} };
  $scope.data.extra.produto = $routeParams.produto;
  $scope.data.extra.referencia = location.hash;
  
  $scope.submit = function() {
    $scope.showErrors = false;
    if ($scope.form.$valid)
      $scope.postAndThanks();
    else
      $scope.showErrors = true;
  };
  
  $scope.postAndThanks = function() {
    resources.compras.save($scope.data, function() {
      $location.path('/obrigado/' + $routeParams.produto);
    }, function() {
      $location.path('/erro/' + $routeParams.produto);
    });
  }
  
}]);

plugueme.controller('ContatoCtrl', ['$scope', '$http', '$routeParams', '$location', 'resources', function($scope, $http, $routeParams, $location, resources) {
  $scope.data = { extra: {} };
  $scope.data.extra.produto = $routeParams.produto;
  $scope.data.extra.referencia = location.hash;
  
  $scope.submit = function() {
    $scope.showErrors = false;
    if ($scope.form.$valid)
      $scope.postAndThanks();
    else
      $scope.showErrors = true;
  };
  
  $scope.postAndThanks = function() {
    resources.compras.save($scope.data, function() {
      $location.path('/obrigado/' + $routeParams.produto);
    }, function() {
      $location.path('/erro/' + $routeParams.produto);
    });
  }
  
}]);