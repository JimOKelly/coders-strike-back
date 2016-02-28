var assert = require('assert')
var challenge = require('../')

describe('assign', function() {
  it('should combine two objects', function() {
    assert.deepEqual(challenge.assign({}, {bar: 1}), {bar: 1})
  })
  it('should combine three objects', function() {
    assert.deepEqual(challenge.assign({}, {bar: 1}, {foo: 2}), {bar: 1, foo: 2})
  })
})

describe('range', function() {
  it('should provide proper lengthed arrays', function() {
    assert.equal(challenge.range(5).length, 5)
    assert.equal(challenge.range(17).length, 17)
  })
})

describe('game reducer', function() {
  describe('laps', function() {
    it('should return new state with laps merged with existing state', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = { height: 1000 }
      var nextState = challenge.gameReducer(state, action)
      assert.deepEqual(nextState, { height: 1000, laps: 2 })
    })

    it('should return current state when there is no action', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = { height: 1000 }
      var nextState = challenge.gameReducer(state)
      assert.deepEqual(nextState, { height: 1000 })
    })

    it('should be reduced', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = {}
      var nextState = challenge.gameReducer(state, action)
      assert.deepEqual(nextState, { laps: 2 })
    })

    it('should be able to return current state with unknown action', function() {
      var state = { laps: 4 }
      var nextState = challenge.gameReducer(state, {type: "unknown"});
      assert.deepEqual(nextState, { laps: 4 })
    })
  })

  describe('checkpoints', function() {
    it('should be able to be mapped through toCheckPoint', function() {
      assert.deepEqual(challenge.toCheckPoint('90 80'), { x: 90, y: 80 })
    })

    it('should be reduced', function() {
      var state = {}
      var action = {type: challenge.actions.checkpoints, checkpoints: ['100 200', '300 400']}
      var nextState = challenge.gameReducer(state, action)
      assert.deepEqual(nextState, { checkpoints: [{ x: 100, y: 200 }, { x: 300, y: 400 }] })
    })
  })
})
