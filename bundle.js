/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var redux = __webpack_require__(3);
	var actions = __webpack_require__(4);
	var dest = __webpack_require__(6);

	// for tests
	if (typeof readline != 'function') {
	  readline = function () {
	    return "";
	  };
	}
	if (typeof print != 'function') {
	  print = console.log;
	}
	if (typeof printErr != 'function') {
	  printErr = console.error;
	}

	function main() {
	  init();
	  gameLoop();
	}

	var store = redux.getStore();

	function init() {
	  store.dispatch({ type: actions.laps, laps: parseInt(readline()) });

	  var checkpointCount = parseInt(readline());
	  var checkpoints = range(checkpointCount).map(function () {
	    return readline();
	  });
	  store.dispatch({ type: actions.checkpoints, checkpoints: checkpoints });
	}

	function gameLoop() {
	  while (true) {
	    store.dispatch({ type: actions.turn });
	    for (var i = 0; i < 2; i++) {
	      store.dispatch({ type: actions.setPlayerDetails, id: i, input: readline() });
	    }
	    for (var i = 0; i < 2; i++) {
	      store.dispatch({ type: actions.setEnemyDetails, id: i, input: readline() });
	    }

	    var state = store.getState();

	    print(dest.getDestinationCommand(state, 0));
	    print(dest.getDestinationCommand(state, 1));
	  }
	}

	if (typeof process !== 'object') {
	  main();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const actions = __webpack_require__(4);
	const utils = __webpack_require__(5);

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
	  return function (state, action) {
	    state = state || {};
	    return Object.keys(reducers).reduce(function (nextState, key) {
	      nextState[key] = reducers[key](state[key], action);
	      return nextState;
	    }, {});
	  };
	}

	function createStore(reducer) {
	  var state = {};
	  var listeners = [];

	  var dispatch = function (action) {
	    state = reducer(state, action);
	    listeners.forEach(function (listener) {
	      listener();
	    });
	  };

	  var getState = function () {
	    return state;
	  };

	  var subscribe = function (listener) {
	    listeners = listeners.concat(listener);
	    return function () {
	      listeners = listeners.filter(function (l) {
	        l !== listener;
	      });
	    };
	  };

	  return {
	    dispatch: dispatch,
	    getState: getState,
	    subscribe: subscribe
	  };
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

	  switch (action.type) {
	    case actions.turn:
	      return utils.assign({}, state, {
	        turn: state.turn ? state.turn + 1 : 1
	      });
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

	  switch (action.type) {
	    case actions.setPlayerDetails:
	      return setDetails(state, toDetail(action.id, action.input));
	    default:
	      return state;
	  }
	}

	function enemies(state, action) {
	  state = state || [];

	  switch (action.type) {
	    case actions.setEnemyDetails:
	      return setDetails(state, toDetail(action.id, action.input));
	    default:
	      return state;
	  }
	}

	// detail.id is expected
	function setDetails(state, detail) {
	  var existing = state.filter(function (d) {
	    return d.id === detail.id;
	  });

	  if (state.length === 0 || !existing.length) {
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
	  return arr.slice(0, index).concat([obj]).concat(arr.slice(index + 1, arr.length));
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  laps: "LAPS",
	  checkpoints: "CHECKPOINTS",
	  setPlayerDetails: "SET_PLAYER_DETAILS",
	  setEnemyDetails: "SET_ENEMY_DETAILS",
	  turn: "TURN"
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	  assign: assign,
	  json: json,
	  range: range
	};

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

	function json(obj) {
	  return JSON.stringify(obj);
	}

	function range(n) {
	  var arr = [];
	  for (var i = 0; i < n; i++) {
	    arr.push(i);
	  }

	  return arr;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const maths = __webpack_require__(7);

	module.exports = {
	  getDestinationCommand: getDestinationCommand
	};

	function getDestinationCommand(state, playerIndex) {
	  var dest = getDestination(state, playerIndex);
	  return dest.x + ' ' + dest.y + ' ' + dest.thrust;
	}

	function getDestination(state, playerIndex) {
	  var playerDetail = state.players[playerIndex];
	  var checkpointToTarget = playerIndex === 0 ? playerDetail.nextCheckPointId : playerDetail.nextCheckPointId + 1;
	  var next = getDestinationAtCheckpointIndex(state, playerDetail.nextCheckPointId);

	  var thrust = getThrust(state, playerDetail, next);

	  return {
	    x: next.x,
	    y: next.y,
	    thrust: Math.round(thrust)
	  };
	}

	function getThrust(state, playerDetail, next) {
	  var distanceFromNext = maths.getDistanceFromCheckpoint(playerDetail, next);

	  if (distanceFromNext > state.game.height / 2) {
	    return state.game.maxThrust;
	  } else if (distanceFromNext < 1000) {
	    return state.game.maxThrust / 6;
	  } else {
	    return state.game.maxThrust / 2;
	  }
	}

	function getDestinationAtCheckpointIndex(state, checkpointIndex) {
	  var nextCheckpoint = state.game.checkpoints.filter(function (checkpoint) {
	    return checkpoint.id === checkpointIndex;
	  })[0];

	  return {
	    x: nextCheckpoint.x,
	    y: nextCheckpoint.y
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  getDistanceFromCheckpoint: getDistanceFromCheckpoint
	};

	function getDistanceFromCheckpoint(playerLocation, checkpointLocation) {
	  var x = Math.abs(playerLocation.x - checkpointLocation.x);
	  var y = Math.abs(playerLocation.y - checkpointLocation.y);

	  var xy = x * x + y * y;

	  return Math.sqrt(xy);
	}

/***/ }
/******/ ]);