const { v4: uuid } = require("uuid");
const logger = require("../../../utils/logger");

const postService = async (body, ProjectCategory, ProjectTask) => {
	try {
		const categories = [];
		for (const category of body.categories) {
			const categoryId = uuid();
			categories.push({
				categoryId,
				categoryName: category.categoryName,
				projectTemplateId: body.templateId,
				categoryPriority: category.categoryPriority,
			});
			const existingCategory = await ProjectCategory.findOne({
				where: {
					projectTemplateId: body.templateId,
					categoryName: category.categoryName,
				},
			});

			if (existingCategory) {
				throw new Error("Category already exists for this Template!");
			}
		}

		const categoryCreation = await ProjectCategory.bulkCreate(categories);
		if (!categoryCreation.length > 0) {
			throw new Error("Something went wrong in category creation!");
		}
		return {
			message: "Category has been created successfully",
		};
	} catch (e) {
		throw e;
	}
};

const patchService = async (categoryId, body, ProjectCategory) => {
	try {
		const category = await ProjectCategory.findByPk(categoryId);
		if (!category) {
			throw new Error(
				"Oops! CategoryId not found or Something went wrong. Please try again with diffrent CategoryId !"
			);
		} else {
			const { templateId, categoryName } = body;
			const existingCategory = await ProjectCategory.findOne({
				where: { projectTemplateId: templateId, categoryName },
			});

			if (existingCategory && existingCategory.categoryId !== categoryId) {
				throw new Error(
					`The category name '${categoryName}' already exists within this template.`
				);
			}
		}
		await category.update(body);
		return { message: "Category has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const priorityPatchService = async (body, ProjectCategory) => {
	try {
		let updatedCategories = body.map(async (category) => {
			const { categoryId, categoryPriority } = category;
			await ProjectCategory.update(
				{ categoryPriority },
				{ where: { categoryId } }
			);
			logger.info(
				`Updated categoryPriority ${categoryPriority}  for categoryId: ${categoryId}`
			);
		});
		if (!updatedCategories.length > 0) {
			throw new Error(
				"Oops! Category priority data is null. Please try again with some priority changes!"
			);
		}
		return { message: "Category priority has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (
	body,
	ProjectCategory,
	ProjectTask,
	ProjectTemplate
) => {
	try {
		const category = await ProjectCategory.findByPk(body.categoryId);
		if (!category) {
			throw new Error(
				"Oops! Category not found or Something went wrong. Please try again with diffrent CategoryId !"
			);
		} else {
			await category.destroy();
		}
		const { projectId: templateId } = body;
		const lists = await ProjectTemplate.findOne({
			where: {
				templateId,
			},
			attributes: ["templateId"],
			order: [["endDate", "ASC"]],
			include: [
				{
					model: ProjectCategory,
					attributes: ["categoryId"],
					as: "categories",
					order: [["categoryPriority", "ASC"]],
					separate: true,
					include: [
						{
							model: ProjectTask,
							attributes: ["taskId", "taskStatus"],
							as: "tasks",
							order: [["taskPriority", "ASC"]],
							separate: true,
						},
					],
				},
			],
		});
		//project status update process according task status
		const categories = lists.categories;
		let completedCount = 0;
		let inProgressCount = 0;
		let taskCount = 0;

		for (const category of categories) {
			for (const task of category.tasks) {
				taskCount++;
				if (task.taskStatus === "Completed") {
					completedCount++;
				} else if (task.taskStatus === "In Progress") {
					inProgressCount++;
				}
			}
		}

		let projectStatus;

		if (completedCount === taskCount) {
			projectStatus = "completed";
		} else if (completedCount > 0 || inProgressCount > 0) {
			projectStatus = "in progress";
		} else {
			projectStatus = "not started";
		}
		lists.status = projectStatus;
		await lists.save();
		return { message: "Category has been deleted successfully" };
	} catch (e) {
		throw e;
	}
};

module.exports = {
	postService,
	patchService,
	priorityPatchService,
	deleteService,
};
