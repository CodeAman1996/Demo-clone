'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tenants.init({
    uuid: DataTypes.UUID,
    db_name: DataTypes.STRING,
    db_host: DataTypes.STRING,
    db_username: DataTypes.STRING,
    db_password: DataTypes.STRING,
    db_port: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tenants',
  });
  return tenants;
};