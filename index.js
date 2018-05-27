'use strict';

const joi = require('joi');

const api = require('./api');
const Exchange = require('./exchange');
const xmlParser = require('./parse-xml');

const schema = joi
  .object({
    source: joi.string().required().min(3).max(3).example('EUR'),
    target: joi.string().required().min(3).max(3).example('GBP')
  })
  .unknown()
  .required();

const defaults = {
  timeout: 1000 // 1 sec
};

const exchange = async function (pair, options = {}) {
  options = Object.assign({}, defaults, options);
  const {source, target} = joi.attempt(pair, schema);

  const {requestApi = api, parser = xmlParser} = options;

  const exchange = new Exchange(requestApi, parser, options);
  const rate = await exchange.convert({source, target});
  return {source, target, rate};
};

module.exports = exchange;
