module.exports = {
  getDistanceFromCheckpoint: getDistanceFromCheckpoint
};

function getDistanceFromCheckpoint(playerLocation, checkpointLocation) {
  var x = Math.abs(playerLocation.x - checkpointLocation.x);
  var y = Math.abs(playerLocation.y - checkpointLocation.y);

  var xy = (x * x) + (y * y);

  return Math.sqrt(xy);
}
