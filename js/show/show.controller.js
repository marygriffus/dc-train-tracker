"use strict";

(function(){
  angular
  .module("dc-train-tracker")
  .controller("showController", [
    "$stateParams",
    "$http",
    "$location",
    "$resource",
    "stationFactory",
    "trainFactory",
    "alertFactory",
    "noteFactory",
    showControllerFunc
  ]);

  function showControllerFunc($stateParams, $http, $location, $resource, stationFactory, trainFactory, alertFactory, noteFactory){
    var showVm = this;
    showVm.station = $stateParams.station;
    showVm.stationName = '';
    showVm.tab = 'next';
    showVm.lines = [];

    //show page dropdown
    stationFactory
    .then(function(res){
      showVm.data = res.data['Stations'].sort(function(a, b){
        return a.Name == b.Name ? 0 : +(a.Name > b.Name) || -1;
      })
    })

    showVm.getStation = function(){
      $location.path(showVm.station.Code)
    }

    trainFactory.get($stateParams.station)
    .then(function(res){
      showVm.trains = res[0];
      showVm.lines = res[1];
      showVm.stationName = showVm.trains[0]['LocationName']
    })
    .then(function(){
      alertFactory.get(showVm.lines)
    .then(function(res){
      showVm.incidents = res
    })});

    noteFactory.query(function(res){
      showVm.notes = [];
      res.forEach(function(note){
        if (note.station == showVm.station){
          showVm.notes.push(note)
        }
      })
    })

    showVm.destroy = function(note){
      noteFactory.delete({id: note});
    }

    showVm.newNote = new noteFactory();
    showVm.create = function(){
      showVm.newNote.station = showVm.station;
      
      var rawDate = new Date();
      var day = showVm.newNote.rawDate.getDate();
      var month = showVm.newNote.rawDate.getMonth() + 1;
      var year = showVm.newNote.rawDate.getFullYear();

      showVm.newNote.created_at = month + '/' + day + '/' + year
      console.log(showVm.newNote.created_at)
      showVm.newNote.$save();
      showVm.notes.push(showVm.newNote)
    }


  }
})();
