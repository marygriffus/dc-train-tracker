"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .factory("noteFactory", ["$resource", noteFactoryFunc])

  function noteFactoryFunc($resource){
    return $resource("https://murmuring-plains-55723.herokuapp.com/notes/:id", {}, {
      update: {method: "put"}
    });
  }
})();
