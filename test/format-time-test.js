/* globals describe, it */
"use strict";

let assert = require('assert');

let formatTime = require('../common/format-time');

describe('formatTime', () => {
  it('takes seconds and returns a formatted time', () => {
    assert.equal(formatTime(90), '01′30′′ ago');
    assert.equal(formatTime(-90), '01′30′′');
  });
});

