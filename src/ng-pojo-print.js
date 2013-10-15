angular.module('ng-pojo-print', ['ng-pojo-print.utils'])

.filter('pretty', ['prettils', function(prettils) {
  return function(object, value, type) {
    if (value === undefined) {
      value = 2;
    }

    if (type === 'columns') {
      return prettils.columns(object, value, '  ');
    }

    return prettils.levels(object, value , '  ');
  };
}]);