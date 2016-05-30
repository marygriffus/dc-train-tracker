"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    "$http",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams, $http){
    var showVm = this;
    showVm.station = $stateParams.station;

    var url = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/"
    url += showVm.station
    url += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
    url += "&callbackname=JSON_CALLBACK";

    $http.get(url)
    .then(function(res){
      console.log(res.data['Trains'])
    })
  }

})();
