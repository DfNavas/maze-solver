const angular = require('angular');
const findPath = require('../engines/maze')

angular.module('mazeSolver', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        var mazeString;
        $scope.solvedMaze = [];
        $scope.uploadFile = function (element) {
            var fileReader = new FileReader();
            var fileList = element.files;
            if (fileReader && fileList && fileList.length) {
                fileReader.readAsText(fileList[0]);
                fileReader.onload = function () {
                    mazeString = this.result;
                }
            }
        }
        $scope.solveMaze = function () {
            $scope.solvedMaze = findPath(mazeString);
        };
    }])

angular.element(function () {
    angular.bootstrap(document, ['mazeSolver']);
});