"use strict";

(function(){
  angular
  .module('dc-train-tracker', [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    Router
  ]);

  function Router($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("landing", {
      url: "/",
      templateUrl: "../html/landing.html",
      controller: "landingController",
      controllerAs: "landingVm"
    })
    .state("show", {
      url: "/:station",
      templateUrl: "../html/show.html",
      controller: "showController",
      controllerAs: "showVm"
    });
  }

})();
