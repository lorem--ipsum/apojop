describe('utils', function() {
  beforeEach(module('ng-pojo-print.utils'));

  var _oldColor;

  describe('prettils', function() {
    beforeEach(inject(function(format) {
      _oldColor = format.color;

      format.color = function(string, value) {return string;};
    }));

    afterEach(inject(function(format) {
      format.color = _oldColor;
    }));

    describe('formatting by columns', function() {
      it('should indent only when the given column is reached', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};


        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: {qux: {pouet: 42}}',
          '}'
        ].join('\n');

        expect(prettils.columns(given, 25, '  ')).toBe(expectation);
      }));

      it('should fold everything when an excessive column is given', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};

        var expectation = '{foo: "bar", baz: {qux: {pouet: 42}}}';

        expect(prettils.columns(given, 250000, '  ')).toBe(expectation);
      }));


      it('should unfold everything when a tiny column is given', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};

        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: {',
          '    qux: {',
          '      pouet: 42',
          '    }',
          '  }',
          '}'
        ].join('\n');

        expect(prettils.columns(given, 3, '  ')).toBe(expectation);
      }));

      it('should work with inline arrays', inject(function(prettils) {
        var given = {foo: 'bar', baz: ['qux', {pouet: 42}]};

        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: ["qux", {pouet: 42}]',
          '}'
        ].join('\n');

        expect(prettils.columns(given, 30, '  ')).toBe(expectation);
      }));

      it('should work with unfolded arrays', inject(function(prettils) {
        var given = {foo: 'bar', baz: ['qux', {pouet: 42}]};

        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: [',
          '    "qux",',
          '    {pouet: 42}',
          '  ]',
          '}'
        ].join('\n');

        expect(prettils.columns(given, 20, '  ')).toBe(expectation);
      }));

      it('should work with a level equal to zero', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};

        var expectation = '{foo: "bar", baz: {qux: {pouet: 42}}}';

        expect(prettils.levels(given, 0, '  ')).toBe(expectation);
      }));
    });

    describe('formatting by levels', function() {
      it('should stop at the given level', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};


        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: {qux: {pouet: 42}}',
          '}'
        ].join('\n');

        expect(prettils.levels(given, 1, '  ')).toBe(expectation);
      }));

      it('should work with an excessive max level given', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};


        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: {',
          '    qux: {',
          '      pouet: 42',
          '    }',
          '  }',
          '}'
        ].join('\n');

        expect(prettils.levels(given, 100, '  ')).toBe(expectation);
      }));

      it('should work with a level equal to zero', inject(function(prettils) {
        var given = {foo: 'bar', baz: {qux: {pouet: 42}}};

        var expectation = '{foo: "bar", baz: {qux: {pouet: 42}}}';

        expect(prettils.levels(given, 0, '  ')).toBe(expectation);
      }));

      it('should work with inline arrays', inject(function(prettils) {
        var given = {foo: 'bar', baz: ['qux', {pouet: 42}]};

        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: ["qux", {pouet: 42}]',
          '}'
        ].join('\n');

        expect(prettils.levels(given, 1, '  ')).toBe(expectation);
      }));
      
      it('should work with unfolded arrays', inject(function(prettils) {
        var given = {foo: 'bar', baz: ['qux', {pouet: 42}]};

        var expectation = [
          '{',
          '  foo: "bar",',
          '  baz: [',
          '    "qux",',
          '    {pouet: 42}',
          '  ]',
          '}'
        ].join('\n');

        expect(prettils.levels(given, 2, '  ')).toBe(expectation);
      }));
    });
  });
});