"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    "$http",
    "trainFactory",
    "alertFactory",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams, $http, trainFactory, alertFactory){
    var showVm = this;
    showVm.station = $stateParams.station;
    showVm.stationName = '';
    showVm.tab = 'next';
    showVm.lines = [];

    trainFactory.get($stateParams.station)
    .then(function(res){
      showVm.trains = res[0];
      showVm.lines = res[1];
      showVm.stationName = showVm.trains[0]['LocationName']
    })
    .then(function(){
      alertFactory.get(showVm.lines)
    .then(function(res){
      showVm.incidents = res
    })});
  }
})();
