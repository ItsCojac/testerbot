const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const { hashPassword } = require('../utils/auth');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

User.beforeCreate(async (user, options) => {
  const { hash, salt } = hashPassword(user.password);
  user.password = hash;
  user.publicKey = salt;
});

module.exports = User;
