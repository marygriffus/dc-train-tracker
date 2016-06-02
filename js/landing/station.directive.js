"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .directive("station", function(){
    return {
      templateUrl: "dc-train-tracker/html/station.html",
      scope: true,
      restrict: 'AE'
    }
  });
})();
