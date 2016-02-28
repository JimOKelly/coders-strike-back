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

describe('reducer', function() {
  it('should reduce laps', function() {
    var action = {type: challenge.actions.laps, laps: 2}
    var state = {}
    var nextState = challenge.reducer(state, action)
    assert.deepEqual(nextState, { game: { width: 16000, height: 9000, laps: 2} })

    state = { game: { height: 1000} }
    nextState = challenge.reducer(state, action)
    assert.deepEqual(nextState, { game: { height: 1000, laps: 2} })
  })
})
