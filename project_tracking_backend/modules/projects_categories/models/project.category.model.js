const { DataTypes, Sequelize } = require("sequelize");
const enumData = require("../../../config/category.config");

module.exports = (sequelize) => {
	return sequelize.define("Projects_Category", {
		categoryId: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		categoryName: {
			type: DataTypes.STRING,
		},
		categoryPriority: {
			type: DataTypes.INTEGER,
		},
		projectTemplateId: {
			type: Sequelize.UUID,
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	},{timestamps: true});
};
