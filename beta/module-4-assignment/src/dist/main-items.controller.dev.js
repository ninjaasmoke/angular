"use strict";

(function () {
  'use strict';

  angular.module('menuapp').controller('MainItemsController', MainItemsController);
  MainItemsController.$inject = ["MenudataService", "$stateParams"];

  function MainItemsController(MenudataService, $stateParams) {
    var mainItems = this;
    console.log("IN MainItemsController");
    mainItems.items = [];
    MenudataService.getItemsForCategory($stateParams.shortname).then(function (res) {
      console.log(res); // mainItems.categoryShortName = res.category.short_name;
      // mainItems.categoryName = res.category.name;

      mainItems.items = res;
    });
    mainItems.items = [];
  }
})();