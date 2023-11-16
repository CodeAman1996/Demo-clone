const { DataTypes, Sequelize } = require("sequelize");

const enumData = ["Not Started", "In Progress", "Completed"];
module.exports = (sequelize) => {
	return sequelize.define("Projects_Task", {
		taskId: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		taskName: {
			type: DataTypes.STRING,
		},
		taskStatus: {
			type: DataTypes.ENUM,
			values: enumData,
			defaultValue: "Not Started",
		},
		projectCategoryId: {
			type: Sequelize.UUID,
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
		comment: { type: DataTypes.TEXT },
		taskPriority: { type: DataTypes.INTEGER },
		startDate: { type: DataTypes.DATE },
		endDate: { type: DataTypes.DATE },
		assignedTo: { type: Sequelize.UUID },
	},{timestamps: true});
};
