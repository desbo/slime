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

describe('scan', () => {
  it('works', () => {
    expect(slime.scan(array, (acc, x) => acc + x, 0)).toEqual([1, 3, 6, 10, 15]);
  });
});

describe('intersperse', () => {
  it('works', () => {
    expect(slime.intersperse(array, 0)).toEqual([1, 0, 2, 0, 3, 0, 4, 0, 5]);
  });
});

describe('flatten', () => {
  it('works', () => {
    expect(slime.flatten([1,[2,[3,[4,[5,6,[7,8]]]]]]))
      .toEqual([1,2,3,4,5,6,7,8]);
  });
});

describe('uniq', () => {
  it('works', () => {
    expect(slime.uniq([1,2,3,4,5,1,2,3,4,5,6])).toEqual([1,2,3,4,5,6]);
    expect(slime.uniq([{ a: 1 }, { a: 1 }, { a: 2 }])).toEqual([{ a: 1 }, { a: 2 }]);
  });
});

describe('equal', () => {
  it('works', () => {
    expect(slime.equal([1,2,3], [1,2,3])).toBeTruthy();
    expect(slime.equal([1,2,3], [4,2,3])).toBeFalsy();
    expect(slime.equal({ a: 1 }, { a: 1})).toBeTruthy();
    expect(slime.equal({ a: 1 }, { a: 2})).toBeFalsy();
  });
});
