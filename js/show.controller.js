"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    "$http",
    "$location",
    "stationFactory",
    "trainFactory",
    "alertFactory",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams, $http, $location, stationFactory, trainFactory, alertFactory){
    var showVm = this;
    showVm.station = $stateParams.station;
    showVm.stationName = '';
    showVm.tab = 'next';
    showVm.lines = [];

    //show page dropdown
    stationFactory
    .then(function(res){
      showVm.data = res.data['Stations'].sort(function(a, b){
        return a.Name == b.Name ? 0 : +(a.Name > b.Name) || -1;
      })
    })

    showVm.getStation = function(){
      $location.path(showVm.station.Code)
    }

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
