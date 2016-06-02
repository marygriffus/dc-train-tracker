"use strict";

(function(){
  angular
  .module('dc-train-tracker', [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    // $locationProvider.html5Mode(true);
    $stateProvider
    .state("landing", {
      url: "/",
      templateUrl: "dc-train-tracker/html/landing.html",
      controller: "landingController",
      controllerAs: "landingVm"
    })
    .state("show", {
      url: "/:station",
      templateUrl: "dc-train-tracker/html/show.html",
      controller: "showController",
      controllerAs: "showVm"
    });
    $urlRouterProvider
    .otherwise("/")
  }

})();
