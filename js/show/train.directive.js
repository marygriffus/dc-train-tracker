"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .directive("train", function(){
    return {
      templateUrl: "../html/train.html",
      scope: true,
      restrict: 'AE'
    }
  });
})();
