const JSDOMEnvironment = require('jest-environment-jsdom');

class GlobalJSDOMEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);
    this.global.jsdom = this.dom;
  }
}

module.exports = GlobalJSDOMEnvironment;
