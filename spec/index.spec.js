var assert = require('assert')
var challenge = require('../')

describe('challenge', function() {
  describe('assign', function() {
    it('should combine two objects', function() {
      assert.deepEqual(challenge.assign({}, {bar: 1}), {bar: 1})
    });
    it('should combine three objects', function() {
      assert.deepEqual(challenge.assign({}, {bar: 1}, {foo: 2}), {bar: 1, foo: 2})
    });
  })
})
