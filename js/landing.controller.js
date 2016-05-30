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

    //populate the dropdown
    stationFactory
    .then(function(res){
      landingVm.data = res.data['Stations']
    })

    landingVm.getStation = function(){
      $location.path(landingVm.station.Code)
    }
  }

})();
