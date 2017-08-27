'use strict';

var leftPad = require('left-pad');

function dateFormater(time) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'date-time';
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!time) {
    return parse(new Date(), type);
  }
  var timeStr = time + '';
  var timeNum = +timeStr;
  if (!isNaN(timeNum)) {
    if (timeStr.length !== 13) timeNum *= 1000;
    return parse(new Date(timeNum), type, opts);
  }
  return parse(new Date(time), type, opts);
}

function parse(date, type, opts) {
  var year = date.getFullYear();
  var month = leftPad(date.getMonth() + 1, 2, 0);
  var day = leftPad(date.getDate(), 2, 0);
  var hour = leftPad(date.getHours(), 2, 0);
  var minute = leftPad(date.getMinutes(), 2, 0);
  var second = leftPad(date.getSeconds(), 2, 0);
  switch (type) {
    case 'date':
      return year + '-' + month + '-' + day;
    case 'time':
      return hour + ':' + minute + ':' + second;
    case 'Hm':
      return hour + ':' + minute;
    case 'object':
      return {
        Y: year,
        M: month,
        D: day,
        H: hour,
        m: minute,
        s: second
      };
    case 'human':
      return getHumanTime(date, opts);
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
}

function getHumanTime(somedayDate, opts) {
  var offsetDays = opts.offsetDays || ['今天', '昨天', '前天'];
  var weekDays = opts.weekDays || ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var ONE_DAY_STAMP = 86400000;
  var nowDate = opts.nowDate || new Date();
  var hm = parse(somedayDate, 'Hm');
  var nowYMDStamp = Date.parse(parse(nowDate, 'date'));
  var somedayYMDStamp = Date.parse(parse(somedayDate, 'date'));
  var offsetYMDStamp = nowYMDStamp - somedayYMDStamp;
  if (offsetYMDStamp < 0) {
    return parse(somedayDate);
  }
  if (offsetYMDStamp === 0) {
    return offsetDays[0] + ' ' + hm;
  }
  if (offsetYMDStamp === ONE_DAY_STAMP) {
    return offsetDays[1] + ' ' + hm;
  }
  if (offsetYMDStamp === ONE_DAY_STAMP * 2) {
    return offsetDays[2] + ' ' + hm;
  }
  if (offsetYMDStamp <= ONE_DAY_STAMP * 6 && offsetYMDStamp > ONE_DAY_STAMP * 2) {
    return weekDays[somedayDate.getDay()] + ' ' + hm;
  }
  return parse(somedayDate);
}

module.exports = dateFormater;
