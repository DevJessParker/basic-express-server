'use strict';

const logger = (req, res, next) => {
  if (req.query.name) {
    console.log('worked');
    next();
  } else {
    console.log('didnt work')
    next('didnt work');
  }
}

module.exports = logger;