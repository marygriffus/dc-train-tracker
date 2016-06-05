"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("landingController", [
    "$location",
    "stationFactory",
    landingControllerFunc
  ]);

  function landingControllerFunc($location, stationFactory){
    var landingVm = this;
    landingVm.displayLines = ''

    //populate the dropdown
    stationFactory
    .then(function(res){
      landingVm.data = res.data['Stations'].sort(function(a, b){
        return a.Name == b.Name ? 0 : +(a.Name > b.Name) || -1;
      })
    })

    landingVm.getStation = function(){
      $location.path(landingVm.station.Code)
    }

    landingVm.switchLines = function(lines){
      landingVm.displayLines = lines.forEach(function(line){
        if (line){ return line }
      })
    }
  }

})();
