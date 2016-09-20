const assert = require('assert')
const dateFormater = require('../index.js')
describe('test function', function() {
  it('no params should return current date and time', function() {
    assert(typeof dateFormater() === 'string')
  })

  it('no first param should normal return', function() {
    assert(dateFormater('', 'date').length === 10)
    assert(dateFormater('', 'date-time').length === 19)
    assert(dateFormater('').length === 19)
  })

  it('formated param should return correct', function() {
    assert(dateFormater('December 06, 2016 06:06:06') === '2016-12-06 06:06:06')
  })

  it('no format param should return correct', function() {
    assert(dateFormater(1480975566000) === '2016-12-06 06:06:06')
    assert(dateFormater('1480975566000') === '2016-12-06 06:06:06')
    assert(dateFormater(1480975566) === '2016-12-06 06:06:06')
  })
})
