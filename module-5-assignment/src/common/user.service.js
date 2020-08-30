(
    function () {
        'use strict';

        angular.module('common')
            .service('UserService', UserService);

        UserService.$inject = ['$http', 'ApiPath'];

        function UserService($http, ApiPath) {
            var service = this;
            var userData = new Array();
            service.getUserFavMenu = function (favMenuShortName) {
                return $http.get(ApiPath + "/menu_items/" + favMenuShortName + ".json")
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        console.error(error);
                    });
            };
            service.setUserData = function (userDetails) {
                userData = [];
                userData.push(userDetails);
            };
            service.getUserData = function () {
                return userData;
            };
        }
    }
)();