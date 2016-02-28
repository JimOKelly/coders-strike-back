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

describe('game', function() {
  describe('laps', function() {
    it('should return new state with laps merged with existing state', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = { height: 1000 }
      var nextState = challenge.game(state, action)
      assert.deepEqual(nextState, { height: 1000, laps: 2 })
    })

    it('should be reduced', function() {
      var action = {type: challenge.actions.laps, laps: 2}
      var state = {}
      var nextState = challenge.game(state, action)
      assert.deepEqual(nextState, { laps: 2 })
    })

    it('should be able to return current state with unknown action', function() {
      var state = { laps: 4 }
      var nextState = challenge.game(state, {type: "unknown"});
      assert.deepEqual(nextState, { laps: 4 })
    })
  })

  describe('checkpoints', function() {
    it('should be able to be mapped through toCheckPoint', function() {
      assert.deepEqual(challenge.toCheckPoint('90 80', 0), { id: 0, x: 90, y: 80 })
    })

    it('should be reduced', function() {
      var state = {}
      var action = {type: challenge.actions.checkpoints, checkpoints: ['100 200', '300 400']}
      var nextState = challenge.game(state, action)
      assert.deepEqual(nextState, { checkpoints: [{ id: 0, x: 100, y: 200 }, { id: 1, x: 300, y: 400 }] })
    })
  })
})

describe('players', function() {
  describe('setPlayerDetails', function() {
    it('should be able to set player details', function() {
      var state = []
      var action = {
        type: challenge.actions.setPlayerDetails,
        id: 0,
        input: '4023 4600 156 -3 359 1'
      }
      var nextState = challenge.players(state, action)
      assert.deepEqual(nextState, [{id: 0, x: 4023, y: 4600, vx: 156, vy: -3, angle: 359, nextCheckPointId: 1}])
    })
  })
})

describe('enemies', function() {
  describe('setEnemyDetails', function() {
    it('should be able to set enemy details', function() {
      var state = []
      var action = {
        type: challenge.actions.setEnemyDetails,
        id: 1,
        input: '4023 4600 156 -3 359 1'
      }
      var nextState = challenge.enemies(state, action)
      assert.deepEqual(nextState, [{id: 1, x: 4023, y: 4600, vx: 156, vy: -3, angle: 359, nextCheckPointId: 1}])
    })
  })
})

describe('setDetails', function () {
  it('should only update when there are a max amount of people', function () {
    var state = [{
      id: 0,
      title: 'before 0'
    }, {
      id: 1,
      title: 'before 1'
    }];

    var newItem = {
      id: 0,
      title: 'after 0'
    };

    var expected = [{
      id: 0,
      title: 'after 0'
    }, {
      id: 1,
      title: 'before 1'
    }];

    var result = challenge.setDetails(state, newItem)
    assert.equal(result.length, expected.length)
    assert.deepEqual(result, expected)
  })

  it('should add when there are no players', function () {
    var state = [];

    var newItem = {
      id: 0,
      title: 'after 0'
    };

    var expected = [{
      id: 0,
      title: 'after 0'
    }];

    var result = challenge.setDetails(state, newItem)
    assert.equal(result.length, expected.length)
    assert.deepEqual(result, expected)
  })

  it('should add when there is one player', function() {
    var state = [{
      id: 0,
      title: 'before 0'
    }];

    var newItem = {
      id: 1,
      title: 'after 1'
    };

    var expected = [{
      id: 0,
      title: 'before 0'
    }, {
      id: 1,
      title: 'after 1'
    }];

    var result = challenge.setDetails(state, newItem)
    assert.equal(result.length, expected.length)
    assert.deepEqual(result, expected)
  })

  it('should update matching player if there is only one', function() {
    var state = [{
      id: 0,
      title: 'before 0'
    }];

    var newItem = {
      id: 0,
      title: 'after 0'
    };

    var expected = [{
      id: 0,
      title: 'after 0'
    }];

    var result = challenge.setDetails(state, newItem)
    assert.equal(result.length, expected.length)
    assert.deepEqual(result, expected)
  })
})

describe('replace', function () {
  it('should replace number at index in array', function () {
    var result = challenge.replace([1, 2, 3, 4], 10, 1)
    var expected = [1, 10, 3, 4]
    assert.deepEqual(result, expected)
  })

  it('should replace number at first index in array', function () {
    var result = challenge.replace([1, 2, 3, 4], 10, 0)
    var expected = [10, 2, 3, 4]
    assert.deepEqual(result, expected)
  })

  it('should replace number at last index in array', function () {
    var result = challenge.replace([1, 2, 3, 4], 10, 3)
    var expected = [1, 2, 3, 10]
    assert.deepEqual(result, expected)
  })

  it('should replace complex object at index in array', function () {
    var arr = [{
      foo: 1
    }, {
      foo: 2
    }, {
      foo: 4
    }, {
      foo: 6
    }]
    var result = challenge.replace(arr, { foo: 16 }, 2)
    var expected = [{
      foo: 1
    }, {
      foo: 2
    }, {
      foo: 16
    }, {
      foo: 6
    }]

    assert.deepEqual(result, expected)
  })
})
