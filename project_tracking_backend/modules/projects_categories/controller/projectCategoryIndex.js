const service = require("../services/project.category.service");
const { connectToDatabase } = require("../../../db/index");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
	return service;
};

const post = async (event) => {
	const projectCategories = await Service();
	const request = projectCategories["postService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectCategory, ProjectTask } = await connectToDatabase();
		const data = await request(
			JSON.parse(event.body),
			ProjectCategory,
			ProjectTask
		);
		logger.debug("Task has been created successfully", { data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patch = async (event) => {
	const projectCategories = await Service();
	const request = projectCategories["patchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectCategory } = await connectToDatabase();
		const data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			ProjectCategory
		);
		logger.debug("Category has been updated successfully", { data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const priorityPatch = async (event) => {
	const projectCategories = await Service();
	const request = projectCategories["priorityPatchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectCategory } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), ProjectCategory);
		logger.debug(data);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const deleteReq = async (event) => {
	const projectCategories = await Service();
	const request = projectCategories["deleteService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectCategory, ProjectTask, ProjectTemplate } =
			await connectToDatabase();
		const data = await request(
			JSON.parse(event.body),
			ProjectCategory,
			ProjectTask,
			ProjectTemplate
		);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

module.exports = { post, patch, priorityPatch, deleteReq };
