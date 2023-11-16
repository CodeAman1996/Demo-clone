const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Task", {
    taskId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    task_categoryId:{
      type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    taskName: {
      type: DataTypes.STRING,
    },
    taskPriority:{
      type: DataTypes.INTEGER,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{timestamps: true});
};
