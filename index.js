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

function main() {
  init();
  gameLoop();
}

var store = createStore(combineReducers({
  game: game,
  players: players,
  enemies: enemies
}));

var actions = {
  laps: "LAPS",
  checkpoints: "CHECKPOINTS",
  setPlayerDetails: "SET_PLAYER_DETAILS",
  setEnemyDetails: "SET_ENEMY_DETAILS"
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

      var state = store.getState();

      print(getDestinationCommand(state, 0));
      print(getDestinationCommand(state, 1));
  }
}

function getDestinationCommand(state, playerIndex) {
  var dest = getDestination(state, playerIndex);
  return dest.x + ' ' + dest.y + ' ' + dest.thrust;
}

function getDestination(state, playerIndex) {
  var playerDetail = state.players[playerIndex];
  var checkpointToTarget = playerIndex === 0 ? playerDetail.nextCheckPointId : playerDetail.nextCheckPointId + 1
  var next = getDestinationAtCheckpointIndex(state, playerDetail.nextCheckPointId);

  var thrust = state.game.maxThrust / 2;

  return {
    x: next.x,
    y: next.y,
    thrust: thrust
  };
}

function getDestinationAtCheckpointIndex(state, checkpointIndex) {
  var nextCheckpoint = state.game.checkpoints.filter(function(checkpoint) {
    return checkpoint.id === checkpointIndex;
  })[0];

  return {
    x: nextCheckpoint.x,
    y: nextCheckpoint.y
  }
}

function createStore(reducer) {
  var state = {};
  var listeners = [];

  var dispatch = function(action) {
    state = reducer(state, action);
    listeners.forEach(function(listener) { listener(); })
  };

  var getState = function() {
    return state;
  };

  var subscribe = function(listener) {
      listeners = listeners.concat(listener);
      return function() {
        listeners = listeners.filter(function(l) { l !== listener});
      };
  };

  return {
    dispatch: dispatch,
    getState: getState,
    subscribe: subscribe
  }
}

// reducers
var initialGameState = {
  width: 16000,
  height: 9000,
  checkpointRadius: 600,
  podRadius: 600,
  maxThrust: 200,
  maxAngleChange: 18, //degrees
  turnsToMakeItToCheckpoint: 100
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
  return { id: index, x: parseInt(xy[0]), y: parseInt(xy[1]) };
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
};
