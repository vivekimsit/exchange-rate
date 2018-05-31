import test from 'ava';
import m from './parse-xml';

const xml = require('../fake-response');

test('parses the valid xml', t => {
  t.deepEqual(m(xml), {
    EUR: '1.0',
    USD: '1.1781',
    JPY: '130.69'
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

