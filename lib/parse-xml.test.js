import test from 'ava';
import m from './parse-xml';

const xml = require('../fake-response');

test('parses the valid xml', t => {
  t.deepEqual(m(xml), {
    EUR: 1,
    USD: 1.1632,
    INR: 78.388,
    GBP: 0.875
  });
});

test('throw on invalid input', t => {
  t.throws(() => {
    m('foo');
  });

  t.throws(() => {
    m(NaN);
  });

  t.throws(() => {
    m(Infinity);
  });

  t.throws(() => {
    m('<foo></foo>');
  });
});

