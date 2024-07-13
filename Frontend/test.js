// test for testing tests.  Pulled from https://www.robinwieruch.de/react-testing-library/

describe('true is truthy and false is falsy', () => {
    it('true is truthy', () => {
      expect(true).toBe(true);
    });
  
    it('false is falsy', () => {
      expect(false).toBe(false);
    });
});


// This one is from https://jestjs.io/docs/getting-started

test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});
