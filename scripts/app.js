angular.module('npp', ['apojop'])

.config(function config($routeProvider) {
  $routeProvider
    .when('/', {controller: 'DemoCtrl', templateUrl: 'views/main.html'})
    .otherwise({redirectTo: '/'});
})

.controller('DemoCtrl', function($scope) {
  $scope.max_columns = 80;
  $scope.max_depth = 2;
  
  $scope.example = {
    axes: {
      x: {type: "date", tooltipFormatter: function (d) {return moment(d).fromNow();}, key: "x"},
      y: {type: "linear"}
    },
    series: [
      {y: "val_0", label: "A time series", color: "#9467bd"}
    ],
    lineMode: "linear",
    tooltipMode: "default"
  };
});