module.exports = {
  range: range,
  assign: assign
}

function range(n) {
  var arr = []
  for(var i = 0; i < n; i++) {
    arr = arr.concat([i])
  }

  return arr
}

function assign(target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
  }
  return output;
}
