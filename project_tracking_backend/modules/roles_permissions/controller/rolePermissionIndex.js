const service = require("../services/role.permission.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
	return service;
};

const get = async (event) => {
	const roles = await Service();
	const request = roles["getService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { Role, Permission } = await connectToDatabase();
		let data = await request(Role, Permission);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const getById = async (event) => {
	const roles = await Service();
	const request = roles["getByIdService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		let { Role } = await connectToDatabase();
		let data = await request(event.pathParameters.id, Role);
		logger.info(
			`getting the data of task: ${data.dataValues.taskName} for taskId: ${data.dataValues.taskId}`
		);
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const post = async (event) => {
	const roles = await Service();
	const request = roles["postService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { RolePermission } = await connectToDatabase();
		const data = await request(JSON.parse(event.body), RolePermission);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patch = async (event) => {
	const roles = await Service();
	const request = roles["patchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { Role } = await connectToDatabase();
		const data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			Role
		);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const deleteReq = async (event) => {
	const roles = await Service();
	const request = roles["deleteService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

	try {
		const { Role } = await connectToDatabase();
		const data = await request(event.pathParameters.id, Role);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

module.exports = { get, getById, post, patch, deleteReq };
