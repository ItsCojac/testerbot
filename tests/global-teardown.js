const { sequelize } = require('../src/db');

module.exports = async () => {
  await sequelize.close();
};
