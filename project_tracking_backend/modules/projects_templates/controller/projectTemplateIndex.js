const service = require("../services/project.template.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");
const jwt = require('jsonwebtoken');
const secretKey = "Admin@123samsung";

const Service = async () => {
	return service;
};

const get = async (event) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["getService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { ProjectTemplate, ProjectCategory, ProjectTask, User } =
			await connectToDatabase();
			const token = event.headers.Authorization.split(" ")[1];
			const decoded = jwt.verify(token, secretKey);
            const user = decoded.userId;
			const role = decoded.role;
		let data = await request(
			ProjectTemplate,
			ProjectCategory,
			ProjectTask,
			User,
			{user, role}
		);
		logger.debug(data);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const getById = async (event, context, callback) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["getByIdService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		let { ProjectTemplate, ProjectCategory, ProjectTask, User } =
			await connectToDatabase();
		let data = await request(
			event.pathParameters.id,
			ProjectTemplate,
			ProjectCategory,
			ProjectTask,
			User
		);
		logger.info(
			`getting the data of template: ${data.dataValues.templateName} for templateId: ${data.dataValues.templateId}`
		);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const post = async (event) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["postService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTemplate, ProjectCategory, ProjectTask } =
			await connectToDatabase();
		const data = await request(
			JSON.parse(event.body),
			ProjectTemplate,
			ProjectCategory,
			ProjectTask
		);
		logger.debug(data);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const projectPatch = async (event) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["projectPatchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTemplate } = await connectToDatabase();
		const data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			ProjectTemplate
		);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patch = async (event) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["patchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTemplate } = await connectToDatabase();
		const data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			ProjectTemplate
		);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		//console.log("error", e.message);
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const deleteReq = async (event) => {
	const projectsTemplates = await Service();
	const request = projectsTemplates["deleteService"];
	console.log(request);

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { ProjectTemplate } = await connectToDatabase();
		const data = await request(event.pathParameters.id, ProjectTemplate);
		logger.debug({ data });
		return sendResponse(200, data);
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

module.exports = { get, getById, post, projectPatch, patch, deleteReq };
