(function () {
    'use strict';

    angular
        .module('menuapp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state("home", {
                url: "/",
                templateUrl: "src/templates/home.template.html"
            })

            .state("categories", {
                url: "/categories",
                templateUrl: "src/templates/main-categories.template.html",
                controller: "CategoryController as cat",
                resolve: {
                    categories: ['MenudataService', function (MenudataService) {
                        return MenudataService.getAllCategories();
                    }]
                }

            })

            .state("items", {
                url: "/list/{shortname}",
                templateUrl: "src/templates/main-items.template.html",
                controller: "MainItemsController as mainItems",
                // resolve: {
                //     items: ['MenuDataService', function (MenuDataService) {
                //         // console.log($stateParams.shortname);
                //         console.log("Here in items");
                //         return MenuDataService.getItemsForCategory();
                //     }]
                // }
            });
    }

}());