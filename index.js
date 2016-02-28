// for tests
if (typeof readline != 'function') {
  readline = function() { return ""; }
}
if(typeof print != 'function') {
  print = console.log;
}
if(typeof printErr != 'function') {
  printErr = console.error;
}

var runImmediately = typeof process !== 'object';

var state = {
  game: {
    width: 16000,
    height: 9000
  }
};

var actions = {
  laps: "LAPS"
}

function main() {
  init();
  gameLoop();
}

function init() {
  var laps = parseInt(readline());
  var checkpointCount = parseInt(readline());
  for (var i = 0; i < checkpointCount; i++) {
      var inputs = readline().split(' ');
      var checkpointX = parseInt(inputs[0]);
      var checkpointY = parseInt(inputs[1]);
  }
}

function gameLoop() {
  while (true) {
      for (var i = 0; i < 2; i++) {
          var inputs = readline().split(' ');
          var x = parseInt(inputs[0]);
          var y = parseInt(inputs[1]);
          var vx = parseInt(inputs[2]);
          var vy = parseInt(inputs[3]);
          var angle = parseInt(inputs[4]);
          var nextCheckPointId = parseInt(inputs[5]);
      }
      for (var i = 0; i < 2; i++) {
          var inputs = readline().split(' ');
          var x = parseInt(inputs[0]);
          var y = parseInt(inputs[1]);
          var vx = parseInt(inputs[2]);
          var vy = parseInt(inputs[3]);
          var angle = parseInt(inputs[4]);
          var nextCheckPointId = parseInt(inputs[5]);
      }

      // Write an action using print()
      // To debug: printErr('Debug messages...');

      print('8000 4500 100');
      print('8000 4500 100');
  }
}

// reducers
function reducer(state, action) {
  state = state || {};
  if(!action) return state;

  switch(action.type) {
    case actions.laps:
      return state;
  }
}

function assign(target) {
  'use strict';
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

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

if(runImmediately) {
  main();
}

module.exports = { assign: assign }
