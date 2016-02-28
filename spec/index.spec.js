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

describe('game reducer', function() {
  describe('laps', function() {
    it('should be able to set with existing state', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = { height: 1000 }
      var nextState = challenge.gameReducer(state, action)
      assert.deepEqual(nextState, { height: 1000, laps: 2 })
    })

    it('should be able to set with undefined state', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = undefined
      var nextState = challenge.gameReducer(state, action)
      assert(nextState.laps === 2)
    })

    it('should be able to return current state with unknown action', function() {
      var state = { laps: 4 }
      var nextState = challenge.gameReducer(state, {type: "unknown"});
      assert.deepEqual(nextState, { laps: 4 })
    })
  })
})
