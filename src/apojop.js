angular.module('apojop', ['apojop.utils'])

.filter('pretty', ['$filter', function($filter) {
  return function(object, value, type) {
    return $filter('safe')($filter('prettyUnsafe')(object, value, type));
  };
}])

.filter('indent', ['prettils', function(prettils) {
  return function(object, value, type) {
    if (value === undefined) {
      value = 2;
    } else {
      value = +value;
    }

    if (type === 'columns') {
      return prettils.columns(object, value, '  ', true);
    }

    return prettils.levels(object, value , '  ', true);
  };
}])


.filter('prettyUnsafe', ['prettils', function(prettils) {
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
}])

.filter('safe', ['$sce', function($sce) {
  return $sce.trustAsHtml;
}])

;
