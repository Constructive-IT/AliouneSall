angular.module('aliounesall.controllers', ['ionic', 'aliounesall.controllers', 'aliounesall.factories', 'aliounesall.directives', 'aliounesall.modules', 'aliounesall.filters'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout,$filter, $localstorage) {

    var wfObj = [];

    var years = [2010, 2011, 2012, 2013, 2014, 2015];
    var months = moment.months();
    var todayMonthYear = moment().format("MYYYY");
    for (var i = 0; i < years.length; i++) {

        for (var j = 1; j < months.length; j++) {
            var id = j + "" + years[i];
            if (id === todayMonthYear) {
                break;
            }
            wfObj.push({ title: months[j] + " - " + years[i], id: id });

        }
    }

    wfObj.reverse();

    var lastUpdate = $localstorage.getObject("LastUpdate");
    //var today = $filter('date')(new Date(), 'yyyy-MM-dd');
    var today = moment().format("L");
    


    //if (lastUpdate == '{}' || lastUpdate != today) {
        $localstorage.setObject("WaktaanuFajar", wfObj);

        $localstorage.setObject("Tafsir", wfObj);

        $localstorage.setObject("LastUpdate", today);
    //}


// Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.getPlaylist = function (sujet) {
      return $localstorage.getObject(sujet);
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function ($scope, $stateParams, $localstorage, songFactory, enums) {
    $scope.sujet = $stateParams.sujet;
    $scope.searchText = "";
    $scope.playlists = $scope.getPlaylist($scope.sujet);

})

.controller('PlaylistCtrl', function ($scope, $stateParams, $localstorage, $ionicLoading, $timeout, $rootScope, songFactory, enums) {

    angular.extend($scope, {
        enums: enums,
        songs: songFactory,
        playlistId: $stateParams.playlistId,
        sujet: $stateParams.sujet,
        playlistName: $stateParams.playlistName,
        currentSong: "",
    });


    $scope.play = function (song) {
        $rootScope.$emit("audio.play", song);

    };

});
