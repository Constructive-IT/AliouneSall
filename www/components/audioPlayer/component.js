angular.module('aliounesall.directives', ["aliounesall.modules"])
    .directive('audioPlayer', function ($rootScope, $ionicLoading) {
        return {
            restrict: 'E',
            scope: {
                hasVolume: "@"
            },
            controller: function($scope, $element,$timeout, enums) {
                $scope.audioObject = new Audio();
                $scope.status      = enums.state.init;
                $scope.audio       = {
                                         duration    : 0,
                                         currentTime : 0,
                                         currentTrack: "",
                                         volume      : 1,
                                         status      : enums.state.ready
                                     };

                $scope.getDuration = function (val) {
                    return new Date(0, 0, 0, 0, 0, val);
                };

                $scope.setPlayStatus = function(status) {
                    $scope.audio.status = status;

                    $scope.status = status;
                };

                $scope.audioObject.oncanplay = function (e) {
                    $ionicLoading.hide();
                };

                $scope.audioObject.onerror = function () {
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: "Error! The current file could not be played",
                        duration: 1000
                    });
                    $scope.setPlayStatus(enums.state.stopped);
                };


                $scope.play = function(song) {

                    $ionicLoading.show({
                        template: "Loading..."
                    });

                    this.audioObject.src = song;
                    this.audioObject.play();

                    this.setPlayStatus(enums.state.playing);
                };

                $scope.pause = function () {
                    if ($scope.audio.status === enums.state.playing) {

                        this.audioObject.pause();
                        this.setPlayStatus(enums.state.paused);
                    }
                };

                $scope.stop = function () {
                    if (this.audio.status === enums.state.playing) {

                        this.audioObject.pause();
                        this.audioObject.currentTime = 0;

                        this.setPlayStatus(enums.state.stopped);
                    }
                };

                $scope.playPause = function () {
                    if (this.audioObject.paused)
                    {
                        this.audioObject.play();
                        this.setPlayStatus(enums.state.playing);
                    }
                    else
                    {
                        this.audioObject.pause();
                        this.setPlayStatus(enums.state.paused);
                    }
                };

                $scope.seeked = function () {
                    $ionicLoading.show({
                        template: "Loading..."
                    });

                    $scope.audioObject.currentTime = this.audio.currentTime;
                };

                $scope.audioObject.addEventListener('timeupdate', function () {

                    var seek = $scope.audioObject.currentTime;
                    var max = $scope.audioObject.duration;

                    //did a little change here by using $timeout         
                    $timeout(function () {
                        $scope.updateUI(seek, max);
                    }, 0);

                    $rootScope.$emit('audio.time', this);
                });

                $scope.updateUI = function (seek, max) {
                    $scope.audio.currentTime = seek;
                    $scope.audio.duration = max;
                    $scope.audio.status = enums.state.playing;
                };

                $scope.setVolume = function () {
                    $scope.audioObject.volume = $scope.audio.volume;
                };


                // tell others to give me my prev/next track (with audio.set message)
                $scope.next = function () { $rootScope.$emit('audio.next'); };
                $scope.prev = function () { $rootScope.$emit('audio.prev'); };
                $scope.audioObject.addEventListener('ended', function () { $rootScope.$emit('audio.ended', this); $scope.next(); });

                $rootScope.$on('audio.play', function (r, src) { $scope.play(src); });
                $rootScope.$on('audio.hideVolume', function (r, hide) { $scope.hideVolume(hide); });



                //$scope.currentNum          = 0;

                //// tell others to give me my prev/next track (with audio.set message)
                //$scope.next                = function(){ $rootScope.$emit('audio.next'); };
                //$scope.prev                = function(){ $rootScope.$emit('audio.prev'); };

                //// tell audio element to play/pause, you can also use $scope.audio.play() or $scope.audio.pause();
                //$scope.playpause           = function () { var a = $scope.audioObject.paused ? $scope.audioObject.play() : $scope.audioObject.pause(); };

                //// listen for audio-element events, and broadcast stuff
                //$scope.audioObject.addEventListener('play', function () { $rootScope.$emit('audio.play', this); });
                //$scope.audioObject.addEventListener('pause', function () { $rootScope.$emit('audio.pause', this); });
                //$scope.audioObject.addEventListener('timeupdate', function () { $rootScope.$emit('audio.time', this); });
                //$scope.audioObject.addEventListener('ended', function () { $rootScope.$emit('audio.ended', this); $scope.next(); });

                //// respond to set track messsages
                //$rootScope.$on('audioObject.set', function (r, file, info, currentNum, totalNum) {
                //    var playing            = !$scope.audioObject.paused;
                //    $scope.audioObject.src = file;
                //    var a                  = playing ? $scope.audioObject.play() : $scope.audioObject.pause();
                //    $scope.info            = info;
                //    $scope.currentNum      = currentNum;
                //    $scope.totalNum        = totalNum;
                //});

                //// update display of things - makes time-scrub work
                //setInterval(function(){ $scope.$apply(); }, 500);
            },

            templateUrl: '/components/audioPlayer/views/component.html'
        };
    });
