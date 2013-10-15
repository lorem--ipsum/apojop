angular.module('npp', ['ng-pojo-print'])

.config(function config($routeProvider) {
  $routeProvider
    .when('/', {controller: 'DemoCtrl', templateUrl: 'views/main.html'})
    .otherwise({redirectTo: '/'});
})

.controller('DemoCtrl', function($scope) {
  $scope.examples = [
    {foo: 'bar'}
  ];
});