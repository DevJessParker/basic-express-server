'use strict';

const Books = (sequelize, DataTypes) => sequelize.define('Books', {
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
  }
});

module.exports = Books;