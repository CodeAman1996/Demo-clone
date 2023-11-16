const { DataTypes, Sequelize } = require("sequelize");
const enumValues = require("../../../config/category.config");

module.exports = (sequelize) => {
	return sequelize.define(
		"Template",
		{
			templateId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			templateName: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			created_by: {
				type: Sequelize.UUID,
			},
		},
		{ timestamps: true }
	);
};
