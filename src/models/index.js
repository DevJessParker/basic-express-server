'use strict';


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;


const { Sequelize, DataTypes } = require('sequelize');


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  
} : {};


let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);


const people = require('./people.model.js');
const book = require('./book.model.js');


module.exports = {
  db: sequelize,
  People: people(sequelize, DataTypes),
  Book: book(sequelize, DataTypes)
}