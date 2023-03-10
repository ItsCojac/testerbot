const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Dex = sequelize.define('Dex', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Dex;
