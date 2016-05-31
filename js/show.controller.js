"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    "$http",
    "trainFactory",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams, $http, trainFactory){
    var showVm = this;
    showVm.station = $stateParams.station;
    showVm.stationName = '';
    showVm.tab = 'next';
    showVm.lines = [];

    // var urlT = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/"
    // urlT += showVm.station
    // urlT += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
    // urlT += "&callbackname=JSON_CALLBACK";

    var urlA = "https://api.wmata.com/Incidents.svc/json/Incidents"
    urlA += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
    urlA += "&callbackname=JSON_CALLBACK";

    trainFactory.get($stateParams.station)
    .then(function(res){
      var colorTrans = {
        "BL": "rgba(0, 150, 214, 0.6)",
        "GR": "rgba(0, 178, 89, 0.6)",
        "OR": "rgba(248, 151, 29, 0.6)",
        "RD": "rgba(209, 18, 66, 0.6)",
        "SV": "rgba(110, 110, 110, 0.6)",
        "YL": "rgba(255, 221, 0, 0.6)"
      }
      showVm.trains = res.data['Trains']
      for (var i=0; i < showVm.trains.length; i++){
        showVm.trains[i].color = colorTrans[showVm.trains[i]["Line"]];
        if (showVm.lines.indexOf(showVm.trains[i]["Line"]) === -1){
          showVm.lines.push(showVm.trains[i]["Line"])
        }
      }
    })

    .then(function(){
      $http.get(urlA)
      .then(function(res){
        showVm.incidents = res.data['Incidents']
        console.log(showVm.incidents)
        for (var i=0; i < showVm.incidents.length; i++){
          showVm.incidents[i].relevance = false;
          var proc = showVm.incidents[i].LinesAffected.split(' ');
          for (var j=0; j < proc.length; j++){
            proc[j] = proc[j].replace(/;+$/, "");
            if (showVm.lines.indexOf(proc[j]) != -1){
              showVm.incidents[i].relevance = true;
            }
          }
          showVm.incidents[i].LinesAffected = proc;
          console.log(showVm.incidents[i].relevance)
        }
      })
    showVm.stationName = showVm.trains[0]['LocationName']
    })
  }

})();
