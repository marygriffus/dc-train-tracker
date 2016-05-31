"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .factory("trainFactory", ["$http", trainFactoryFunc])

  function trainFactoryFunc($http){
    return {
      get: function(station) {
        var urlT = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/"
        urlT += station
        urlT += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
        urlT += "&callbackname=JSON_CALLBACK";
        return $http.get(urlT);
      }
    }
  }
})();
