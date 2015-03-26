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
    $scope.param = $stateParams.playlistId;
    $scope.sujet = $stateParams.sujet;




    angular.extend($scope, {
        enums: enums,
        songs: songFactory,
        audio: new Audio(),
        currentSong: ""
    });

    function setPlayStatus(status) {
        return $scope.state.status === status;
    };

    function play(song) {

        $scope.audio.src = song;
        $scope.audio.play();

        setPlayStatus(enums.state.playing);
    };

    function pause(song) {

        setPlayStatus(enums.state.paused);
    };

    function stop(song) {
        return $scope.state.status === enums.state.playing;

        setPlayStatus(enums.state.stopped);
    };
});
