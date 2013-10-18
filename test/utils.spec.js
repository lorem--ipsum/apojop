describe('utils', function() {
  beforeEach(module('apojop.utils'));

  describe('check factory', function() {
    it('should say strings are primitive', inject(function(check) {
      expect(check.primitive('toto')).toBeTruthy();
    }));

    it('should say numbers are primitive', inject(function(check) {
      expect(check.primitive(12)).toBeTruthy();
    }));

    it('should say functions are primitive', inject(function(check) {
      expect(check.primitive(function() {})).toBeTruthy();
    }));

    it('should say dates are primitive', inject(function(check) {
      expect(check.primitive(new Date())).toBeTruthy();
    }));

    it('should say objects are not primitive', inject(function(check) {
      expect(check.primitive({foo: 'bar', baz: 12})).toBeFalsy();
    }));

    it('should say null is a primitive', inject(function(check) {
      expect(check.primitive(null)).toBeTruthy();
    }));

    it('should say undefined is a primitive', inject(function(check) {
      expect(check.primitive(undefined)).toBeTruthy();
    }));
    
    it('should say arrays are not primitive', inject(function(check) {
      expect(check.primitive(['bar', 12])).toBeFalsy();
    }));
  });

  describe('format factory', function() {
    it('should format key', inject(function(format) {
      expect(format.key('foo')).toEqual(
        {colored: '<span style="color: #B919A8;">foo</span>: ', raw: 'foo: '}
      );
    }));
    
    it('should format a date', inject(function(format) {
      expect(format.primitive(new Date(1381818960764))).toEqual({
        colored: '<span style="color: green;">new</span> Date(<span style="' +
          'color: blue;">1381818960764</span>)',
        raw: 'new Date(1381818960764)'
      });
    }));

    it('should format a string', inject(function(format) {
      expect(format.primitive('toto')).toEqual({
        raw: '"toto"',
        colored: '<span style="color: red;">"toto"</span>'
      });
    }));

    it('should format a number', inject(function(format) {
      expect(format.primitive(42)).toEqual({
        raw: '42',
        colored: '<span style="color: blue;">42</span>'
      });
    }));

    it('should format a boolean', inject(function(format) {
      expect(format.primitive(false)).toEqual({
        raw: 'false',
        colored: '<span style="color: green;">false</span>'
      });
    }));

    it('should format null or undefined', inject(function(format) {
      expect(format.primitive(null)).toEqual({
        raw: 'null',
        colored: '<span style="color: green;">null</span>'
      });

      expect(format.primitive(undefined)).toEqual({
        raw: 'undefined',
        colored: '<span style="color: green;">undefined</span>'
      });
    }));

    it('should format a function', inject(function(format) {
      expect(format.primitive(function(foo) {return foo + 12;})).toEqual({
        raw: 'function (foo) {return foo + 12;}',
        colored: '<span style="">function (foo) {return foo + 12;}</span>'
      });
    }));
  });
});