var assert = require('assert')
var _ = require('../src/util')

describe('util', () => {
  describe('range', () => {
    it('should give you a good range', () => {
      assert.equal(_.range(5).length, 5)
      assert.equal(_.range(17).length, 17)
      assert.deepEqual(_.range(3), [0, 1, 2])
    })
  })

  describe('assign', () => {
    it('should combine two objects', () => {
      assert.deepEqual(_.assign({}, {bar: 1}), {bar: 1})
    })
    it('should combine three objects', () => {
      assert.deepEqual(_.assign({}, {bar: 1}, {foo: 2}), {bar: 1, foo: 2})
    })
  })
})
