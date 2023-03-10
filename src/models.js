const { DataTypes } = require('sequelize');
const { sequelize } = require('./db.js');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Token = sequelize.define('Token', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  decimals: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { sequelize, models: { User, Token } };
