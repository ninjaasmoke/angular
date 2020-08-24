"use strict";

(function () {
  'use strict';

  angular.module('menuapp').component('items', {
    templateUrl: 'src/templates/items.template.html',
    bindings: {
      list: '<?'
    }
  });
})();