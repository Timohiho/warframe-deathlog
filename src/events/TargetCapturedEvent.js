'use strict';

require('colors');
const getString = require('../getString');

const { capturedTargedRegex } = require('../regex');

// eslint-disable-next-line global-require
class TargetCapturedEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'CAPTURE' });

    const matches = line.match(capturedTargedRegex);
    if (matches) {
      this.ts = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
        : matches[1];

      // eslint-disable-next-line prefer-destructuring
      this.target = 'Capture Target';
    } else {
      this.target = '--';
    }
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - ${this.target.blue} captured!`
      : `${super.toString()} - ${this.target} captured!`;
  }
}

module.exports = TargetCapturedEvent;
