'use strict';

var leftPad = require('left-pad');

function dateFormater(dateStr) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'date-time';

  if (!dateStr) {
    return parse(new Date(), type);
  }
  if (!isNaN(Number(dateStr))) {
    dateStr = Number(dateStr);
    if (dateStr.toString().length !== 13) dateStr *= 1000;
  }
  var date = new Date(dateStr);
  return parse(date, type);
}

function parse(date, type) {
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
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
}

module.exports = dateFormater;
