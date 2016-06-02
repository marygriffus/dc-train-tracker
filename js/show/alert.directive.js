"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .directive("alert", function(){
    return {
      templateUrl: "dc-train-tracker/html/alert.html",
      scope: true,
      restrict: 'AE'
    }
  });
})();
