const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Role", {
    roleId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      default: true,
    },
    roleType: {
      type: DataTypes.STRING,
      unique: true,
    },
  },{timestamps: true});
};
