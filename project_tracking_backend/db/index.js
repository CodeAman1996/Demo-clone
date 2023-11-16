const Sequelize = require("sequelize");

// Models
const CategoryModel = require("../modules/categories/models/category.model");
const ProjectCategoryModel = require("../modules/projects_categories/models/project.category.model");
const ProjectTaskModel = require("../modules/projects_tasks/models/project.task.model");
const ProjectTemplateModel = require("../modules/projects_templates/models/project.template.model");
const RoleModel = require("../modules/roles/models/role.model");
const RolePermissionModel = require("../modules/roles_permissions/models/role.permission.model");
const TaskModel = require("../modules/tasks/models/task.model");
const TemplateModel = require("../modules/templates/models/template.model");
const UserModel = require("../modules/users/models/users.model");
const PermissionModel = require("../modules/permissions/models/permission.model");
// Connection to DB
const dbConfig = {
	MYSQLDATABASE: "samsungdb1",
	MYSQLUSER: "admin",
	MYSQLPASS: "Winter722580",
	MYSQLHOST: "samsung-db-1.chjvjkceoypj.us-east-2.rds.amazonaws.com",
	MYSQLPORT: 3306,
};

const { MYSQLDATABASE, MYSQLUSER, MYSQLPASS, MYSQLHOST, MYSQLPORT } = dbConfig;

const sequelize = new Sequelize(
	MYSQLDATABASE || "db1",
	MYSQLUSER || "root",
	MYSQLPASS || "password",
	{
		host: MYSQLHOST || "localhost",
		dialect: "mysql",
		port: MYSQLPORT || 3306,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			idle: 20000,
			handleDisconnects: true,
		},
	}
);
const Category = CategoryModel(sequelize);
const ProjectCategory = ProjectCategoryModel(sequelize);
const ProjectTemplate = ProjectTemplateModel(sequelize);
const ProjectTask = ProjectTaskModel(sequelize);
const Role = RoleModel(sequelize);
const RolePermission = RolePermissionModel(sequelize);
const Task = TaskModel(sequelize);
const Template = TemplateModel(sequelize);
const User = UserModel(sequelize);
const Permission = PermissionModel(sequelize);

//One TO Many Relation

Template.hasMany(Category, {
	foreignKey: "category_templateId",
	as: "categories",
});
Category.belongsTo(Template, { foreignKey: "category_templateId" });

Category.hasMany(Task, { foreignKey: "task_categoryId", as: "tasks" });
Task.belongsTo(Category, { foreignKey: "task_categoryId" });

//Project Category
ProjectTemplate.hasMany(ProjectCategory, {
	foreignKey: "projectTemplateId",
	as: "categories",
});
ProjectTemplate.belongsTo(User, {
	foreignKey: "projectManager",
	as: "manager",
});

ProjectTemplate.belongsTo(User, {
	foreignKey: "createdBy",
	as: "projectOwner",
});
ProjectCategory.hasMany(ProjectTask, {
	foreignKey: "projectCategoryId",
	as: "tasks",
});
ProjectTask.belongsTo(ProjectCategory, {
	foreignKey: "projectCategoryId",
});

//Role Management
User.hasMany(Template, { foreignKey: "created_by", as: "createdBy" });
Template.belongsTo(User, { foreignKey: "created_by", as: "createdBy" });

Role.hasMany(User, { foreignKey: "roleId", as: "role" });
User.belongsTo(Role, {
	foreignKey: "roleId",
	as: "role",
});

Role.belongsToMany(Permission, {
	through: "Roles_Permission",
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as: "permissions",
});
Permission.belongsToMany(Role, {
	through: "Roles_Permission",
	foreignKey: "permission_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as: "roles",
});

User.hasMany(ProjectTask, { foreignKey: "assignedTo", as: "user" });
ProjectTask.belongsTo(User, {
	foreignKey: "assignedTo",
	as: "user",
});

const Models = {
	Category,
	ProjectCategory,
	ProjectTask,
	ProjectTemplate,
	Permission,
	Role,
	RolePermission,
	Task,
	Template,
	User,
};

const connection = {};

const connectToDatabase = async () => {
	if (connection.isConnected) {
		console.log("=> Using existing connection.");
		return Models;
	}
	await sequelize.authenticate();
	await sequelize.sync();
	connection.isConnected = true;
	console.log("=> Created a new connection.");
	return Models;
};
module.exports = { connectToDatabase, sequelize };
