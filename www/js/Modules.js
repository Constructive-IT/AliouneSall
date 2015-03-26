// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('aliounesall.modules', []).constant('options', {
        range: {
            pitch: 7,
            tempo: 50
        },
        defaults: {
            pitch: 0,
            tempo: 100
        },
        consts: {
            pitchExp: 0.69314718056,
            EOF: 65535
        }
    })
    .constant('enums', {
        state: {
            init: 0,
            ready: 1,
            playing: 2,
            paused: 3,
            stopped: 4
        }
    });