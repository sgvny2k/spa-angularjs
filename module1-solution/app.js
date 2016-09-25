(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.lunchMenu = "";

  // Create a new array containing no empty items from the input array
  var filterEmptyItems = function(list) {
    var items = [];
    list.forEach(function(item) {
      var trimmedItem = item.trim();
      console.log(item, trimmedItem.length);
      if (trimmedItem.length > 0) items.push(item);
    });
    return items;
  };

  $scope.checkLunch = function () {
    if ($scope.lunchMenu.length === 0) {
      $scope.message = "Please enter data first";
      $scope.msgColor = "Red";
      return;
    }

    var items = $scope.lunchMenu.split(",");
    items = filterEmptyItems(items);
    console.log(items);
    $scope.message = (items.length > 3) ? "Too much!" : "Enjoy!";
    $scope.msgColor = "Green";
  };


}

})();
