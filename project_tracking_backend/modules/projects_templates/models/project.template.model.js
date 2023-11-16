const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Projects_Template", {
    templateId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    projectName:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    projectManager:{
      type: Sequelize.UUID,
      allowNull:false,
    },
    createdBy:{
      type: Sequelize.UUID,
      allowNull:false,
    },
    status:{
      type: DataTypes.ENUM(["Not Started","In Progress", "Completed"]),
      defaultValue: "Not Started",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    templateName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },{timestamps: true});
};
