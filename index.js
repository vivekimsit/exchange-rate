'use strict';

const api = require('./lib/api');
const Exchange = require('./lib/exchange');
const xmlParser = require('./lib/parse-xml');

const defaults = {
  timeout: 1000 // 1 sec
};

function createExchange(pair, options = {}) {
  options = Object.assign({}, defaults, options);

  const {requestApi = api, parser = xmlParser} = options;

  return new Exchange(requestApi, parser, options);
}

module.exports = createExchange;
