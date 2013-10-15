angular.module('npp', ['ng-pojo-print'])

.controller('DemoCtrl', function($scope) {
  $scope.examples = [
    {foo: 'bar'}
  ];
});