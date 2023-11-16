const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("Category", {
    categoryId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    category_templateId:{
      type: Sequelize.UUID,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",

    },
    categoryName: {
      type: DataTypes.STRING,
    },
    categoryPriority:{
      type: DataTypes.INTEGER,
    },
    
    userId: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{timestamps: true});
};

// name: Sequelize.ARRAY(Sequelize.STRING),
