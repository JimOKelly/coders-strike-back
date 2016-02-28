function main() {
  init();
  gameLoop();
}

function init() {
  var laps = parseInt(readline());
  var checkpointCount = parseInt(readline());
  for (var i = 0; i < checkpointCount; i++) {
      var inputs = readline().split(' ');
      var checkpointX = parseInt(inputs[0]);
      var checkpointY = parseInt(inputs[1]);
  }
}

function gameLoop() {
  while (true) {
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
}

main();
