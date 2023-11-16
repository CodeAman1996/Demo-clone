const service = require("../services/project.task.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
	return service;
};

const post = async (event) => {
	const projectTasks = await Service();
	const request = projectTasks["postService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTask } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), ProjectTask);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patchById = async (event) => {
	const projectTasks = await Service();
	const request = projectTasks["patchByIdService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTask, ProjectTemplate, ProjectCategory } =
			await connectToDatabase();
		const data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			ProjectTask,
			ProjectTemplate,
			ProjectCategory
		);
		logger.info("ProjectTask updated successfully");
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patch = async (event) => {
	const projectTasks = await Service();
	const request = projectTasks["patchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTask } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), ProjectTask);
		logger.debug("ProjectTask has been updated successfully", { data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const priorityPatch = async (event) => {
	const projectTasks = await Service();
	const request = projectTasks["priorityPatchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTask } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), ProjectTask);
		logger.debug(data);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const deleteReq = async (event) => {
	const projectTasks = await Service();
	const request = projectTasks["deleteService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTask, ProjectCategory, ProjectTemplate } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), ProjectTask, ProjectCategory, ProjectTemplate);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

module.exports = { post, patch, patchById, priorityPatch, deleteReq };
