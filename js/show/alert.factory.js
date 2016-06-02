"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .factory("alertFactory", ["$http", alertFactoryFunc])

  function alertFactoryFunc($http){
    return {
      get: function(lines){
        var urlA = "https://api.wmata.com/Incidents.svc/json/Incidents"
        urlA += "?api_key=e9e713e3d5d74a8fa4df1ab3ab9e5fdb";
        urlA += "&callbackname=JSON_CALLBACK";

        return $http.get(urlA)
        .then(function(res){
          var incidents = res.data['Incidents'];

          for (var i=0; i < incidents.length; i++){
            incidents[i].relevance = false;
            var proc = incidents[i].LinesAffected.split(' ');
            for (var j=0; j < proc.length; j++){
              proc[j] = proc[j].replace(/;+$/, "");
              if (lines.indexOf(proc[j]) != -1){
                incidents[i].relevance = true;
                var alerting = true;
              }
            }
            incidents[i].LinesAffected = proc;
          }
          if (!alerting){
            var colorDisp = {
              "BL": "Blue",
              "GR": "Green",
              "OR": "Orange",
              "RD": "Red",
              "SV": "Silver",
              "YL": "Yellow"
            }
            var linesNotAffected = "No alerts at this time for the"
            if (lines.length == 1){
              linesNotAffected += ' ' + colorDisp[lines[0]] + ' Line.';
            }
            else if (lines.length == 2){
              linesNotAffected += ' ' + colorDisp[lines[0]] + ' or ' + colorDisp[lines[1]] + ' Lines.';
            }
            else{
              for(var i = 0; i<lines.length; i++){
                if (i == (lines.length-1)){
                  linesNotAffected += ' or ' + colorDisp[lines[i]];
                }
                else{
                  linesNotAffected += ' ' + colorDisp[lines[i]] + ',';
                }
              }
              linesNotAffected += ' Lines.';
            }

            incidents.push({
              Description: linesNotAffected,
              LinesAffected: "None",
              relevance: true
            })
          }
          return incidents;
        })
      }
    }

  }
})();
