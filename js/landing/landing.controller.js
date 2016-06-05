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
    landingVm.getLines = function(station){
      var colorDisp = {
        "BL": "Blue",
        "GR": "Green",
        "OR": "Orange",
        "RD": "Red",
        "SV": "Silver",
        "YL": "Yellow"
      };
      var lines = '';
      for (var j = 0; j <=4; j++){
        if (station[LineCode + j]){
          console.log('here' + station[LineCode + j])
          lines += ' ' + colorDisp[station[LineCode + j]]
        }
      }
      return  '(' + lines + ' )';
    }

    //populate the dropdown
    stationFactory
    .then(function(res){
      landingVm.data = res.data['Stations'].sort(function(a, b){
        return a.Name == b.Name ? 0 : +(a.Name > b.Name) || -1;
      })

      // add lines for stations with multiple tracksets
      var names = [];
      var lastName = ''
      for (var i = 0; i < landingVm.data.length; i++){
        // if (landingVm.data[i].Name in names){
        //   console.log('multiple names')
        if (landingVm.data[i].Name == lastName){
          landingVm.data[i-1].Name += landingVm.getLines(landingVm.data[i-1]);
          landingVm.data[i].Name += landingVm.getLines(landingVm.data[i]);
        }
        names.push(landingVm.data[i].Name);
        last_name = landingVm.data[i].Name;
      }
      console.log(names)
    })

    landingVm.getStation = function(){
      $location.path(landingVm.station.Code);
    }
  }

})();
