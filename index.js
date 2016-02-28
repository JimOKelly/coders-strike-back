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

var reducer = combineReducers({
  game: game
});

var createStore = function(reducer) {
  var state = {};
  var dispatch = function(action) {
    state = reducer(state, action);
  };

  var getState = function() {
    return state;
  };

  return {
    dispatch: dispatch,
    getState: getState
  }
};

var store = createStore(reducer);

var actions = {
  laps: "LAPS",
  checkpoints: "CHECKPOINTS"
}

function main() {
  init();
  gameLoop();
}

function init() {
  store.dispatch({type: actions.laps, laps: parseInt(readline())})

  var checkpointCount = parseInt(readline());
  var checkpoints = range(checkpointCount).map(function() {
    return readline();
  });
  store.dispatch({type: actions.checkpoints, checkpoints: checkpoints});
  // for (var i = 0; i < checkpointCount; i++) {
  //     var inputs = readline().split(' ');
  //     var checkpointX = parseInt(inputs[0]);
  //     var checkpointY = parseInt(inputs[1]);
  // }
  printErr(json(store.getState()));
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
var initialGameState = {
  width: 16000,
  height: 9000
};

function game(state, action) {
  state = state || initialGameState;

  if(!action) return state;

  switch(action.type) {
    case actions.laps:
      return assign({}, state, {
        laps: action.laps
      });
    case actions.checkpoints:
      return assign({}, state, {
        checkpoints: action.checkpoints.map(toCheckPoint)
      })
    default:
      return state;
  }
}

function toCheckPoint(input) {
  var xy = input.split(' ')
  return { x: parseInt(xy[0]), y: parseInt(xy[1]) };
}

function combineReducers(reducers) {
  return function(state, action) {
    state = state || {}
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
}

// helpers

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

function json(obj) {
  return JSON.stringify(obj);
}

function range(n) {
  var arr = [];
  for(var i = 0; i < n; i++) {
    arr.push(i);
  }

  return arr;
}

if(typeof process !== 'object') {
  main();
}

module.exports = {
  assign: assign,
  gameReducer: game,
  actions: actions,
  range: range,
  toCheckPoint: toCheckPoint
}
