const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Arbitrage = sequelize.define('Arbitrage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dex1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dex2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  profit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Arbitrage;
