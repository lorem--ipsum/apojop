angular.module('apojop.utils', [])

.factory('check', function() {
  return {
    primitive: function(value) {
      return ['string', 'number', 'function', 'boolean'].indexOf(typeof value) !== -1;
    }
  };
})

.factory('$length', ['format', 'check', function(format, check) {
  return {
    of: function(object) {
      if (check.primitive(object)) {
        return format.primitive(object).raw.length;
      }

      var lines = [];
      if (angular.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
          lines.push(this.of(object[i]));
        }
      } else {
        for (var key in object) {
          lines.push(format.key(key).raw.length + this.of(object[key]));
        }
      }

      return lines.reduce(function(a, b) {return a+b;}, 0) + 2 + 2*lines.length;
    }
  };
}])

.factory('format', function() {
  return {
    color: function(string, value) {
      return '<span style="' + (value ? 'color: ' + value + ';' : '') + '">' + string  + '</span>';
    },

    key: function(value) {
      return {
        colored: this.color(value, "#B919A8") + ': ',
        raw: value + ': '
      };
    },

    primitive: function(value) {
      var raw = '';
      var colored = '';

      if (angular.isDate(value)) {
        return this.date(value);
      }

      if (typeof value === 'string') {
        colored = this.color('"' + value + '"', 'red');
        raw = '"' + value + '"';
      }

      if (typeof value === 'number') {
        colored = this.color(value, 'blue');
        raw = '' + value;
      }

      if (typeof value === 'function') {
        colored = this.color(value.toString(), '');
        raw = value.toString();
      }

      if (typeof value === 'boolean') {
        colored = this.color(value.toString(), 'green');
        raw = value.toString();
      }

      return {raw: raw, colored: colored};
    },

    date: function(date) {
      return {
        colored: this.color('new', 'green') + ' Date(' + this.primitive(date.getTime()).colored + ')',
        raw: 'new Date(' + this.primitive(date.getTime()).raw + ')'
      };
    }
  };
})

.factory('prettils', ['format', 'check', '$length', function(format, check, $length) {
  return {
    levels: function(object, depth, padding) {
      if (check.primitive(object)) {
        return format.primitive(object).colored;
      }

      if (depth === 0) {
        return this.flatten(object);
      }

      var isArray = angular.isArray(object);

      var lines = [];
      if (isArray) {
        for (var i = 0; i < object.length; i++) {
          lines.push(padding + this.levels(object[i], depth - 1, padding + '  '));
        }
      } else {
        for (var key in object) {
          lines.push(padding + format.key(key).colored + this.levels(object[key], depth - 1, padding + '  '));
        }
      }

      padding = padding.replace(/.{2}$/, '');

      return (isArray ? '[' : '{') + '\n' + lines.join(',\n') + '\n' + padding + (isArray ? ']' : '}');
    },

    columns: function(object, wideness, padding) {
      if (check.primitive(object)) {
        return format.primitive(object).colored;
      }

      if ($length.of(object) <= wideness) {
        return this.flatten(object);
      }

      var isArray = angular.isArray(object);

      var lines = [];
      if (isArray) {
        for (var i = 0; i < object.length; i++) {
          lines.push(padding + this.columns(object[i], wideness, padding + '  '));
        }
      } else {
        for (var key in object) {
          lines.push(padding + format.key(key).colored + this.columns(object[key], wideness, padding + '  '));
        }
      }

      padding = padding.replace(/.{2}$/, '');

      return (isArray ? '[' : '{') + '\n' + lines.join(',\n') + '\n' + padding + (isArray ? ']' : '}');
    },

    flatten: function(object) {
      if (check.primitive(object)) {
        return format.primitive(object).colored;
      }

      var isArray = angular.isArray(object);

      var lines = [];
      if (isArray) {
        for (var i = 0; i < object.length; i++) {
          lines.push(this.flatten(object[i]));
        }
      } else {
        for (var key in object) {
          lines.push(format.key(key).colored + this.flatten(object[key]));
        }
      }

      return (isArray ? '[' : '{') + lines.join(', ') + (isArray ? ']' : '}');
    }
  };
}]);