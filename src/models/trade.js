const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
  },
  passwordSalt: {
    type: DataTypes.STRING,
  },
  apiKey: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = User;
