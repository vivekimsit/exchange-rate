import test from 'ava';
import m from '.';

const xml = require('./fake-response');

test('return exchange rate for valid currency pair', async t => {
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

  let source = 'EUR';
  let target = 'INR';
  let expected = {
    source,
    target,
    rate: 79.1505
  };
  t.deepEqual(await m({source, target}, options), expected);

  source = 'USD';
  target = 'INR';
  expected = {
    source,
    target,
    rate: 67.7949
  };
  t.deepEqual(await m({source, target}, options), expected);

  source = 'INR';
  target = 'USD';
  expected = {
    source,
    target,
    rate: 0.0148
  };
  t.deepEqual(await m({source, target}, options), expected);
});

test('throw on invalid input', async t => {
  try {
    await m('foo');
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await m(NaN);
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await m(Infinity);
    t.fail();
  } catch (err) {
    t.pass();
  }

  try {
    await m({source: 'EUR', target: 'GB'});
    t.fail();
  } catch (err) {
    t.pass();
  }
});
