describe('apojop', function() {
  beforeEach(module('apojop'));
  
  beforeEach(inject(function(prettils) {
    spyOn(prettils, 'columns').andCallThrough();
    spyOn(prettils, 'levels').andCallThrough();
  }));

  it('should route towards columns prettyfying', inject(function(prettyFilter, prettils) {
    var givenObject = {foo: 42};
    prettyFilter(givenObject, 80, 'columns');
    
    expect(prettils.levels).not.toHaveBeenCalled();
    
    expect(prettils.columns).toHaveBeenCalledWith(givenObject, 80, '  ');
  }));
  
  it('should route towards levels prettyfying', inject(function(prettyFilter, prettils) {
    var givenObject = {foo: 42};
    prettyFilter(givenObject, 3, 'levels');
    
    expect(prettils.columns).not.toHaveBeenCalled();
    
    expect(prettils.levels).toHaveBeenCalledWith(givenObject, 3, '  ');
  }));
  
  it('should default to levels prettyfying with a depth of 2', inject(function(prettyFilter, prettils) {
    var givenObject = {foo: 42};
    prettyFilter(givenObject);
    
    expect(prettils.columns).not.toHaveBeenCalled();
    expect(prettils.levels).toHaveBeenCalledWith(givenObject, 2, '  ');
  }));
  
  it('should detect invalid value for type', inject(function(prettyFilter, prettils) {
    var givenObject = {foo: 42};
    prettyFilter(givenObject, 12, 'pouet');
    
    expect(prettils.columns).not.toHaveBeenCalled();
    expect(prettils.levels).toHaveBeenCalledWith(givenObject, 12, '  ');
  }));
  
  it('should cast string values to number', inject(function(prettyFilter, prettils) {
    var givenObject = {foo: 42};
    prettyFilter(givenObject, "12", 'pouet');
    
    expect(prettils.columns).not.toHaveBeenCalled();
    expect(prettils.levels).toHaveBeenCalledWith(givenObject, 12, '  ');
  }));
});