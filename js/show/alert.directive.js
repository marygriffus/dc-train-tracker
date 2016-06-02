"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .directive("alert", function(){
    return {
      templateUrl: "../html/alert.html",
      scope: true,
      restrict: 'AE'
    }
  });
})();
