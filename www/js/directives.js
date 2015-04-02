angular.module('aliounesall.directives', [])
    .directive('fileInput', function($parse) {
        return {
            restrict: "EA",
            template: "<input type='file' ng-transclude />",
            replace: true,
            transclude: true,
            link: function(scope, element, attrs) {

                var modelGet = $parse(attrs.fileInput);
                var modelSet = modelGet.assign;
                var onChange = $parse(attrs.onChange);

                var updateModel = function() {
                    scope.$apply(function() {
                        modelSet(scope.$parent, element[0].files[0]);
                        onChange(scope.$parent);
                    });
                };

                element.bind('change', updateModel);
            }
        };
    })

.directive('trackProgress', function ($parse) {
    return {
        restrict: "EA",
        templateUrl: "trackProgress.html",
        scope: {},
        replace: true,
        link: function (scope, elm, attrs) {
            angular.extend(scope, {
                total: 0,
                progress: 0,
                time: 0,
                setProgress: function (time) {
                    var seconds = 0;
                    if (time.indexOf(':') > 0) {
                        var str = time.split(':');
                        seconds = (Number(str[0]) * 60 + Number(str[1]));
                    }
                    else {
                        seconds = time;
                    }
                    scope.$parent.$eval(attrs.onChange + '(' + seconds + ')');
                }
            });
            scope.$parent.$watch(attrs.progress, function (progress) {
                scope.progress = progress;
                var str = new Date(0, 0, 0, 0, 0, progress).toTimeString().split(" ")[0].split(":");
                var time = (Number(str[0]) > 0) ? (60 * Number(str[0]) + Number(str[1])) : str[1] + ':' + str[2];
                scope.time = time;
            });
        }
    }
});