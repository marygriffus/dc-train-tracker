"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("landingController", [
    "$location",
    "stationFactory",
    landingControllerFunc
  ]);

  function landingControllerFunc($location, stationFactory){
    var landingVm = this;

    //populate the dropdown
    stationFactory
    .then(function(res){
      landingVm.data = res.data['Stations'].sort(function(a, b){
        return a.Name == b.Name ? 0 : +(a.Name > b.Name) || -1;
      })

      // add lines for stations with multiple tracksets
      var getLines = function(station){
        var colorDisp = {
          "BL": "Blue",
          "GR": "Green",
          "OR": "Orange",
          "RD": "Red",
          "SV": "Silver",
          "YL": "Yellow"
        };
        var lines = '';
        for (var i = 0; i <=4; i++){
          if (station[LineCode + i]){
            console.log('here' + station[LineCode + i])
            lines += ' ' + colorDisp[station[LineCode + i]]
          }
        }
        return  '(' + lines + ' )';
      }

      var names = [];
      for (var i = 0; i < landingVm.data.length; i++){
        if (landingVm.data[i].Name in names){
          landingVm.data[i-1].Name += getLines(landingVm.data[i-1]);
          landingVm.data[i].Name += getLines(landingVm.data[i]);
        }
        names.push(landingVm.data[i].Name);
      }
      console.log(names)
    })

    landingVm.getStation = function(){
      $location.path(landingVm.station.Code);
    }
  }

})();
