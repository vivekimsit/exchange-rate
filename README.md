# exchange-rate [![Build Status](https://travis-ci.org/vivekimsit/exchange-rate.svg?branch=master)](https://travis-ci.org/vivekimsit/exchange-rate)
> Get currency exchange rates


## Install

```
$ npm install exchange-rate
```

## Usage

```js
const createExchange = require('exchange-rate');
const exchange = createExchange();
const {source, target, rate} = await exchange.convert({source: 'EUR', target: 'GBP'});
```
