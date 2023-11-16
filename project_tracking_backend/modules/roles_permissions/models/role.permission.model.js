const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Roles_Permission", {
    rolePermissionId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    role_id:{
      type: Sequelize.UUID,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    permission_id:{
      type: Sequelize.UUID,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  },{timestamps: true});
};
