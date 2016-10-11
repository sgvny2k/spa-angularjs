(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuytItems();
  toBuyList.markItem = function(index) {
    ShoppingListCheckOffService.markItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    {name: "Cookies", quantity: 10},
    {name: "Apples", quantity: 15},
    {name: "Coffee jars", quantity: 3},
    {name: "Sugar packs", quantity: 2},
    {name: "Cups", quantity: 4},
  ];
  var boughtItems = [];

  service.markItem = function (itemIdex) {
    var boughtItem = toBuyItems.splice(itemIdex, 1);
    boughtItems.push({name: boughtItem[0].name, quantity: boughtItem[0].quantity});
    console.log(boughtItem, boughtItems);
  };

  service.getToBuytItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
