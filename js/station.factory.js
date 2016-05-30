"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .factory("stationFactory", ["$http", stationFactoryFunc])

  function stationFactoryFunc($http){
    var url = "https://api.wmata.com/Rail.svc/json/jStations"
    url += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb"
    url += "&callbackname=JSON_CALLBACK"

    return $http({
      method: 'GET',
      url: url})
  }
})();
