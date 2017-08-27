# date-formater
format date for js

[![Build Status](https://travis-ci.org/limi58/date-formater.svg?branch=master)](https://travis-ci.org/limi58/date-formater)

# install
`npm install --save m-dater`

# Usage

```js
const dater = require('m-dater')
dater([time,] [type], [opts])
```

```js
type: 'date-time', 'date', 'object', 'time', 'Hm', 'human'

opts: {
  offsetDays: ['today', 'yestoday', 'before yestoday'],
  weekDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
}
```

# example
```js
dateFormat() // => current date-time: 2016-09-19 22:22:22
dateFormat('', 'date-time') // => current date-time: 2016-09-19 22:22:22
dateFormat('', 'date') // => current date: 2016-09-19
dateFormater('1480975566000', 'time') // => 06:06:06
dateFormater('1480975566000', 'Hm') // => 06:06
dateFormater('December 06, 2016 06:06:06') // => 2016-12-06 06:06:06
dateFormater(1480975566) // '2016-12-06 06:06:06'

dateFormater('1480975566000', 'object') // => { Y: '2016', M: '12', D: '06', H: '06', m: '06', s: '06'}

dateFormater('1480975566000', 'human') // => 昨天 06:06
dateFormater('1480975566000', 'human', {
  offsetDays: ['today', 'yestoday', 'before yestoday'],
  weekDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
}) // => fri 06:06
```
