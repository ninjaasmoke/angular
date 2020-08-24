"use strict";

(function () {
  'use strict';

  angular.module('data').service('MenudataService', MenudataService).constant('APIBasePath', 'https://davids-restaurant.herokuapp.com');
  MenudataService.$inject = ["$http", "ApiBasePath", "$q"];

  function MenudataService($http, ApiBasePath, $q) {
    var service = this;
    var categories = [];
    var items = [];

    service.getAllCategories = function () {
      var def = $q.defer();
      $http({
        method: "GET",
        url: ApiBasePath + "/categories.json"
      }).then(function (response) {
        var res = response.data;

        for (var index = 0; index < res.length; index++) {
          categories.push(res[index]);
        }

        def.resolve(categories);
      }, function (err) {
        console.error(err);
        def.reject("Failed");
      });
      return def.promise;
    };

    service.getItemsForCategory = function (categoryShortName) {
      console.log("in getItems");
      var def = $q.defer();
      console.log("This is cat: " + categoryShortName);
      $http({
        method: 'GET',
        url: ApiBasePath + '/menu_items.json?category=' + categoryShortName
      }).then(function (response) {
        var res = response.data;
        console.log(res);

        for (var index = 0; index < res.menu_items.length; index++) {
          items.push(res.menu_items[index]);
        }

        def.resolve(items);
        return items;
      }, function (err) {
        console.error(err);
        def.error("Error");
      });
      console.log(def.promise);
      return def.promise; // var def = $q.defer();
      // $http({
      //     method: "GET",
      //     url: (ApiBasePath + "/categories.json")
      // }).then(
      //     function (response) {
      //         console.log(response);
      //         var res = response.data;
      //         for (let index = 0; index < res.length; index++) {
      //             categories.push(res[index])
      //         }
      //         def.resolve(categories);
      //     },
      //     function (err) {
      //         console.error(err);
      //         def.reject("Failed");
      //     }
      // );
      // return def.promise;
    };
  }
})();