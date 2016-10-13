(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      // bind props (1-way)
      items: '<',
      searched: '<',
      // bind method
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];
  menu.searched = false;

  /**
   * Handle click event for "Narrow It Down For Me!" button
   * Call MenuSearchService's getMatchedMenuItems promise to return menu items
   * that matched search term in their descriptions.
   */
  menu.search = function() {
    // clear the existing menu first
    menu.found = [];
    menu.searched = false;

    if (!menu.searchTerm) {
      menu.searched = true;
      return;
    }

    // get new items with a promise
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function(foundItems) {
      // save the filtered items to controller's property
      menu.found = foundItems;
      menu.searched = true;
    }).catch(function (error) {
      console.error("Error:", error);
      menu.searched = true;
    });
  };

  menu.removeItem = function(idx) {
    // remove an item from the showing list using its index
    menu.found.splice(idx, 1);
  };
}

MenuSearchService.$inject = ['$http', '$filter', 'ApiBasePath']
function MenuSearchService($http, $filter, ApiBasePath) {
  var service = this;

  /**
   * Fetch menu from heroku server and filter the result with the input search term
   */
  service.getMatchedMenuItems = function(searchTerm) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response) {
      var menuItems = response.data && response.data.menu_items;
      return $filter('filter')(menuItems, {'description': searchTerm});
    }).catch(function (error) {
      console.error("Error:", error);
    });

    return promise;
  }
}

})();
