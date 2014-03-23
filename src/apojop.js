angular.module('apojop', ['apojop.utils'])

.filter('pretty', ['$sce', 'prettils', function($sce, prettils) {
  return function(object, value, type) {
    if (value === undefined) {
      value = 2;
    } else {
      value = +value;
    }

    if (type === 'columns') {
      return $sce.trustAsHtml(prettils.columns(object, value, '  '));
    }

    return $sce.trustAsHtml(prettils.levels(object, value , '  '));
  };
}]);
