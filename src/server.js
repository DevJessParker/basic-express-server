'use strict';

const express = require('express');
const peopleRoutes = require('./routes/people.js');
const bookRoutes = require('./routes/book.js');
const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js'); 
const morgan = require('morgan'); 
const cors = require('cors');
const app = express();


app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());

app.use(peopleRoutes);
app.use(bookRoutes);

app.use('*', notFound);
app.use(errors); 

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`server up: ${port}`);
    })
  }
}