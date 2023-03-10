const crypto = require('crypto');
const { sequelize } = require('../models');

function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const verifyHash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return verifyHash === hash;
}

module.exports = {
  generateToken,
  hashPassword,
  verifyPassword,
};
