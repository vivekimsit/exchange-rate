'use strict';

const joi = require('joi');

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

module.exports = (pair, options = {}) => {
  options = Object.assign({}, defaults, options);
  const {source, target} = joi.attempt(pair, schema);
  console.log(options);
  console.log(source);
  console.log(target);
  return 123;
};
