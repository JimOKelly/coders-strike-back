var _ = require('./util')

module.exports = {
  getStartingState: getStartingState
}

function getStartingState(readline) {
  state = {
    playersCount: 2,
    enemiesCount: 2,
    map: {
      width: 16000,
      height: 9000
    },
    turn: 1
  }
  var laps = parseInt(readline());
  var checkpointCount = parseInt(readline());
  var checkpoints = _.range(checkpointCount)
    .map(readline)
    .map(asCheckpoint)

  return _.assign({}, state, {
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
