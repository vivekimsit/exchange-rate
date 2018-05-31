'use strict';

const xmldoc = require('xmldoc');
const debug = require('debug')('exchange-rate:parse');

const currencies = require('./currencies');

/**
 * Converts xml document to exchange rates
 * from EUR.
 *
 * @param  {string} xml The xml document.
 * @return {object<string, number>} The map of currency and its current conversion rate from EUR
 */
const parse = xml => {
  const doc = new xmldoc.XmlDocument(xml);
  const cube = doc.childNamed('Cube').childNamed('Cube');

  const rates = currencies.reduce(
    (accumulator, currency) => {
      const exchange = cube.childWithAttribute('currency', currency);
      if (exchange) {
        const {rate} = exchange.attr;
        accumulator[currency] = parseFloat(rate);
      } else {
        debug(`Node not found for currency: ${currency}`);
      }
      return accumulator;
    },
    {}
  );
  // Add EUR rate to make it consistent
  rates.EUR = 1.0;
  return rates;
};

module.exports = parse;
