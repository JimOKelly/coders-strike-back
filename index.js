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

function curry(fn, scope) {
    scope = scope || window;

    var args = [];
    for (var i = 2, len = arguments.length; i < len; ++i) {
        args.push(arguments[i]);
    }

    return function() {
        var args2 = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        var argstotal = args.concat(args2);

        return fn.apply(scope, argstotal);
    };
}

var reducer = combineReducers({
  game: game,
  players: players,
  enemies: enemies
});

var store = createStore(reducer);

var actions = {
  laps: "LAPS",
  checkpoints: "CHECKPOINTS",
  setPlayerDetails: "SET_PLAYER_DETAILS",
  setEnemyDetails: "SET_ENEMY_DETAILS"
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
}

function gameLoop() {
  while (true) {
      for (var i = 0; i < 2; i++) {
        store.dispatch({type: actions.setPlayerDetails, id: i, input: readline()});
      }
      for (var i = 0; i < 2; i++) {
        store.dispatch({type: actions.setEnemyDetails, id: i, input: readline()});
      }

      printErr(json(store.getState()));
      // Write an action using print()
      // To debug: printErr('Debug messages...');

      print('8000 4500 100');
      print('8000 4500 100');
  }
}

function createStore(reducer) {
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
}

// reducers
var initialGameState = {
  width: 16000,
  height: 9000
};

function game(state, action) {
  state = state || initialGameState;

  switch(action.type) {
    case actions.laps:
      return assign({}, state, {
        laps: action.laps
      });
    case actions.checkpoints:
      return assign({}, state, {
        checkpoints: action.checkpoints.map(toCheckPoint)
      });
    default:
      return state;
  }
}

function toCheckPoint(input, index) {
  var xy = input.split(' ');
  return { id: index + 1, x: parseInt(xy[0]), y: parseInt(xy[1]) };
}

function players(state, action) {
  state = state || [];

  switch(action.type) {
    case actions.setPlayerDetails:
      return setDetails(state, toDetail(action.id, action.input));
    default:
      return state;
  }
}

function enemies(state, action) {
  state = state || [];

  switch(action.type) {
    case actions.setEnemyDetails:
      return setDetails(state, toDetail(action.id, action.input));
    default:
      return state;
  }
}

// detail.id is expected
function setDetails(state, detail) {
  var existing = state.filter(function(d) {
    return d.id === detail.id
  });

  if(state.length === 0 || !existing.length) {
    return state.concat(detail);
  } else {
    var index = state.indexOf(existing[0]);
    return replace(state, detail, index);
  }
}

function toDetail(id, input) {
  var inputs = input.split(' ');
  return {
    id: id,
    x: parseInt(inputs[0]),
    y: parseInt(inputs[1]),
    vx: parseInt(inputs[2]),
    vy: parseInt(inputs[3]),
    angle: parseInt(inputs[4]),
    nextCheckPointId: parseInt(inputs[5])
  };
}

function replace(arr, obj, index) {
  return arr.slice(0, index)
    .concat([obj])
    .concat(arr.slice(index + 1, arr.length));
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
  game: game,
  players: players,
  enemies: enemies,
  actions: actions,
  range: range,
  toCheckPoint: toCheckPoint,
  replace: replace,
  setDetails: setDetails
}
