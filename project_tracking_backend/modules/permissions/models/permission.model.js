const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("Permission", {
    permissionId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    permissionName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
    },
    permissionType: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },{timestamps: true});
};
