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
    {
      a_string: 'ipsum',
      a_date: new Date(),
      a_boolean: true,
      an_obj: {ping: 'pong', a_closure: function(a, b) {return (a && b) ? a + b : NaN;}},
      an_array: ['lorem', 'ispum', 'dolor', 'sit', 'amet', 1337]
    },
    {
      a_string: 'hello',
      a_date: new Date(),
      a_boolean: true,
      an_obj: {ping: 'is', a_closure: function(a, b) {return (a && b) ? a + b : NaN;}},
      an_array: ['it', 'tea', 'you\'re', 'looking', 'for', 1337]
    }
  ];
});