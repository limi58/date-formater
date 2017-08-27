const assert = require('assert')
const dateFormater = require('../index')


describe('test function', function() {
  it('no any params', function() {
    assert(dateFormater().length === 19)
  })
  it('no first param', function() {
    assert(dateFormater('', 'date').length === 10)
    assert(dateFormater('', 'date-time').length === 19)
    assert(dateFormater('').length === 19)
  })
  it('formated param', function() {
    assert(dateFormater('December 06, 2016 06:06:06') === '2016-12-06 06:06:06')
    assert(dateFormater('December 06, 2016 06:06:06', 'date') === '2016-12-06')
  })
  it('no format param', function() {
    assert(dateFormater(1480975566000).length === 19)
    assert(dateFormater(1480975566000, 'date').length === 10)
    assert(dateFormater('1480975566000').length === 19)
    assert(dateFormater(1480975566).length === 19)
  })
  it('human time', function () {
    const nowDate = new Date('2017-08-08 08:08:08')
    const human1 = dateFormater('2017-08-08 08:07:08', 'human', { nowDate })
    const human2 = dateFormater('2017-08-07 08:09:08', 'human', { nowDate })
    const human3 = dateFormater('2017-08-07 08:07:08', 'human', { nowDate })
    const human4 = dateFormater('2017-08-06 08:07:08', 'human', { nowDate })
    const human5 = dateFormater('2017-08-04 08:09:08', 'human', { nowDate }) // 五
    const human6 = dateFormater('2017-07-01 08:09:08', 'human', { nowDate })
    const human7 = dateFormater('2017-09-04 08:09:08', 'human', { nowDate })
    assert(human1 === '今天 08:07')
    assert(human2 === '昨天 08:09')
    assert(human3 === '昨天 08:07')
    assert(human4 === '前天 08:07')
    assert(human5 === '星期五 08:09')
    assert(human6 === '2017-07-01 08:09:08')
    assert(human7 === '2017-09-04 08:09:08')
  })
  it('human i18n', function () {
    const nowDate = new Date('2017-08-08 08:08:08')
    const opts = { 
      nowDate,
      offsetDays: ['today', 'yestoday', 'before yestoday'],
      weekDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    }
    const human8 = dateFormater('2017-08-07 08:07:08', 'human', opts)
    const human9 = dateFormater('2017-08-04 08:07:08', 'human', opts)
    assert(human8 === 'yestoday 08:07')
    assert(human9 === 'fri 08:07')
  })
})
