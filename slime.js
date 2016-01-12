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
      break;
  }
}

function reduceArray(xs, f, acc) {
  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i);
  }

  return acc;
}

function reduceObject(obj, f, acc) {
  var keys = Object.keys(obj);
  
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    acc = f(acc, obj[key], key);
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
  forEach: forEach, 
  head: head,
  last: last,
  init: init, 
  tail: tail
}
