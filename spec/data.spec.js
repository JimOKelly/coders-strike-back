var assert = require('assert')
var data = require('../src/data')

var readline = () => {
  var count = 0
  return () => {
    console.log(count)
    return [ '2' //laps
           , '2' //checkpoint count
           , '10 200' // checkpoint 1
           , '20 400' // checkpoint 2
           ][count++];
  }
}

describe('data', () => {
  describe('getStartingState', () => {
    it('should populate properly from program', () => {
      var state = data.getStartingState(readline())
      console.log(JSON.stringify(state))
      assert.equal(state.laps, 2)
      assert.equal(state.checkpoints.length, 2)
      assert.equal(state.checkpoints[0].id, 0)
      assert.equal(state.checkpoints[0].x, 10)
      assert.equal(state.checkpoints[0].y, 200)
      assert.equal(state.checkpoints[1].id, 1)
      assert.equal(state.checkpoints[1].x, 20)
      assert.equal(state.checkpoints[1].y, 400)
    })
  })
})
