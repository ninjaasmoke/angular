// Tight Coupling


// var student = {
//     name: "",
//     type: "student"
// };

// document.addEventListener(
//     'DOMContentLoaded', contentLoaded
// )

// function contentLoaded(event) {
//     document.getElementById('name').addEventListener("keyup", keyUp);
// }

// function keyUp(event) {
//     calculateNumIp();
// }

// function calculateNumIp() {
//     student.name = document.getElementById("name").value;

//     var totalNamValue = 0;
//     for (let index = 0; index < student.name.length; index++) {
//         totalNamValue += student.name.charCodeAt(index);
//     }

//     var output = "Total numeric val : " + totalNamValue;
//     document.getElementById("output").innerText = output;
// }


// Loose Coupling

// IIFE
(
    function () {
        'use strict';

        angular.module('DiApp', [])
            .controller('DiController', DiController);

        DiController.$inject = ["$scope", "$filter"];

        function DiController($scope, $filter) {
            $scope.name = "Nithin";

            $scope.upper = function () {
                var upCase = $filter('uppercase');
                $scope.name = upCase($scope.name);
            }


        }

    }
)();