var redux = require('./redux');
var actions = require('./actions');
var dest = require('./destination');

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

var store = redux.getStore();

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
    store.dispatch({type: actions.turn});
    for (var i = 0; i < 2; i++) {
      store.dispatch({type: actions.setPlayerDetails, id: i, input: readline()});
    }
    for (var i = 0; i < 2; i++) {
      store.dispatch({type: actions.setEnemyDetails, id: i, input: readline()});
    }

    var state = store.getState();

    print(dest.getDestinationCommand(state, 0));
    print(dest.getDestinationCommand(state, 1));
  }
}

if(typeof process !== 'object') {
  main();
}
