'use strict';

angular.
  module('resgateInvestimentoApp', [
    'ngRoute',
    'resgateInvestimentoControllers',
    'resgateInvestimentoServices',
]).
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider
        .when('/resgateInvestimento', {
          templateUrl: 'spas/resgateInvestimento/resgateInvestimento.html'
      })
      .otherwise({
          redirectTo: '/resgateInvestimento'
      })
      .when('/resgatePersonalizado', {
        templateUrl: 'spas/resgateInvestimento/resgatePersonalizado.html'
      })
      .otherwise({
          redirectTo: '/resgatePersonalizado'
      })
    }
  ]);
