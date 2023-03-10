const { Model, DataTypes } = require('sequelize');

class Token extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        symbol: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        decimals: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Token',
      }
    );
  }
}

module.exports = Token;
