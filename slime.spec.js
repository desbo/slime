const slime = require('./slime');

const array = [1,2,3,4,5];
const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
};

const square = x => x * x;
const even = x => x % 2 === 0;

describe('map', () => {
  it('works on arrays', () => {
    expect(slime.map(array, square)).toEqual([1,4,9,16,25]);
  });
  
  it('works on objects', () => {
    expect(slime.map(object, square)).toEqual([1,4,9,16,25]);
  });
});

describe('filter', () => {
  it('works on arrays', () => {
    expect(slime.filter(array, even)).toEqual([2,4]);
  });
  
  it('works on objects', () => {
    expect(slime.filter(object, even)).toEqual([2,4]);
  });
});

describe('some', () => {
  it('works on arrays', () => {
    expect(slime.some(array, even)).toEqual(true);
    expect(slime.some(array, isNaN)).toEqual(false);
  });
  
  it('works on objects', () => {
    expect(slime.some(object, even)).toEqual(true);
    expect(slime.some(object, isNaN)).toEqual(false);
  });
});

describe('every', () => {
  it('works on arrays', () => {
    expect(slime.every(array, even)).toEqual(false);
    expect(slime.every(array, x => !isNaN(x))).toEqual(true);
  });
  
  it('works on objects', () => {
    expect(slime.every(object, even)).toEqual(false);
    expect(slime.every(array, x => !isNaN(x))).toEqual(true);
  });
});
