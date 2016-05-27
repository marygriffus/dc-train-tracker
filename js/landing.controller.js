"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("landingController", [
    landingControllerFunc
  ]);

  function landingControllerFunc(){
    var landingVm = this;
    landingVm.data = [
      "Tenleytown",
      "Van Ness",
      "Cleveland Park",
      "Woodley Park"
    ]
  }

})();
