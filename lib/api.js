'use strict';

const got = require('got');

module.exports = {
  async fetch(url, options = {}) {
    return got(url, options);
  }
};
