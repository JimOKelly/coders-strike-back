let state = {
  game: {
    width: 16000,
    height: 9000
  }
};
const reducer = combineReducers({
  game: game,
  checkpoints: checkpoints
});

const store = createStore(reducer);

start();

function start() {
  init();

  // game loop
  while (true) {
      step();
  }
}

// actions
const actions = {
  game: "GAME",
  laps: "LAPS",
  checkpoints: "CHECKPOINTS"
};

function init() {
  const game = {
    width: 16000,
    height: 9000,
    maxThrust: 200
  };
  store.dispatch({type: actions.game, game: game})
  store.dispatch({type: actions.laps, input: readline()});

  var checkpointCount = parseInt(readline());
  store.dispatch({type: actions.checkpoints, inputs: range(checkpointCount).map(x => readline())})

  printErr(getStateAsJson(store));
}

function step() {
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

function getState() {
  return store ? store.getState() : state;
}

// reducers
function game(state = {}, action = {}) {
  switch(action.type) {
    case actions.game:
      return assign({}, state, action.game);
    case actions.laps:
      return assign({}, state, {
        laps: parseInt(action.input)
      });
    default:
      return state;
  }
}

function checkpoints(state = [], action = {}) {
  switch(action.type) {
    case actions.checkpoints:
      return action.inputs.map(input => getCheckPoint(input))
    default:
      return state;
  }
}

function getCheckPoint(input) {
    var [x, y] = input.split(' ');
    return {x: x, y: y};
}

//redux
function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners = listeners.concat(listener);
        return () => {
          listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});

    return { getState: getState, dispatch: dispatch, subscribe: subscribe};
}

function combineReducers(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
}

function getStateAsJson(store) {
  return json(store.getState());
}

function json(obj) {
  return JSON.stringify(obj);
}


//utils

function range(n) {
  var arr = [];
  for(var i = 0; i < n; i++) {
    arr.push(i);
  }

  return arr;
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
