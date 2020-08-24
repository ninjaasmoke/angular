(function () {
    'use strict';

    angular.module('menuapp')
        .component('categories', {
            templateUrl: 'src/templates/categories.template.html',
            bindings: {
                categories: '<', // one-way
            },
        });
})();