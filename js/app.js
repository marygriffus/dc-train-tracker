"use strict";

(function(){
  angular
  .module('dc-train-tracker', [
    'ui.router'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    Router
  ]);

  function Router($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("landing", {
      url: "/",
      templateUrl: "../html/landing.html",
      controller: "landingController",
      controllerAs: "landingVm"
    });
  }



})()
