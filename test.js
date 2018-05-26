import test from 'ava';
import m from '.';

test('return exchange rate for valid currency pair', t => {
  t.is(m({source: 'EUR', target: 'GBP'}), 123);
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
    m({source: 'EUR', target: 'GB'});
  });
});
