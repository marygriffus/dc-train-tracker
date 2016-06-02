"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .directive("note", function(){
    return {
      templateUrl: "dc-train-tracker/html/note.html",
      scope: true,
      restrict: 'AE'
    }
  });
})();
