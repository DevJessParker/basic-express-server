'use strict';

const Book = (sequelize, DataTypes) => sequelize.define('Book', {
  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorFirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorLastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
  },
});

module.exports = People;