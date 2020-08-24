"use strict";

(function () {
  'use strict';

  angular.module('menuapp').controller('CategoryController', CategoryController);
  CategoryController.$inject = ['categories'];

  function CategoryController(categories) {
    var cat = this;
    console.log(categories);
    cat.categories = categories;
  }
})();