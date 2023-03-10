const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
  define: {
    timestamps: false,
  },
});

async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    await sequelize.sync();
    console.log('Database schema has been synchronized.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

module.exports = {
  sequelize,
  initialize,
};
