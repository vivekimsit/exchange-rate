import test from 'ava';
import createExchange from '.';

const xml = require('./fake-response');

test('return exchange rate for valid currency pair', async t => {
  const mockParser = _ => ({
    EUR: 1.0,
    INR: 78.388,
    GBP: 0.875,
    USD: 1.1632
  });
  const mockApi = {
    async fetch(_) {
      return Promise.resolve(xml);
    }
  };
  const options = {
    parser: mockParser,
    requestApi: mockApi
  };
  const exchange = createExchange(options);

  let source = 'EUR';
  let target = 'INR';
  let expected = {
    source,
    target,
    rate: 78.388
  };
  t.deepEqual(await exchange.convert({source, target}, options), expected);

  source = 'USD';
  target = 'INR';
  expected = {
    source,
    target,
    rate: 67.39
  };
  t.deepEqual(await exchange.convert({source, target}, options), expected);

  source = 'INR';
  target = 'USD';
  expected = {
    source,
    target,
    rate: 0.0148
  };
  t.deepEqual(await exchange.convert({source, target}, options), expected);
});

test('throw on invalid input', async t => {
  const mockParser = _ => ({
    EUR: 1.0,
    INR: 79.1505,
    USD: 1.1675
  });
  const mockApi = {
    async fetch(_) {
      return Promise.resolve(xml);
    }
  };
  const options = {
    parser: mockParser,
    requestApi: mockApi
  };
  const exchange = createExchange(options);

  try {
    await exchange.convert('foo');
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await exchange.convert(NaN);
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await exchange.convert(Infinity);
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await exchange.convert({source: 'EUR', target: 'GB'});
    t.fail();
  } catch (err) {
    t.pass();
  }
});
