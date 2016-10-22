(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var itemsController = this;
  itemsController.items = items.menu_items;
  itemsController.category = items.category;
}

})();
