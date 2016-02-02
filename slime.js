function head(xs) {
  return xs[0];
}

function last(xs) {
  return xs[xs.length - 1];
}

function init(xs) {
  return xs.slice(0, xs.length - 1);
}

function tail(xs) {
  return xs.slice(1, xs.length);
}

function reduce(xs, f, acc) {
  switch (xs.constructor) {
    case Array:
      return reduceArray(xs, f, acc);

    case Object:
      return reduceObject(xs, f, acc);

    default:
      throw new TypeError('nah');
  }
}

function reduceArray(xs, f, acc) {
  if (xs.length) {
    for (var i = 0; i < xs.length; i++) {
      acc = f(acc, xs[i], i);
    }
  }
  
  return acc;
}

function reduceObject(obj, f, acc) {
  var keys = Object.keys(obj);
  
  if (keys.length) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      acc = f(acc, obj[key], key);
    }
  }

  return acc;
}

function scan(xs, f, acc) {
  var result = [];

  for (var i = 0; i < xs.length; i++) {
    acc = result[result.push(f(acc, xs[i])) - 1];
  }

  return result;
}

function map(xs, f) {
  return reduce(xs, function(acc, x, i) {
    return acc.concat(f(x, i));
  }, []);
}

function filter(xs, f) {
  return reduce(xs, function(acc, x, i) {
    return f(x, i) ? acc.concat(x) : acc;
  }, []);
}

function some(xs, f) {
  return reduce(xs, function(acc, x, i) {
    return f(x, i) ? true : acc;
  }, false);
}

function every(xs, f) {
  return reduce(xs, function(acc, x, i) {
    return f(x, i) ? acc : false;
  }, true);
}

function zipWith(xs, ys, f) {
  return reduce(xs, function(acc, x, i) {
    if (!ys[i]) return acc;
    return acc.concat(f(x, ys[i]));
  }, []);
}

function zip(xs, ys) {
  return zipWith(xs, ys, function(x, y) {
    return [x, y];
  });
}

function iterable(x) {
  return x.constructor === Array ||
         x.constructor === Object;
}

function equal(x, y) {
  if (x === y) return true;
  
  if (x.constructor === y.constructor && iterable(x)) {
    return every(zipWith(x, y, function (xx, yy) {
      return equal(xx, yy);
    }), function (bool) {
      return !!bool;
    });
  }

  return false;
}

function contains(xs, y) {
  return xs.some(function (x) {
    return equal(x, y);
  });
}

function uniq(xs) {
  return reduce(xs, function(acc, x, i) {
    if (!contains(acc, x)) return acc.concat(x);
    return acc;
  }, []);
}

function intersperse(xs, a) {
  return init(reduce(xs, function(acc, x) {
    return acc.concat([x, a]);
  }, []));
}

function flatten(xs) {
  if (xs.constructor === Array) {
    return reduce(xs, function(acc, x) {
      return acc.concat(flatten(x));
    }, []);
  }

  return xs;
}

function forEach(xs, f) {
  for (var i = 0; i < xs.length; i++) {
    f(xs[i], i);
  }
}

module.exports = {
  reduce: reduce,
  scan: scan,
  map: map,
  filter: filter,
  some: some,
  every: every,
  intersperse: intersperse,
  flatten: flatten,
  forEach: forEach, 
  head: head,
  last: last,
  init: init, 
  tail: tail,
  contains: contains,
  uniq: uniq, 
  equal: equal,
  zip: zip
};
