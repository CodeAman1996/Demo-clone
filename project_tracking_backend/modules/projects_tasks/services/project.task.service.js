const { v4: uuid } = require("uuid");
const logger = require("../../../utils/logger");
const { Op } = require("sequelize");

const postService = async (body, ProjectTask) => {
	try {
		const tasks = [];
		for (const task of body.tasks) {
			let taskId = uuid();
			tasks.push({
				taskId,
				taskName: task.taskName,
				taskPriority: task.taskPriority,
				projectCategoryId: body.categoryId,
			});

			const existingTask = await ProjectTask.findOne({
				where: {
					projectCategoryId: body.categoryId,
					taskName: task.taskName,
				},
			});
			if (existingTask) {
				throw new Error("Task already exists for this Category!");
			}
		}
		const taskCreation = await ProjectTask.bulkCreate(tasks);
		if (!taskCreation.length > 0) {
			throw new Error("Something went wrong in task creation!");
		}

		return {
			message: "Task has been created successfully",
		};
	} catch (e) {
		throw e;
	}
};

const patchByIdService = async (
	taskId,
	body,
	ProjectTask,
	ProjectTemplate,
	ProjectCategory
) => {
	try {
		// task update process
		const task = await ProjectTask.findByPk(taskId);
		if (!task) {
			throw new Error(
				"Oops! taskId not found or Something went wrong. Please try again with diffrent taskId !"
			);
		} else {
			await task.update(body);
		}
		const { projectId: templateId } = body;
		console.log("templateId", templateId);
		const lists = await ProjectTemplate.findByPk(templateId, {
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
		return { message: "Task has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const patchService = async (body, ProjectTask) => {
	try {
		for (const task of body) {
			const { taskId, taskName, categoryId } = task;

			const existingTask = await ProjectTask.findOne({
				where: { taskName, projectCategoryId: categoryId },
			});

			if (existingTask && existingTask.taskId !== taskId) {
				throw new Error(
					`Task name '${taskName}' already exists within this category.`
				);
			}

			await ProjectTask.update({ taskName }, { where: { taskId } });
			logger.info(`Updated taskName ${taskName} for taskId: ${taskId}`);
		}
		return { message: "Task has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const priorityPatchService = async (body, ProjectTask) => {
	try {
		let updatedTask = body.map(async (task) => {
			const { taskId, taskPriority } = task;
			await ProjectTask.update({ taskPriority }, { where: { taskId } });
			logger.info(
				`Updated taskPriority ${taskPriority}  for taskId: ${taskId}`
			);
		});
		if (!updatedTask.length > 0) {
			throw new Error(
				"Oops! Task priority data is null. Please try again with some priority changes!"
			);
		}
		return { message: "Task priority has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (
	body,
	ProjectTask,
	ProjectCategory,
	ProjectTemplate
) => {
	try {
		let deletedTask = await Promise.all(
			body.taskIds.map(async (task) => {
				const { taskId } = task;
				const isAssigned = await ProjectTask.findOne({
					where: { taskId, assignedTo: { [Op.not]: null } },
				});
				if (isAssigned) {
					throw new Error(
						`The Task ${isAssigned.dataValues.taskName} is already assigned to a user. Can't be delete.`
					);
				}

				await ProjectTask.destroy({ where: { taskId } });
				logger.info(`deleting  for taskId: ${taskId}`);
			})
		);
		if (!deletedTask.length > 0) {
			throw new Error(
				"Oops! Task  data is null. Please try again with diffrent  Task Id's !"
			);
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
		return { message: "Task has been deleted successfully" };
	} catch (e) {
		throw e;
	}
};

module.exports = {
	postService,
	patchByIdService,
	deleteService,
	priorityPatchService,
	patchService,
};
