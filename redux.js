const actions = require('./actions');
const utils = require('./utils');

module.exports = {
  getStore: getStore
};

function getStore() {
  return createStore(combineReducers({
    game: game,
    players: players,
    enemies: enemies
  }));
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
    case actions.turn:
      return utils.assign({}, state, {
        turn: state.turn ? state.turn + 1 : 1
      })
    case actions.laps:
      return utils.assign({}, state, {
        laps: action.laps
      });
    case actions.checkpoints:
      return utils.assign({}, state, {
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
