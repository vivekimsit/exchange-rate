'use strict';

const joi = require('joi');

const URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

const schema = joi
  .object({
    source: joi.string().required().min(3).max(3).example('EUR'),
    target: joi.string().required().min(3).max(3).example('GBP')
  })
  .unknown()
  .required();

class Exchange {
  constructor(api, parser, options = {}) {
    this.api = api;
    this.options = options;
    this.parser = parser;
    this._fetching = false;
  }

  async convert(pair) {
    const {source, target} = joi.attempt(pair, schema);
    let euroToAll;
    if (!this._fetching) {
      const xml = await this.fetch();
      euroToAll = this.parser(xml);
    }
    const euroToSource = euroToAll[source];
    const euroToTarget = euroToAll[target];
    const rate = exchange(euroToSource, euroToTarget);
    return {source, target, rate};
  }

  // TODO: make it provate
  async fetch() {
    this._fetching = true;
    let response;
    try {
      response = await this.api.fetch(URL, this.options);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch remote data');
    } finally {
      this._fetching = false;
    }
    const {body = ''} = response;
    return body;
  }
}

function exchange(from, to) {
  return round(parseFloat(to) / parseFloat(from));
}

function round(result, digits = 4) {
  return Math.round(result * (10 ** digits)) / (10 ** digits);
}

module.exports = Exchange;
