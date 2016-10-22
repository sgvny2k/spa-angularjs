(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // List all categories
  .state('categories', {
    url: '/categories',
    template: '<categories-component items="categoriesCtrl.items"></categories-component>',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryShortName}',
    template: '<items-component items="itemsCtrl.items" category="itemsCtrl.category"></items-component>',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();
