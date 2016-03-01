var state = {
  playersCount: 2,
  enemiesCount: 2,
  map: {
    width: 16000,
    height: 9000
  },
  turn: 1
}

function main() {
    state = getStartingState()
    while(true) {
      step()
    }
}

function step() {
  var players = range(state.playersCount).map(readline).map(createPod)
  var enemies = range(state.enemiesCount).map(readline).map(createPod)

  players.forEach(function(player) {
    move(player)
  })

  state.turn = state.turn + 1
}

function move(player) {
  var checkpoint = getCheckpointById(player.nextCheckpointId)
  var turnsUntilReachCheckpoint = getTurnsUntilCheckpoint(player, checkpoint)
  var continueThrusting = turnsUntilReachCheckpoint > 4
  var thrust = continueThrusting ? 100 : 0

  print(checkpoint.x + " " + checkpoint.y + " " + thrust)
}

function getTurnsUntilCheckpoint(player, checkpoint) {
  var turns = 0
    , point = { x: player.x, y: player.y }
    , lastDistanceFrom

  //if we're not moving..
  if(player.vx + player.vy === 0) {
      return Infinity
  }

  //so it won't be too slow of a calculation
  if(Math.abs(player.vx) < 100 && Math.abs(player.vy) < 100) {
    return Infinity
  }

  while(true) {
    var distanceFrom = getDistanceBetweenPoints(checkpoint, point)
    var isInside = isInCheckpoint(distanceFrom)
    if (isInside) {
      printErr('inside!')
      return turns
    }

    if (lastDistanceFrom && distanceFrom > lastDistanceFrom) {
      printErr('were not going to make it......')
      return Infinity
    }

    printErr('maybe after another turn..')
    lastDistanceFrom = distanceFrom
    turns = turns + 1
    if(turns > 7) {
      return Infinity
    }
    point = { x: point.x + player.vx, y: point.y + player.vy }
  }
}

function isInCheckpoint(distanceFrom) {
  var radius = 600

  return distanceFrom < radius
}

// assumes point1 and point2 both have {x, y}
function getDistanceBetweenPoints(point1, point2) {
  var x = Math.abs(point1.x - point2.x)
  var y = Math.abs(point1.y - point2.y)

  var xy = (x * x) + (y * y)

  return Math.sqrt(xy)
}

// state
function getStartingState() {
  var laps = parseInt(readline());
  var checkpointCount = parseInt(readline());
  var checkpoints = range(checkpointCount)
    .map(readline)
    .map(asCheckpoint)

  return assign({}, state, {
    laps: laps,
    checkpoints: checkpoints
  })
}

function asCheckpoint(input, index) {
  var inputs = input.split(' ')
  return {
    id: index,
    x: parseInt(inputs[0]),
    y: parseInt(inputs[1])
  }
}

function createPod(input) {
  var inputs = input.split(' ').map(parseInt);

  return {
    x: inputs[0],
    y: inputs[1],
    vx: inputs[2],
    vy: inputs[3],
    angle: inputs[4],
    nextCheckpointId: inputs[5]
  }
}

function getCheckpointById(id) {
  return state.checkpoints.filter(function (cp) {
    return cp.id === id
  })[0] //null check this
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

function range(n) {
  var arr = []
  for(var i = 0; i < n; i++) {
    arr = arr.concat([i])
  }

  return arr
}

main()
