(
    function () {
        'use strict';

        angular.module("LunchCheck", [])
            .controller("LunchCheckController", LunchCheckController);


        LunchCheckController.$inject = ["$scope"];


        function LunchCheckController($scope) {
            $scope.list = "";
            $scope.message = "";

            $scope.checkTooMuch = function () {
                removeWhiteSpaces();
                var items = getItemsList();
                var numberofItems = getNumberofItems(items);
                var message = "Message for you: ";
                message += checkTooMuch(numberofItems); // function OVERLOADING ??? NOPE, this doesnt belong to $scope
                setMessage(message);
            };

            function removeWhiteSpaces() {
                $scope.list.replace(/\s/g, "");
            }

            function setMessage(message) {
                $scope.message = message;
            }

            function getItemsList() {
                if ($scope.list != null && $scope.list.length != 0)
                    return $scope.list.split(',');
                else return 0;
            }

            function getNumberofItems(items) {
                if (items != 0) {
                    var num = 0;
                    for (let index = 0; index < items.length; index++) {
                        if (items[index] !== " " && items[index] !== "")
                            num += 1;
                    }
                    return num;
                } else return 0;
            }

            function checkTooMuch(num) { // function out of $scope, so it CAN have same name
                if (num === 0) {
                    return 'Eat SOMETHING!!!';
                }
                if (num > 3) {
                    return 'TOO MUCH!!!';
                }
                if (1 < num < 3) {
                    return 'Enjoy!';
                }
            }
        }
    }
)();