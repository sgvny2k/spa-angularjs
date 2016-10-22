(function () {
'use strict';

angular.module('MenuApp')
.component('itemsComponent', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
