(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenuDataService($q, $http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function(result) {
      return result.data;
    }).catch(function (error) {
      console.error("Error while getting categories:", error);
    });

    return promise;
  };

  service.getItemsForCategory = function(categoryShortName) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {category: categoryShortName}
    }).then(function(result) {
      return result.data && result.data.menu_items;
    }).catch(function (error) {
      console.error("Error while getting menu items:", error);
    });

    return promise;
  };
}

})();
