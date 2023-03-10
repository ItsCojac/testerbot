const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Flashloan = sequelize.define('Flashloan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dex: {
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
});

module.exports = Flashloan;
