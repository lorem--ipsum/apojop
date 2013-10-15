angular.module('npp', ['apojop'])

.config(function config($routeProvider) {
  $routeProvider
    .when('/', {controller: 'DemoCtrl', templateUrl: 'views/main.html'})
    .otherwise({redirectTo: '/'});
})

.controller('DemoCtrl', function($scope) {
  $scope.max_columns = 80;
  $scope.max_depth = 2;
  
  $scope.example = [
    {lorem: 'ipsum', dolor: new Date(), is_it: true, obj: {foo: 'bar'}}
  ];
});