const { v4: uuid } = require("uuid");
const logger = require("../../../utils/logger");

const postService = async (body, Task) => {
	try {
		const tasks = [];
		for (const task of body.tasks) {
			let taskId = uuid();
			tasks.push({
				taskId,
				taskName: task.taskName,
				taskPriority: task.taskPriority,
				task_categoryId: body.categoryId,
			});

			const existingTask = await Task.findOne({
				where: { task_categoryId: body.categoryId, taskName: task.taskName },
			});
			if (existingTask) {
				throw new Error("Task already exists for this Category!");
			}
		}
		const taskCreation = await Task.bulkCreate(tasks);
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

const patchService = async (body, Task) => {
	try {
		for (const task of body) {
			const { taskId, taskName, categoryId } = task;

			const existingTask = await Task.findOne({
				where: { taskName, task_categoryId: categoryId },
			});

			if (existingTask && existingTask.taskId !== taskId) {
				throw new Error(
					`Task name '${taskName}' already exists within this category.`
				);
			}

			await Task.update({ taskName }, { where: { taskId } });
			logger.info(`Updated taskName ${taskName} for taskId: ${taskId}`);
		}
		return { message: "Task has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const priorityPatchService = async (body, Task) => {
	try {
		let updatedTask = body.map(async (task) => {
			const { taskId, taskPriority } = task;
			await Task.update({ taskPriority }, { where: { taskId } });
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

const deleteService = async (body, Task) => {
	try {
		let deletedTask = body.taskIds.map(async (task) => {
			const { taskId } = task;
			await Task.destroy({ where: { taskId } });
			logger.info(`deleting  for taskId: ${taskId}`);
		});
		if (!deletedTask.length > 0) {
			throw new Error(
				"Oops! Task  data is null. Please try again with diffrent  Task Id's !"
			);
		}
		return { message: "Task has been deleted successfully" };
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
