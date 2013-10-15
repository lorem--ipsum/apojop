angular.module('apojop', ['apojop.utils'])

.filter('pretty', ['prettils', function(prettils) {
  return function(object, value, type) {
    if (value === undefined) {
      value = 2;
    } else {
      value = +value;
    }

    if (type === 'columns') {
      return prettils.columns(object, value, '  ');
    }

    return prettils.levels(object, value , '  ');
  };
}]);