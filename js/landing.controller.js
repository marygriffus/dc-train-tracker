"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("landingController", [
    "$location",
    landingControllerFunc
  ]);

  function landingControllerFunc($location){
    var landingVm = this;
    landingVm.data = [
      {name: "Tenleytown"},
      {name: "Van Ness"},
      {name: "Cleveland Park"},
      {name: "Woodley Park"}
    ]
    landingVm.getStation = function(){
      $location.path(landingVm.station.name)
    }
  }

})();
