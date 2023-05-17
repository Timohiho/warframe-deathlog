'use strict';

require('colors');

const { sentRes } = require('../regex');

// eslint-disable-next-line global-require
class GameClosedEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: ' RES ' });

    if (sentRes.test(line)) {
      const matches = line.match(sentRes);
      const timestamp = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[0]) * 1000)
        : matches[0];

      this.ts = timestamp;
      this.target = 'Sentinel';
      [,, this.player] = matches;
    } else {
      this.ts = 0;
      this.target = 'Naaaaaaa';
      this.player = 'Naaaaaaa';
    }
  }

  toString() {
    return `${super.toString()} - ${this.player} ${this.target} revived`;
    //return `${super.toString()} - ${this.useColors ? this.player.cyan : this.player} ${this.useColors ? this.target.yellow : this.target} revived`;
  }
}

module.exports = GameClosedEvent;
