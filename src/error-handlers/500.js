'use strict';

module.exports = function(err, req, res, next) {

  const errorObj = {
    status: 500,
    message: err.message
  }

  res.status(500).send(errorObj);
}