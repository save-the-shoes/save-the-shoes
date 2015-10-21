"use strict";

let _ = require('lodash');

module.exports = function formatTime (seconds) {
  let ago = ' ago';
  let inText = '';

  if (seconds < 0) {
    ago = '';
    inText = 'In ';
  }

  let absoluteSeconds = Math.abs(seconds);

  let timeFormat = time => _.padLeft(time, 2, '0');

  let minutesText = timeFormat(Math.floor(absoluteSeconds / 60));
  let secondsText = timeFormat(absoluteSeconds % 60);

  return `${inText}${minutesText}′${secondsText}′′${ago}`;
}

