'use strict';

const URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

class Exchange {
  constructor(api, parser, options = {}) {
    this.api = api;
    this.options = options;
    this.parser = parser;
  }

  async convert({source, target}) {
    if (!this.xml) {
      await this.fetch();
      this.euroToAll = this.parser(this.xml);
    }
    const euroToSource = this.euroToAll[source];
    const euroToTarget = this.euroToAll[target];
    return exchange(euroToSource, euroToTarget);
  }

  async fetch() {
    const response = await this.api.fetch(URL, this.options);
    this.xml = response.body || '';
  }
}

function exchange(from, to) {
  return round(parseFloat(to) / parseFloat(from));
}

function round(result, digits = 4) {
  return Math.round(result * (10 ** digits)) / (10 ** digits);
}

module.exports = Exchange;
