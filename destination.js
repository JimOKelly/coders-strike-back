const maths = require('./maths');

module.exports = {
  getDestinationCommand: getDestinationCommand
};

function getDestinationCommand(state, playerIndex) {
  var dest = getDestination(state, playerIndex);
  return dest.x + ' ' + dest.y + ' ' + dest.thrust;
}

function getDestination(state, playerIndex) {
  var playerDetail = state.players[playerIndex];
  var checkpointToTarget = playerIndex === 0 ? playerDetail.nextCheckPointId : playerDetail.nextCheckPointId + 1
  var next = getDestinationAtCheckpointIndex(state, playerDetail.nextCheckPointId);

  var thrust = getThrust(state, playerDetail, next)

  return {
    x: next.x,
    y: next.y,
    thrust: Math.round(thrust)
  };
}

function getThrust(state, playerDetail, next) {
  var distanceFromNext = maths.getDistanceFromCheckpoint(playerDetail, next);

  if(distanceFromNext > (state.game.height / 2)) {
    return state.game.maxThrust;
  } else if(distanceFromNext < 1000) {
    return state.game.maxThrust / 6;
  } else {
    return state.game.maxThrust / 2;
  }
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
