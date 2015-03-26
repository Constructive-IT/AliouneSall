angular.module('aliounesall.controllers', ['ionic', 'aliounesall.controllers', 'aliounesall.factories', 'aliounesall.directives', 'aliounesall.modules'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localstorage) {

    var wfObj = [
      { title: 'Regguuae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];

    $localstorage.setObject("WaktaanuFajar", wfObj);

    
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

    $scope.playlists = $scope.getPlaylist($scope.sujet);





})

.controller('PlaylistCtrl', function ($scope, $stateParams, $localstorage, songFactory, enums) {
   
    angular.extend($scope, {
        enums: enums,
        songs: songFactory,
        player: new Audio(),
        status: enums.state.init,
        param: $stateParams.playlistId,
        sujet: $stateParams.sujet,
        currentSong: ""
    });

    function setPlayStatus(status) {
        return $scope.status === status;
    };

    $scope.play = function (song) {
        $scope.player.src = song;
        $scope.player.play();

        setPlayStatus(enums.state.playing);
    };

    $scope.pause = function () {
        if ($scope.status === enums.state.playing) {

            $scope.player.pause();
            setPlayStatus(enums.state.paused);
        }
    };

    $scope.stop = function () {
        if ($scope.state.status === enums.state.playing) {

            $scope.player.pause();
            $scope.player.currentTime = 0;

            setPlayStatus(enums.state.stopped);
        }      
    };
});
