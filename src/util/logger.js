/* eslint-disable no-console */

import noop from 'lodash/noop';
import partialRight from 'lodash/partialRight';
import EventEmitter from 'fbemitter';

export const MSG_EVENT = 'message';

export const LoggerLevel = {
  OFF: 0x00,
  INFO: 0x01,
  WARN: 0x02,
  ERROR: 0x03,
  DEBUG: 0x04
};

export class Logger {
  constructor(level = LoggerLevel.DEBUG) {
    this._emitter = new EventEmitter();
    this._level = level;
  }

  log(level, ...values) {
    values[0] = `%c ${values[0]}`;
    this._getLoggerFormatter(level).apply(this, values);
    this._emitter.emit(MSG_EVENT, values);
  }

  info(...values) {
    this.log(LoggerLevel.INFO, ...values);
  }

  warn(...values) {
    this.log(LoggerLevel.WARN, ...values);
  }

  error(...values) {
    this.log(LoggerLevel.ERROR, ...values);
  }

  debug(...values) {
    this.log(LoggerLevel.DEBUG, ...values);
  }

  addEventListener(event, handler) {
    return this._emitter.addListener(event, handler);
  }

  _getLoggerFormatter(level) {
    if (level > this._level) {
      level = this._level;
    }

    switch (level) {
      case LoggerLevel.INFO:
        return partialRight(console.log, 'color: black');
      case LoggerLevel.WARN:
        return partialRight(console.warn, 'color: yellow');
      case LoggerLevel.ERROR:
        return partialRight(console.error, 'color: red');
      case LoggerLevel.DEBUG:
        return partialRight(console.debug, 'color: blue');
      default:
        return noop;
    }
  }
}

export default Logger;
