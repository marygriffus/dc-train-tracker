"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .factory("trainFactory", ["$http", trainFactoryFunc])

  function trainFactoryFunc($http){
    return {
      get: function(station) {
        var urlT = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/";
        urlT += station;
        urlT += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
        urlT += "&callbackname=JSON_CALLBACK";
        return $http.get(urlT)
        .then(function(res){
          var lines = [];
          var colorTrans = {
            "BL": "rgba(0, 150, 214, 0.6)",
            "GR": "rgba(0, 178, 89, 0.6)",
            "OR": "rgba(248, 151, 29, 0.6)",
            "RD": "rgba(209, 18, 66, 0.6)",
            "SV": "rgba(110, 110, 110, 0.6)",
            "YL": "rgba(255, 221, 0, 0.6)"
          };
          var colorDisp = {
            "BL": "Blue",
            "GR": "Green",
            "OR": "Orange",
            "RD": "Red",
            "SV": "Silver",
            "YL": "Yellow"
          };
          var trains = res.data['Trains']
          for (var i=0; i < trains.length; i++){
            trains[i].color = colorTrans[trains[i]["Line"]];
            trains[i].colorDisp = colorDisp[trains[i]["Line"]];
            if (colorDisp[trains[i]["Line"]] && (lines.indexOf(trains[i]["Line"]) === -1)){
              lines.push(trains[i]["Line"]);
            }
          }
          return [trains, lines];
        })
      }
    }
  }
})();
