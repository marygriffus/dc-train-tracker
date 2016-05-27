"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams){
    var showVm = this;
    showVm.station = $stateParams.station;
  }

})();
