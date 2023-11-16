const { sequelize } = require("../../../db/index");
const { Op } = require("sequelize");
const { v4: uuid } = require("uuid");

const getService = async (
	ProjectTemplate,
	ProjectsCategory,
	ProjectsTask,
	User,
	UserRole
) => {
	try {
		const lists = await ProjectTemplate.findAll({
			attributes: { exclude: ["projectManager", "createdBy"] },
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: User,
					as: "manager",
					attributes: [["userId", "managerId"], "firstName", "lastName", "profileImage", "email"],
				},
				{
					model: User,
					as: "projectOwner",
					attributes: [["userId", "createdBy"], "firstName", "lastName", "email"],
				},
				{
					model: ProjectsCategory,
					attributes: [
						"categoryId",
						"categoryName",
						"categoryPriority",
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
							),
							"notStartedCount",
						],
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
							),
							"inProgressCount",
						],
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
							),
							"completedCount",
						],
					],
					as: "categories",
					order: [["categoryPriority", "ASC"]],
					separate: true,
					include: [
						{
							model: ProjectsTask,
							attributes: [
								"taskId",
								"taskName",
								"taskPriority",
								"taskStatus",
								"startDate",
								"endDate",
								"comment",
								"assignedTo",
							],
							order: [["taskPriority", "ASC"]],
							as: "tasks",
							separate: true,
						},
					],
				},
			],
		});
		if (UserRole.role === "Admin") {
			return lists;
		} else if (UserRole.role === "Project Manager") {
			let projects = await ProjectTemplate.findAll({
				attributes: { exclude: ["projectManager", "createdBy"] },
				order: [["createdAt", "DESC"]],
				where: {
					[Op.or]: [
						{ projectManager: UserRole.user },
						{ createdBy: UserRole.user },
					],
				},
				include: [
					{
						model: User,
						as: "manager",
						attributes: [["userId", "managerId"], "firstName", "lastName"],
					},
					{
						model: User,
						as: "projectOwner",
						attributes: [["userId", "createdBy"], "firstName", "lastName"],
					},
					{
						model: ProjectsCategory,
						attributes: [
							"categoryId",
							"categoryName",
							"categoryPriority",
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
								),
								"notStartedCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
								),
								"inProgressCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
								),
								"completedCount",
							],
						],
						as: "categories",
						order: [["categoryPriority", "ASC"]],
						separate: true,
						include: [
							{
								model: ProjectsTask,
								attributes: [
									"taskId",
									"taskName",
									"taskPriority",
									"taskStatus",
									"startDate",
									"endDate",
									"comment",
									"assignedTo",
								],
								order: [["taskPriority", "ASC"]],
								as: "tasks",
								separate: true,
							},
						],
					},
				],
			});
			const lists = await ProjectTemplate.findAll({
				attributes: { exclude: ["projectManager", "createdBy"] },
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: User,
						as: "manager",
						attributes: [["userId", "managerId"], "firstName", "lastName"],
					},
					{
						model: User,
						as: "projectOwner",
						attributes: [["userId", "createdBy"], "firstName", "lastName"],
					},
					{
						model: ProjectsCategory,
						attributes: [
							"categoryId",
							"categoryName",
							"categoryPriority",
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
								),
								"notStartedCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
								),
								"inProgressCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
								),
								"completedCount",
							],
						],
						as: "categories",
						order: [["categoryPriority", "ASC"]],
						separate: true,
						include: [
							{
								model: ProjectsTask,
								attributes: [
									"taskId",
									"taskName",
									"taskPriority",
									"taskStatus",
									"startDate",
									"endDate",
									"comment",
									"assignedTo",
								],
								order: [["taskPriority", "ASC"]],
								as: "tasks",
								separate: true,
							},
						],
					},
				],
			});
			const filteredProjects = lists.filter((project) => {
				return project.categories.some((category) => {
					return category.tasks.some(
						(task) => task.assignedTo === UserRole.user
					);
				});
			});
			const result = projects.concat(filteredProjects);
			return result;
		} else {
			let list = await ProjectTemplate.findAll({
				attributes: { exclude: ["projectManager", "createdBy"] },
				order: [["createdAt", "DESC"]],
				where: {
					[Op.or]: [
						{ projectManager: UserRole.user },
						{ createdBy: UserRole.user },
					],
				},
				include: [
					{
						model: User,
						as: "manager",
						attributes: [["userId", "managerId"], "firstName", "lastName"],
					},
					{
						model: User,
						as: "projectOwner",
						attributes: [["userId", "createdBy"], "firstName", "lastName"],
					},
					{
						model: ProjectsCategory,
						attributes: [
							"categoryId",
							"categoryName",
							"categoryPriority",
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
								),
								"notStartedCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
								),
								"inProgressCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
								),
								"completedCount",
							],
						],
						as: "categories",
						order: [["categoryPriority", "ASC"]],
						separate: true,
						include: [
							{
								model: ProjectsTask,
								attributes: [
									"taskId",
									"taskName",
									"taskPriority",
									"taskStatus",
									"startDate",
									"endDate",
									"comment",
									"assignedTo",
								],
								order: [["taskPriority", "ASC"]],
								as: "tasks",
								separate: true,
							},
						],
					},
				],
			});

			let project = await ProjectTemplate.findAll({
				attributes: { exclude: ["projectManager", "createdBy"] },
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: User,
						as: "manager",
						attributes: [["userId", "managerId"], "firstName", "lastName"],
					},
					{
						model: User,
						as: "projectOwner",
						attributes: [["userId", "createdBy"], "firstName", "lastName"],
					},
					{
						model: ProjectsCategory,
						attributes: [
							"categoryId",
							"categoryName",
							"categoryPriority",
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
								),
								"notStartedCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
								),
								"inProgressCount",
							],
							[
								sequelize.literal(
									`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
								),
								"completedCount",
							],
						],
						as: "categories",
						order: [["categoryPriority", "ASC"]],
						separate: true,
						include: [
							{
								model: ProjectsTask,
								attributes: [
									"taskId",
									"taskName",
									"taskPriority",
									"taskStatus",
									"startDate",
									"endDate",
									"comment",
									"assignedTo",
								],
								order: [["taskPriority", "ASC"]],
								as: "tasks",
								separate: true,
							},
						],
					},
				],
			});
			const filteredProjects = project.filter((project) => {
				return project.categories.some((category) => {
					return category.tasks.some(
						(task) => task.assignedTo === UserRole.user
					);
				});
			});
			const result = list.concat(filteredProjects);
			return result;
		}
	} catch (e) {
		throw e;
	}
};

const getByIdService = async (
	templateId,
	ProjectTemplate,
	ProjectCategory,
	Projects_Task,
	User
) => {
	try {
		const lists = await ProjectTemplate.findByPk(templateId, {
			attributes: { exclude: ["projectManager", "createdBy"] },
			order: [["endDate", "ASC"]],
			include: [
				{
					model: User,
					as: "manager",
					attributes: [["userId", "managerId"], "firstName", "lastName", "email"],
				},
				{
					model: User,
					as: "projectOwner",
					attributes: [["userId", "createdBy"], "firstName", "lastName", "email"],
				},
				{
					model: ProjectCategory,
					attributes: [
						"categoryId",
						"categoryName",
						"categoryPriority",
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Not Started')`
							),
							"notStartedCount",
						],
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'In Progress')`
							),
							"inProgressCount",
						],
						[
							sequelize.literal(
								`(SELECT COUNT(*) FROM Projects_Tasks AS SubTasks WHERE SubTasks.projectCategoryId = Projects_Category.categoryId AND SubTasks.taskStatus = 'Completed')`
							),
							"completedCount",
						],
					],
					as: "categories",
					order: [["categoryPriority", "ASC"]],
					separate: true,
					include: [
						{
							model: Projects_Task,
							attributes: [
								"taskId",
								"taskName",
								"taskPriority",
								"taskStatus",
								"startDate",
								"endDate",
								"comment",
							],
							as: "tasks",
							order: [["taskPriority", "ASC"]],
							separate: true,
							include: [
								{
									model: User,
									attributes: ["userId", "email", "firstName", "lastName", "profileImage"],
									as: "user",
								},
							],
						},
					],
				},
			],
		});
		if (!lists) {
			throw new Error(
				"Oops! Project id not found or Something went wrong. Please try again with diffrent Project id!"
			);
		} else {
			return lists;
		}
	} catch (e) {
		throw e;
	}
};

const postService = async (
	body,
	ProjectTemplate,
	ProjectCategory,
	ProjectTask
) => {
	try {
		const {
			projectName,
			templateName,
			projectManager,
			startDate,
			endDate,
			createdBy,
		} = body;
		const existingProject = await ProjectTemplate.findOne({
			where: { projectName },
		});
		const templateId = uuid();
		if (existingProject) {
			throw new Error(
				"Project name already exist please try with a different project name!"
			);
		}
		const projectData = [];
		projectData.push({
			templateId,
			projectName,
			templateName,
			projectManager,
			createdBy,
			startDate,
			endDate,
		});

		const projectCreation = await ProjectTemplate.bulkCreate(projectData);
		if (!projectCreation.length > 0) {
			throw new Error(
				"Something went wrong in project please try again after pr creation!"
			);
		}

		//making AOO from body data
		const tasks = [];
		const categories = [];
		body.categories.forEach((category) => {
			const categoryId = uuid();
			categories.push({
				categoryId,
				categoryName: category.categoryName,
				categoryPriority: category.categoryPriority,
				projectTemplateId: templateId,
			});

			category.tasks.forEach((task) => {
				const taskId = uuid();
				tasks.push({
					taskId,
					taskName: task.taskName,
					taskPriority: task.taskPriority,
					projectCategoryId: categoryId,
				});
			});
		});

		const categoryCreation = await ProjectCategory.bulkCreate(categories);
		if (!categoryCreation.length > 0) {
			throw new Error("Something went wrong in category creation!");
		}
		const taskCreation = await ProjectTask.bulkCreate(tasks);
		if (!taskCreation.length > 0) {
			throw new Error("Something went wrong in task creation!");
		}

		return { message: "Project has been created successfully" };
	} catch (e) {
		throw e;
	}
};

const projectPatchService = async (templateId, body, ProjectTemplate) => {
	try {
		const projectTemplate = await ProjectTemplate.findByPk(templateId);
		if (!projectTemplate) {
			throw new Error(
				"Oops! Project Id not found or Something went wrong. Please try again with diffrent Project Id !"
			);
		} else {
			await projectTemplate.update(body);
			return { message: "Project Template has been updated successfully" };
		}
	} catch (e) {
		throw e;
	}
};

const patchService = async (templateId, body, ProjectTemplate) => {
	try {
		const projectTemplate = await ProjectTemplate.findByPk(templateId);
		if (!projectTemplate) {
			throw new Error(
				"Oops! taskId not found or Something went wrong. Please try again with diffrent taskId !"
			);
		} else {
			const existingTemplate = await ProjectTemplate.findOne({
				where: { templateName: body.templateName },
			});
			if (existingTemplate && existingTemplate.templateId !== templateId) {
				throw new Error(
					`Template name ${body.templateName} already exists. Please choose a different name.`
				);
			}
		}
		await projectTemplate.update(body);
		return { message: "Project Template has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (id, Model) => {
	try {
		const prjojectTemplate = await Model.findByPk(id);
		if (!prjojectTemplate) throw { error: "Id Not Found" };
		return await prjojectTemplate.destroy();
	} catch (e) {
		throw e;
	}
};

module.exports = {
	getService,
	getByIdService,
	postService,
	projectPatchService,
	patchService,
	deleteService,
};
