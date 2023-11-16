const { json } = require("../seedData");
const { v4: uuid } = require("uuid");

const getService = async (Template, Category, Task, User) => {
	try {
		const lists = await Template.findAll({
			attributes: ["templateId", "templateName", "createdAt", "updatedAt"],
			order: [["createdAt", "DESC"]],
			include: [
				{
                    model: User,
					attributes: ["userId","firstName", "lastName", "profileImage"],
					as: "createdBy"
				},
				{
					model: Category,
					attributes: ["categoryId", "categoryName", "categoryPriority"],
					as: "categories",
					order: [["categoryPriority", "ASC"]],
					separate: true,
					include: [
						{
							model: Task,
							attributes: ["taskId", "taskName", "taskPriority"],
							as: "tasks",
							order: [["taskPriority", "ASC"]],
							separate: true,
						},
					],
				},
			],
		});
		return lists;
	} catch (e) {
		throw e 
	}
};

const getByIdService = async (templateId, Template, Category, Task, User) => {
	try {
		const list = await Template.findByPk(templateId, {
			attributes: ["templateId", "templateName"],
			include: [
				{
                    model: User,
					attributes: ["userId","firstName", "lastName", "profileImage"],
					as: "createdBy"
				},
				{
					model: Category,
					attributes: ["categoryId", "categoryName", "categoryPriority"],
					as: "categories",
					order: [["categoryPriority", "ASC"]],
					separate: true,
					include: [
						{
							model: Task,
							attributes: ["taskId", "taskName", "taskPriority"],
							as: "tasks",
							order: [["taskPriority", "ASC"]],
							separate: true,
						},
					],
				},
			],
		});
		if (!list) {
			throw new Error(
				"Oops! Template Id not found or Something went wrong. Please try again with diffrent TemplateId!"
			);
		} else {
			return list;
		}
	} catch (e) {
		throw e 
	}
};

const postService = async (body, Template, Category, Task) => {
	try {
		const { templateName, userId } = body;
		const existingTemplate = await Template.findOne({
			where: { templateName },
		});
		const templateId = uuid();
		if (existingTemplate) {
			throw new Error(
				"Template name already exist please try with a different template name!"
			);
		} else {
			await Template.create({ templateName, templateId, created_by: userId });
		}

		//making AOO from body data
		const tasks = [];
		const categories = [];
		json.categories.forEach((category) => {
			const categoryId = uuid();
			categories.push({
				categoryId: categoryId,
				categoryName: category.categoryName,
				categoryPriority: category.categoryPriority,
				category_templateId: templateId,
			});
			category.tasks.forEach((task) => {
				const taskId = uuid();
				tasks.push({
					taskId: taskId,
					taskName: task.taskName,
					taskPriority: task.taskPriority,
					task_categoryId: categoryId,
				});
			});
		});

		const categoryCreation = await Category.bulkCreate(categories);
		if (!categoryCreation.length > 0) {
			throw new Error("Something went wrong in category creation!");
		}
		const taskCreation = await Task.bulkCreate(tasks);
		if (!taskCreation.length > 0) {
			throw new Error("Something went wrong in task creation!");
		}

		return { message: "Template has been created successfully" };
	} catch (e) {
		throw e 
	}
};

const patchService = async (templateId, body, Template) => {
	try {
		const template = await Template.findByPk(templateId);
		if (!template) {
			throw new Error(
				"Oops! TemplateId not found or Something went wrong. Please try again with diffrent TemplateId !"
			);
		}
		else {
			const existingTemplate = await Template.findOne({ where: { templateName: body.templateName } });
			if (existingTemplate && existingTemplate.templateId !== templateId) {
			  throw new Error(`Template name ${body.templateName} already exists. Please type a different name.`);
			}
		}
			await template.update(body);
		return { message: "Template has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (templateId, Template) => {
	try {
		const template = await Template.findByPk(templateId);
		if (!template) {
			throw new Error(
				"Oops! TemplateId not found or Something went wrong. Please try again with diffrent TemplateId !"
			);
		} else {
			await template.destroy();
		}
		return { message: "Template has been deleted successfully" };
	} catch (e) {
		throw e 
	}
};

module.exports = {
	getService,
	postService,
	patchService,
	deleteService,
	getByIdService,
};
